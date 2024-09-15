package authzsvc

import (
	"context"

	"connectrpc.com/connect"
	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
	"github.com/chrnorm/build-your-own-cloudtrail/pkg/event"
)

func (s *Service) GetAuthorizationEvaluation(ctx context.Context, req *connect.Request[authzv1.GetAuthorizationEvaluationRequest]) (*connect.Response[authzv1.GetAuthorizationEvaluationResponse], error) {
	eval, err := s.EventStorage.GetEvaluation(ctx, req.Msg.EvaluationId)
	if err == event.ErrNotFound {
		return nil, connect.NewError(connect.CodeNotFound, err)
	}
	if err != nil {
		return nil, err
	}

	res := authzv1.GetAuthorizationEvaluationResponse{
		Evaluation: eval,
	}

	return connect.NewResponse(&res), nil

}
