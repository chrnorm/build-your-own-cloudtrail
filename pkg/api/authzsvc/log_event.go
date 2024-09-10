package authzsvc

import (
	"context"

	"connectrpc.com/connect"
	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
)

func (s *Service) LogEvent(ctx context.Context, req *connect.Request[authzv1.LogEventRequest]) (*connect.Response[authzv1.LogEventResponse], error) {
	err := s.EventStorage.LogEvent(ctx, req.Msg.Event)
	if err != nil {
		return nil, err
	}

	res := authzv1.LogEventResponse{}

	return connect.NewResponse(&res), nil
}
