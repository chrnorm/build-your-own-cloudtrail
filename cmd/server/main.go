package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1/authzv1connect"
	"github.com/chrnorm/build-your-own-cloudtrail/gen/receiptapp/v1/receiptappv1connect"
	"github.com/chrnorm/build-your-own-cloudtrail/pkg/api/authzsvc"
	"github.com/chrnorm/build-your-own-cloudtrail/pkg/api/receiptsvc"
	"github.com/chrnorm/build-your-own-cloudtrail/pkg/event"
	"github.com/chrnorm/build-your-own-cloudtrail/pkg/policy"
	"github.com/chrnorm/build-your-own-cloudtrail/pkg/receipt"
	"github.com/common-fate/apikit/logger"
	"github.com/go-chi/chi/v5"
	chiMiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
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
		AllowedOrigins: []string{"http://localhost:3002"},
		AllowedHeaders: []string{
			"*",
		},
	}))

	policyStorage, err := policy.NewInMemoryStorage(`permit(
	principal,
	action == Action::"GetReceipt",
	resource
) when {
	principal == resource.owner
};

permit(
	principal,
	action == S3::Action::"GetObject",
	resource
);`)
	if err != nil {
		return err
	}

	eventStorage := event.Storage{}

	r.Mount(receiptappv1connect.NewReceiptServiceHandler(&receiptsvc.Service{
		S3Client: s3client,
	}))

	r.Mount(authzv1connect.NewAuthzServiceHandler(&authzsvc.Service{
		Storage:       &storage,
		PolicyStorage: policyStorage,
		EventStorage:  &eventStorage,
	}))

	addr := ":8080"
	srv := http.Server{
		Handler: r,
		Addr:    addr,
	}

	fmt.Printf("listening on %s...\n", addr)

	return srv.ListenAndServe()
}
