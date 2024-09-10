package authzsvc

import (
	"context"

	"connectrpc.com/connect"
	"github.com/cedar-policy/cedar-go"
	"github.com/cedar-policy/cedar-go/types"
	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
	"github.com/chrnorm/build-your-own-cloudtrail/pkg/accesstest"
	"github.com/chrnorm/build-your-own-cloudtrail/pkg/to_api"
)

func (s *Service) PreviewPolicy(ctx context.Context, req *connect.Request[authzv1.PreviewPolicyRequest]) (*connect.Response[authzv1.PreviewPolicyResponse], error) {
	var evals []*authzv1.Evaluation

	oldPS, err := s.PolicyStorage.GetPolicySet(ctx)
	if err != nil {
		return nil, err
	}

	newPS, err := cedar.NewPolicySetFromBytes("", []byte(req.Msg.CedarPolicyText))
	if err != nil {
		return nil, connect.NewError(connect.CodeInvalidArgument, err)
	}

	entities := s.Storage.Entities()

	// in this example, S3::Action::"GetObject" can be performed on an S3::Object entity,
	// and Action::"GetReceipt" can be performed on a Receipt entity.
	users := s.Storage.ListUsers()
	receipts := s.Storage.ListReceipts()
	objects := s.Storage.ListS3Objects()

	for _, usr := range users {
		// test S3::Action::"GetObject"
		for _, obj := range objects {
			req := cedar.Request{
				Principal: usr.ToCedar().UID,
				Action:    types.NewEntityUID(types.EntityType("S3::Action"), types.String("GetObject")),
				Resource:  obj.ToCedar().UID,
			}

			oldDecision, _ := oldPS.IsAuthorized(entities, req)
			newDecision, _ := newPS.IsAuthorized(entities, req)

			if oldDecision != newDecision {
				evals = append(evals, &authzv1.Evaluation{
					Request:  to_api.RequestToAPI(req),
					Decision: to_api.DecisionToAPI(newDecision),
				})
			}
		}

		// test Action::"GetReceipt"
		for _, r := range receipts {
			req := cedar.Request{
				Principal: usr.ToCedar().UID,
				Action:    types.NewEntityUID(types.EntityType("Action"), types.String("GetReceipt")),
				Resource:  r.ToCedar().UID,
			}

			oldDecision, _ := oldPS.IsAuthorized(entities, req)
			newDecision, _ := newPS.IsAuthorized(entities, req)

			if oldDecision != newDecision {
				evals = append(evals, &authzv1.Evaluation{
					Request:  to_api.RequestToAPI(req),
					Decision: to_api.DecisionToAPI(newDecision),
				})
			}
		}
	}

	var testResults []*authzv1.Test

	// Run access tests.
	// In this demonstration codebase, the tests are hardcoded.
	// In your own codebase you could load these from a file during your CI/CD pipeline.
	tests := accesstest.All()

	for _, t := range tests {
		got, _ := newPS.IsAuthorized(entities, t.Request)
		testResults = append(testResults, &authzv1.Test{
			Name:    t.Name,
			Request: to_api.RequestToAPI(t.Request),
			Pass:    t.Want == got,
			Want:    to_api.DecisionToAPI(t.Want),
			Got:     to_api.DecisionToAPI(got),
		})
	}

	res := authzv1.PreviewPolicyResponse{
		PermissionChanges: evals,
		TestResults:       testResults,
	}

	return connect.NewResponse(&res), nil
}
