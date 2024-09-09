package receiptsvc

import (
	"context"

	"connectrpc.com/connect"
	receiptappv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/receiptapp/v1"
)

func (s *Service) ListReceipts(ctx context.Context, req *connect.Request[receiptappv1.ListReceiptsRequest]) (*connect.Response[receiptappv1.ListReceiptsResponse], error) {
	res := receiptappv1.ListReceiptsResponse{
		Receipts: []*receiptappv1.Receipt{
			{
				Id:           1,
				MerchantName: "fwd:cloudsec coffee",
				Date:         "2024-09-17",
				TotalAmount:  4.00,
			},
			{
				Id:           2,
				MerchantName: "fwd:cloudsec registration",
				Date:         "2024-09-17",
				TotalAmount:  100.00,
			},
		},
	}

	return connect.NewResponse(&res), nil
}
