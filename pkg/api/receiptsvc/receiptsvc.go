package receiptsvc

import (
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/chrnorm/build-your-own-cloudtrail/gen/receiptapp/v1/receiptappv1connect"
)

type Service struct {
	S3Client *s3.Client
}

var _ receiptappv1connect.ReceiptServiceHandler = &Service{}
