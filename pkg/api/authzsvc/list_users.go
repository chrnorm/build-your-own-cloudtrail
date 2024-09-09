package authzsvc

import (
	"context"

	"connectrpc.com/connect"
	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
)

func (s *Service) ListUsers(ctx context.Context, req *connect.Request[authzv1.ListUsersRequest]) (*connect.Response[authzv1.ListUsersResponse], error) {
	users := s.Storage.ListUsers()

	res := authzv1.ListUsersResponse{}

	for _, u := range users {
		res.Users = append(res.Users, &authzv1.User{
			Id: u.ID,
		})
	}

	return connect.NewResponse(&res), nil
}
