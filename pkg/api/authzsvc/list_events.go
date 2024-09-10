package authzsvc

import (
	"context"
	"time"

	"connectrpc.com/connect"
	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
	"github.com/common-fate/xid"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func (s *Service) ListEvents(ctx context.Context, req *connect.Request[authzv1.ListEventsRequest]) (*connect.Response[authzv1.ListEventsResponse], error) {
	now := time.Now()

	res := authzv1.ListEventsResponse{
		Events: []*authzv1.Event{
			{
				Id: xid.New("event"),
				Operation: &authzv1.HTTPOperation{
					Name:   "List Receipts",
					Method: "GET",
					Path:   "/receipts",
					Host:   "api.receiptapp.com",
					Scheme: "https",
				},
				Principal: &authzv1.EID{
					Type: "User",
					Id:   "alice",
				},
				StartTime: timestamppb.New(now.Add(-1 * time.Second)),
				EndTime:   timestamppb.New(now),
				Decision:  authzv1.Decision_DECISION_ALLOW,
				AuthzEvaluations: []*authzv1.Evaluation{
					{
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
					},
				},
			},
			{
				Id: xid.New("event"),
				Operation: &authzv1.HTTPOperation{
					Name:   "Describe Receipt",
					Method: "GET",
					Path:   "/receipts/1",
					Host:   "api.receiptapp.com",
					Scheme: "https",
				},
				Principal: &authzv1.EID{
					Type: "User",
					Id:   "alice",
				},
				StartTime: timestamppb.New(now.Add(-5 * time.Second)),
				EndTime:   timestamppb.New(now.Add(-4 * time.Second)),
				Decision:  authzv1.Decision_DECISION_ALLOW,
				AuthzEvaluations: []*authzv1.Evaluation{
					{
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
					},
				},
			},
		},
	}

	return connect.NewResponse(&res), nil
}
