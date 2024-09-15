package authzsvc

import (
	"context"

	"connectrpc.com/connect"
	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
	"github.com/chrnorm/build-your-own-cloudtrail/pkg/event"
)

func (s *Service) GetEvent(ctx context.Context, req *connect.Request[authzv1.GetEventRequest]) (*connect.Response[authzv1.GetEventResponse], error) {
	evt, err := s.EventStorage.GetEvent(ctx, req.Msg.EventId)
	if err == event.ErrNotFound {
		return nil, connect.NewError(connect.CodeNotFound, err)
	}
	if err != nil {
		return nil, err
	}

	res := authzv1.GetEventResponse{
		Event: evt,
	}

	return connect.NewResponse(&res), nil
}
