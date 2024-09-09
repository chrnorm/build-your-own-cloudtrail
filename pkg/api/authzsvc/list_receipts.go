package authzsvc

import (
	"context"

	"connectrpc.com/connect"
	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
)

func (s *Service) ListS3Objects(ctx context.Context, req *connect.Request[authzv1.ListS3ObjectsRequest]) (*connect.Response[authzv1.ListS3ObjectsResponse], error) {
	objects := s.Storage.ListS3Objects()

	res := authzv1.ListS3ObjectsResponse{}

	for _, r := range objects {
		res.Objects = append(res.Objects, &authzv1.S3Object{
			Id:    r.ID,
			Owner: r.Owner,
		})
	}

	return connect.NewResponse(&res), nil
}
