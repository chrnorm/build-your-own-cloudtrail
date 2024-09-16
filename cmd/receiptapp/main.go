package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/cedar-policy/cedar-go"
	"github.com/cedar-policy/cedar-go/types"
	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
	"github.com/chrnorm/build-your-own-cloudtrail/pkg/policyclient"
	"github.com/chrnorm/build-your-own-cloudtrail/pkg/receipt"
	"github.com/chrnorm/build-your-own-cloudtrail/pkg/to_api"
	"github.com/common-fate/apikit/apio"
	"github.com/common-fate/apikit/logger"
	"github.com/common-fate/xid"
	"github.com/go-chi/chi/v5"
	chiMiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func main() {
	err := run()
	if err != nil {
		log.Fatal(err)
	}
}

func run() error {
	ctx := context.Background()
	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		return err
	}

	s3client := s3.NewFromConfig(cfg)
	_ = s3client

	storage := receipt.Storage{}

	log, err := logger.Build("info")
	if err != nil {
		return err
	}

	r := chi.NewRouter()
	r.Use(chiMiddleware.RequestID)
	r.Use(chiMiddleware.RealIP)
	r.Use(chiMiddleware.Recoverer)
	r.Use(logger.Middleware(log.Desugar()))

	r.Use(cors.Handler(cors.Options{
		AllowedMethods: []string{
			http.MethodHead,
			http.MethodGet,
			http.MethodPost,
			http.MethodPut,
			http.MethodPatch,
			http.MethodDelete,
			http.MethodOptions,
		},
		AllowedOrigins: []string{"http://localhost:5173"},
		AllowedHeaders: []string{
			"*",
		},
	}))

	policyClient, err := policyclient.Start(ctx, "http://localhost:8080")
	if err != nil {
		return err
	}

	r.Get("/receipts", func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		start := time.Now()

		entities := storage.Entities()

		receipts := storage.ListReceipts()

		var filtered []receipt.Receipt
		overallDecision := cedar.Deny

		var allDiags []cedar.Diagnostic

		ps := policyClient.PolicySet()

		for _, receipt := range receipts {
			decision, diag := ps.IsAuthorized(entities, cedar.Request{
				Principal: types.NewEntityUID(types.EntityType("User"), "alice"),
				Action:    types.NewEntityUID(types.EntityType("Action"), "GetReceipt"),
				Resource:  receipt.ToCedar().UID,
			})
			allDiags = append(allDiags, diag)
			if decision == cedar.Allow {
				overallDecision = cedar.Allow
				filtered = append(filtered, receipt)
			}
		}

		duration := time.Since(start)

		eval, err := to_api.Evaluation(to_api.EvaluationInput{
			Request: cedar.Request{
				Principal: types.NewEntityUID(types.EntityType("User"), "alice"),
				Action:    types.NewEntityUID(types.EntityType("Action"), "GetReceipt"),
				Resource:  types.NewEntityUID(types.EntityType("Receipt"), ""),
			},
			Decision:   overallDecision,
			Diagnostic: combineDiagnostics(allDiags),
			Entities:   entities,
			PolicySet:  ps,
			Duration:   duration,
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		err = policyClient.LogEvent(ctx, &authzv1.Event{
			Id: xid.New("event"),
			Operation: &authzv1.HTTPOperation{
				Name:   "List Receipts",
				Id:     "receipt.list",
				Method: "GET",
				Path:   r.URL.Path,
				Host:   "receiptapp.example.com",
				Scheme: "https",
			},
			Principal: &authzv1.EID{
				Type: "User",
				Id:   "alice",
			},
			StartTime:        timestamppb.New(start),
			EndTime:          timestamppb.Now(),
			Decision:         to_api.DecisionToAPI(overallDecision),
			AuthzEvaluations: []*authzv1.Evaluation{eval},
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		apio.JSON(ctx, w, filtered, http.StatusOK)
	})
	r.Get("/receipts/{id}", func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		start := time.Now()
		id := chi.URLParam(r, "id")

		entities := storage.Entities()
		receipts := storage.ListReceipts()

		var targetReceipt *receipt.Receipt
		for _, rcpt := range receipts {
			if rcpt.ID == id {
				targetReceipt = &rcpt
				break
			}
		}

		if targetReceipt == nil {
			http.Error(w, "Receipt not found or you are not authorized", http.StatusNotFound)
			return
		}

		req := cedar.Request{
			Principal: types.NewEntityUID(types.EntityType("User"), "alice"),
			Action:    types.NewEntityUID(types.EntityType("Action"), "GetReceipt"),
			Resource:  targetReceipt.ToCedar().UID,
		}

		ps := policyClient.PolicySet()
		decision, diag := ps.IsAuthorized(entities, req)

		duration := time.Since(start)

		eval, err := to_api.Evaluation(to_api.EvaluationInput{
			Request:    req,
			Decision:   decision,
			Diagnostic: diag,
			Entities:   entities,
			PolicySet:  ps,
			Duration:   duration,
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		err = policyClient.LogEvent(ctx, &authzv1.Event{
			Id: xid.New("event"),
			Operation: &authzv1.HTTPOperation{
				Name:   "Describe Receipt",
				Id:     "receipt.describe",
				Method: "GET",
				Path:   r.URL.Path,
				Host:   "receiptapp.example.com",
				Scheme: "https",
			},
			Principal: &authzv1.EID{
				Type: "User",
				Id:   "alice",
			},
			StartTime:        timestamppb.New(start),
			EndTime:          timestamppb.Now(),
			Decision:         to_api.DecisionToAPI(decision),
			AuthzEvaluations: []*authzv1.Evaluation{eval},
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if decision != cedar.Allow {
			http.Error(w, "Receipt not found or you are not authorized", http.StatusNotFound)
			return
		}

		apio.JSON(ctx, w, targetReceipt, http.StatusOK)
	})

	r.Get("/receipts/{id}/download-url", func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		start := time.Now()
		id := chi.URLParam(r, "id")

		entities := storage.Entities()
		receipts := storage.ListReceipts()

		var targetReceipt *receipt.Receipt
		for _, rcpt := range receipts {
			if rcpt.ID == id {
				targetReceipt = &rcpt
				break
			}
		}

		if targetReceipt == nil {
			http.Error(w, "Receipt image not found or you are not authorized", http.StatusNotFound)
			return
		}

		req := cedar.Request{
			Principal: types.NewEntityUID(types.EntityType("User"), "alice"),
			Action:    types.NewEntityUID(types.EntityType("S3::Action"), "GetObject"),
			Resource:  targetReceipt.ToCedar().UID,
		}

		ps := policyClient.PolicySet()
		decision, diag := ps.IsAuthorized(entities, req)

		duration := time.Since(start)

		eval, err := to_api.Evaluation(to_api.EvaluationInput{
			Request:    req,
			Decision:   decision,
			Diagnostic: diag,
			Entities:   entities,
			PolicySet:  ps,
			Duration:   duration,
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		err = policyClient.LogEvent(ctx, &authzv1.Event{
			Id: xid.New("event"),
			Operation: &authzv1.HTTPOperation{
				Name:   "Get Receipt Download URL",
				Id:     "receipt.get_download_url",
				Method: "GET",
				Path:   r.URL.Path,
				Host:   "receiptapp.example.com",
				Scheme: "https",
			},
			Principal: &authzv1.EID{
				Type: "User",
				Id:   "alice",
			},
			StartTime:        timestamppb.New(start),
			EndTime:          timestamppb.Now(),
			Decision:         to_api.DecisionToAPI(decision),
			AuthzEvaluations: []*authzv1.Evaluation{eval},
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if decision != cedar.Allow {
			http.Error(w, "Receipt not found or you are not authorized", http.StatusNotFound)
			return
		}

		// Download URL points to the frontend React app public directory, just for this example.
		// In production this would be an S3 presigned URL.
		u := downloadURL{
			URL: fmt.Sprintf("http://localhost:5173/receipts/%s.png", targetReceipt.ID),
		}

		apio.JSON(ctx, w, u, http.StatusOK)
	})

	addr := ":9090"
	srv := http.Server{
		Handler: r,
		Addr:    addr,
	}

	fmt.Printf("listening on %s...\n", addr)

	return srv.ListenAndServe()
}

type downloadURL struct {
	URL string `json:"url"`
}

func combineDiagnostics(diags []cedar.Diagnostic) cedar.Diagnostic {
	reasons := map[cedar.Reason]bool{}
	errors := map[cedar.Error]bool{}

	for _, d := range diags {
		for _, r := range d.Reasons {
			reasons[r] = true
		}
		for _, e := range d.Errors {
			errors[e] = true
		}
	}

	var combinedDiag cedar.Diagnostic
	for r := range reasons {
		combinedDiag.Reasons = append(combinedDiag.Reasons, r)

		fmt.Printf("reason %s\n", r.PolicyID)
	}
	for e := range errors {
		combinedDiag.Errors = append(combinedDiag.Errors, e)
	}

	return combinedDiag
}
