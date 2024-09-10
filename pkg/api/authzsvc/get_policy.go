package authzsvc

import (
	"context"

	"connectrpc.com/connect"
	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
)

func (s *Service) GetPolicy(ctx context.Context, req *connect.Request[authzv1.GetPolicyRequest]) (*connect.Response[authzv1.GetPolicyResponse], error) {
	policy, err := s.PolicyStorage.GetPolicySet(ctx)
	if err != nil {
		return nil, err
	}

	res := authzv1.GetPolicyResponse{
		CedarPolicyText: string(policy.MarshalCedar()),
	}

	return connect.NewResponse(&res), nil
}
