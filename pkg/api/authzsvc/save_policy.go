package authzsvc

import (
	"context"

	"connectrpc.com/connect"
	"github.com/cedar-policy/cedar-go"
	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
)

func (s *Service) UpdatePolicy(ctx context.Context, req *connect.Request[authzv1.UpdatePolicyRequest]) (*connect.Response[authzv1.UpdatePolicyResponse], error) {
	ps, err := cedar.NewPolicySetFromBytes("", []byte(req.Msg.CedarPolicyText))
	if err != nil {
		return nil, connect.NewError(connect.CodeInvalidArgument, err)
	}

	err = s.PolicyStorage.UpdatePolicySet(ctx, ps)
	if err != nil {
		return nil, err
	}

	res := authzv1.UpdatePolicyResponse{
		CedarPolicyText: string(ps.MarshalCedar()),
	}

	return connect.NewResponse(&res), nil
}
