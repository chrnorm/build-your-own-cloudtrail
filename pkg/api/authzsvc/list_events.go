package authzsvc

import (
	"context"

	"connectrpc.com/connect"
	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
)

func (s *Service) ListEvents(ctx context.Context, req *connect.Request[authzv1.ListEventsRequest]) (*connect.Response[authzv1.ListEventsResponse], error) {
	events, err := s.EventStorage.ListEvents(ctx)
	if err != nil {
		return nil, err
	}

	res := authzv1.ListEventsResponse{
		Events: events,
	}

	return connect.NewResponse(&res), nil
}
