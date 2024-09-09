package receiptsvc

import (
	"context"

	"connectrpc.com/connect"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	receiptappv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/receiptapp/v1"
)

func (s *Service) GetReceiptDownloadURL(ctx context.Context, req *connect.Request[receiptappv1.GetReceiptDownloadURLRequest]) (*connect.Response[receiptappv1.GetReceiptDownloadURLResponse], error) {
	// Create the presigner
	presigner := s3.NewPresignClient(s.S3Client)

	// Create the presigned URL
	presignResult, err := presigner.PresignGetObject(ctx, &s3.GetObjectInput{
		Bucket: aws.String("build-your-own-cloudtrail-dev-chris"),
		Key:    aws.String("blank-receipt.webp"),
	})
	if err != nil {
		return nil, err
	}

	u := presignResult.URL

	res := receiptappv1.GetReceiptDownloadURLResponse{
		DownloadUrl: u,
	}

	return connect.NewResponse(&res), nil
}
