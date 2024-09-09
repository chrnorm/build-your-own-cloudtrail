package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/chrnorm/build-your-own-cloudtrail/gen/receiptapp/v1/receiptappv1connect"
	"github.com/chrnorm/build-your-own-cloudtrail/pkg/api/receiptsvc"
	"github.com/go-chi/chi/v5"
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

	receiptSvc := receiptsvc.Service{
		S3Client: s3client,
	}

	r := chi.NewRouter()

	r.Mount(receiptappv1connect.NewReceiptServiceHandler(&receiptSvc))

	addr := ":8080"
	srv := http.Server{
		Handler: r,
		Addr:    addr,
	}

	fmt.Printf("listening on %s...\n", addr)

	return srv.ListenAndServe()
}
