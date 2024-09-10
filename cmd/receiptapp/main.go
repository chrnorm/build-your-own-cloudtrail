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

		entities := storage.Entities()

		receipts := storage.ListReceipts()

		var filtered []receipt.Receipt

		for _, receipt := range receipts {
			decision, _ := policyClient.PolicySet().IsAuthorized(entities, cedar.Request{
				Principal: types.NewEntityUID(types.EntityType("User"), "alice"),
				Action:    types.NewEntityUID(types.EntityType("Action"), "GetReceipt"),
				Resource:  receipt.ToCedar().UID,
			})
			if decision == cedar.Allow {
				filtered = append(filtered, receipt)
			}
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

		eval, err := to_api.Evaluation(to_api.EvaluationInput{
			Request:    req,
			Decision:   decision,
			Diagnostic: diag,
			Entities:   entities,
			PolicySet:  ps,
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		err = policyClient.LogEvent(ctx, &authzv1.Event{
			Id: xid.New("event"),
			Operation: &authzv1.HTTPOperation{
				Name:   "Describe Receipt",
				Method: "GET",
				Path:   r.URL.Path,
				Host:   r.Host,
				Scheme: "http",
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

	addr := ":9090"
	srv := http.Server{
		Handler: r,
		Addr:    addr,
	}

	fmt.Printf("listening on %s...\n", addr)

	return srv.ListenAndServe()
}
