package to_api

import (
	"encoding/json"
	"errors"

	"github.com/cedar-policy/cedar-go"
	"github.com/cedar-policy/cedar-go/types"
	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
	"github.com/common-fate/xid"
)

func DecisionToAPI(dec cedar.Decision) authzv1.Decision {
	if dec == true {
		return authzv1.Decision_DECISION_ALLOW
	}
	return authzv1.Decision_DECISION_DENY
}

func RequestToAPI(req cedar.Request) *authzv1.AuthzRequest {
	return &authzv1.AuthzRequest{
		Principal: &authzv1.EID{
			Type: string(req.Principal.Type),
			Id:   string(req.Principal.ID),
		},
		Action: &authzv1.EID{
			Type: string(req.Action.Type),
			Id:   string(req.Action.ID),
		},
		Resource: &authzv1.EID{
			Type: string(req.Resource.Type),
			Id:   string(req.Resource.ID),
		},
	}
}

type EvaluationInput struct {
	Request    cedar.Request
	Decision   cedar.Decision
	Diagnostic cedar.Diagnostic
	Entities   types.Entities
	PolicySet  *cedar.PolicySet
}

func Evaluation(input EvaluationInput) (*authzv1.Evaluation, error) {
	eval := authzv1.Evaluation{
		Id:          xid.New("eval"),
		Request:     RequestToAPI(input.Request),
		Decision:    DecisionToAPI(input.Decision),
		Diagnostics: &authzv1.Diagnostics{},
	}

	var matchingPolicies []*authzv1.Policy

	for _, reason := range input.Diagnostic.Reasons {
		policy := input.PolicySet.Get(reason.PolicyID)
		matchingPolicies = append(matchingPolicies, &authzv1.Policy{
			Id:   string(reason.PolicyID),
			Text: string(policy.MarshalCedar()),
		})

		eval.Diagnostics.Reason = append(eval.Diagnostics.Reason, string(reason.PolicyID))
	}

	for _, error := range input.Diagnostic.Errors {
		eval.Diagnostics.Errors = append(eval.Diagnostics.Errors, error.String())
	}

	principal := input.Entities[input.Request.Principal]
	if principal == nil {
		return nil, errors.New("principal not found")
	}

	principalJSON, err := json.MarshalIndent(principal, "", "  ")
	if err != nil {
		return nil, err
	}

	resource := input.Entities[input.Request.Resource]
	if resource == nil {
		return nil, errors.New("resource not found")
	}

	resourceJSON, err := json.MarshalIndent(resource, "", "  ")
	if err != nil {
		return nil, err
	}

	eval.DebugInformation = &authzv1.DebugInformation{
		PolicySets: []*authzv1.PolicySet{
			{
				Id:       "cedar",
				Policies: matchingPolicies,
			},
		},
		PrincipalJson: string(principalJSON),
		ResourceJson:  string(resourceJSON),
	}

	return &eval, nil
}
