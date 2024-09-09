package authzsvc

import (
	"context"

	"connectrpc.com/connect"
	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
)

func (s *Service) ListReceipts(ctx context.Context, req *connect.Request[authzv1.ListReceiptsRequest]) (*connect.Response[authzv1.ListReceiptsResponse], error) {
	receipts := s.Storage.ListReceipts()

	res := authzv1.ListReceiptsResponse{}

	for _, r := range receipts {
		res.Receipts = append(res.Receipts, &authzv1.Receipt{
			Id:       r.ID,
			Owner:    r.Owner,
			Category: r.Category,
		})
	}

	return connect.NewResponse(&res), nil
}
