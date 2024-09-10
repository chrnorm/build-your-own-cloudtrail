package authzsvc

import (
	"context"
	"encoding/json"
	"errors"
	"time"

	"connectrpc.com/connect"
	"github.com/cedar-policy/cedar-go"
	"github.com/cedar-policy/cedar-go/types"
	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
	"github.com/chrnorm/build-your-own-cloudtrail/pkg/to_api"
	"github.com/common-fate/xid"
	"google.golang.org/protobuf/types/known/durationpb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func (s *Service) PreviewAuthorization(ctx context.Context, req *connect.Request[authzv1.PreviewAuthorizationRequest]) (*connect.Response[authzv1.PreviewAuthorizationResponse], error) {
	ps := cedar.NewPolicySet()
	var err error

	start := time.Now()

	if req.Msg.UseCustomPolicyText {
		ps, err = cedar.NewPolicySetFromBytes("", []byte(req.Msg.CedarPolicyText))
		if err != nil {
			return nil, connect.NewError(connect.CodeInvalidArgument, err)
		}
	} else {
		ps, err = s.PolicyStorage.GetPolicySet(ctx)
		if err != nil {
			return nil, err
		}
	}

	entities := s.Storage.Entities()

	cedarReq := cedar.Request{
		Principal: types.NewEntityUID(types.EntityType(req.Msg.Request.Principal.Type), types.String(req.Msg.Request.Principal.Id)),
		Action:    types.NewEntityUID(types.EntityType(req.Msg.Request.Action.Type), types.String(req.Msg.Request.Action.Id)),
		Resource:  types.NewEntityUID(types.EntityType(req.Msg.Request.Resource.Type), types.String(req.Msg.Request.Resource.Id)),
	}

	decision, diags := ps.IsAuthorized(entities, cedarReq)

	duration := time.Since(start)

	var matchingPolicies []*authzv1.Policy
	var apiDiags authzv1.Diagnostics

	for _, reason := range diags.Reasons {
		policy := ps.Get(reason.PolicyID)
		matchingPolicies = append(matchingPolicies, &authzv1.Policy{
			Id:   string(reason.PolicyID),
			Text: string(policy.MarshalCedar()),
		})

		apiDiags.Reason = append(apiDiags.Reason, string(reason.PolicyID))
	}

	for _, error := range diags.Errors {
		apiDiags.Errors = append(apiDiags.Errors, error.String())
	}

	principal := entities[cedarReq.Principal]
	if principal == nil {
		return nil, connect.NewError(connect.CodeNotFound, errors.New("principal not found"))
	}

	principalJSON, err := json.MarshalIndent(principal, "", "  ")
	if err != nil {
		return nil, err
	}

	resource := entities[cedarReq.Resource]
	if resource == nil {
		return nil, connect.NewError(connect.CodeNotFound, errors.New("resource not found"))
	}

	resourceJSON, err := json.MarshalIndent(resource, "", "  ")
	if err != nil {
		return nil, err
	}

	res := authzv1.PreviewAuthorizationResponse{
		Evaluation: &authzv1.Evaluation{
			Id:          xid.New("eval"),
			Request:     req.Msg.Request,
			Decision:    to_api.DecisionToAPI(decision),
			EvaluatedAt: timestamppb.Now(),
			DebugInformation: &authzv1.DebugInformation{
				PolicySets: []*authzv1.PolicySet{
					{
						Id:       "cedar",
						Policies: matchingPolicies,
					},
				},
				PrincipalJson: string(principalJSON),
				ResourceJson:  string(resourceJSON),
			},
			Diagnostics:        &apiDiags,
			EvaluationDuration: durationpb.New(duration),
		},
	}

	return connect.NewResponse(&res), nil
}
