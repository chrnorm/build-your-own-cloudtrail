package authzsvc

import (
	"context"
	"time"

	"connectrpc.com/connect"
	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
	"github.com/common-fate/xid"
	"google.golang.org/protobuf/types/known/durationpb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func (s *Service) GetAuthorizationEvaluation(ctx context.Context, req *connect.Request[authzv1.GetAuthorizationEvaluationRequest]) (*connect.Response[authzv1.GetAuthorizationEvaluationResponse], error) {
	now := time.Now()

	res := authzv1.GetAuthorizationEvaluationResponse{
		Evaluation: &authzv1.Evaluation{
			Id: xid.New("eval"),
			Request: &authzv1.AuthzRequest{
				Principal: &authzv1.EID{
					Type: "User",
					Id:   "alice",
				},
				Action: &authzv1.EID{
					Type: "Action",
					Id:   "GetReceipt",
				},
				Resource: &authzv1.EID{
					Type: "Receipt",
				},
			},
			Decision: authzv1.Decision_DECISION_ALLOW,
			Diagnostics: &authzv1.Diagnostics{
				Reason: []string{"cedar.policy0"},
			},
			EvaluatedAt:        timestamppb.New(now),
			EvaluationDuration: durationpb.New(time.Nanosecond * 800),
			DebugInformation: &authzv1.DebugInformation{
				PolicySets: []*authzv1.PolicySet{
					{
						Id: "cedar",
						Policies: []*authzv1.Policy{
							{
								Id:   "policy0",
								Text: "permit (principal, action, resource);",
							},
						},
						Text: "permit (principal, action, resource);",
					},
				},
				PrincipalJson: `{"eid": {"type": "User", "id": "alice"}}`,
				ResourceJson:  `{"eid": {"type": "Receipt", "id": "1"}, "attributes": {"owner": "alice"}}`,
			},
		},
	}

	return connect.NewResponse(&res), nil
}
