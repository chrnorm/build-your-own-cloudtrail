package authzsvc

import (
	"context"

	"connectrpc.com/connect"
	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
	"github.com/chrnorm/build-your-own-cloudtrail/pkg/accesstest"
	"github.com/chrnorm/build-your-own-cloudtrail/pkg/to_api"
)

func (s *Service) RunTests(ctx context.Context, req *connect.Request[authzv1.RunTestsRequest]) (*connect.Response[authzv1.RunTestsResponse], error) {
	ps, err := s.PolicyStorage.GetPolicySet(ctx)
	if err != nil {
		return nil, err
	}

	entities := s.Storage.Entities()

	var testResults []*authzv1.Test

	// Run access tests.
	// In this demonstration codebase, the tests are hardcoded.
	// In your own codebase you could load these from a file during your CI/CD pipeline.
	tests := accesstest.All()

	for _, t := range tests {
		got, _ := ps.IsAuthorized(entities, t.Request)
		testResults = append(testResults, &authzv1.Test{
			Name:    t.Name,
			Request: to_api.RequestToAPI(t.Request),
			Pass:    t.Want == got,
			Want:    to_api.DecisionToAPI(t.Want),
			Got:     to_api.DecisionToAPI(got),
		})
	}

	res := authzv1.RunTestsResponse{
		TestResults: testResults,
	}

	return connect.NewResponse(&res), nil
}
