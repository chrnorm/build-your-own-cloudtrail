package authzsvc

import (
	"context"

	"connectrpc.com/connect"
	"github.com/cedar-policy/cedar-go"
	"github.com/cedar-policy/cedar-go/types"
	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
)

func (s *Service) ListAccess(ctx context.Context, req *connect.Request[authzv1.ListAccessRequest]) (*connect.Response[authzv1.ListAccessResponse], error) {
	var oldPolicy cedar.Policy

	var evals []*authzv1.Evaluation

	err := oldPolicy.UnmarshalCedar([]byte("permit (principal, action, resource);"))
	if err != nil {
		return nil, connect.NewError(connect.CodeInvalidArgument, err)
	}

	ps := cedar.NewPolicySet()
	ps.Store("policy0", &oldPolicy)

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

			decision, _ := ps.IsAuthorized(entities, req)
			evals = append(evals, &authzv1.Evaluation{
				Request:  requestToAPI(req),
				Decision: decisionToAPI(decision),
			})
		}

		// test Action::"GetReceipt"
		for _, r := range receipts {
			req := cedar.Request{
				Principal: usr.ToCedar().UID,
				Action:    types.NewEntityUID(types.EntityType("Action"), types.String("GetReceipt")),
				Resource:  r.ToCedar().UID,
			}

			decision, _ := ps.IsAuthorized(entities, req)
			evals = append(evals, &authzv1.Evaluation{
				Request:  requestToAPI(req),
				Decision: decisionToAPI(decision),
			})
		}
	}

	res := authzv1.ListAccessResponse{
		Evaluations: evals,
	}

	return connect.NewResponse(&res), nil
}
