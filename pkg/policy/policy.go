package policy

import (
	"fmt"

	"github.com/cedar-policy/cedar-go"
	"github.com/cedar-policy/cedar-go/x/exp/parser"
	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
)

// PolicySet is a set of Policies
type PolicySet struct {
	// ID of the policy.
	ID string `json:"id"`

	Policies []Policy `json:"policies"`

	Text string `json:"text"`
}

func (ps *PolicySet) ToAPI() *authzv1.PolicySet {
	out := &authzv1.PolicySet{
		Id:       ps.ID,
		Policies: make([]*authzv1.Policy, len(ps.Policies)),
		Text:     ps.Text,
	}
	for i, p := range ps.Policies {
		out.Policies[i] = p.ToAPI()
	}
	return out
}

func (p *Policy) ToAPI() *authzv1.Policy {
	return &authzv1.Policy{Id: p.ID, Text: p.Text}
}

func ParsePolicyText(text []byte, id string) (*PolicySet, error) {
	ps := PolicySet{
		ID:   id,
		Text: string(text),
	}
	tokens, err := parser.Tokenize([]byte(text))
	if err != nil {
		return nil, err
	}
	res, err := parser.Parse(tokens)
	if err != nil {
		return nil, err
	}

	// This will drop any comments in the file
	// cedar go doesn't directly expose the policy text so we use their experimental parser to break up the default policy
	// An alternative is to write the default policy directly in go
	for i, p := range res {
		ps.Policies = append(ps.Policies, Policy{
			ID:   fmt.Sprintf("%s.policy%v", id, i),
			Text: p.String(),
		})
	}
	return &ps, nil
}

func MatchPolicies(policyMap map[string]Policy, diags cedar.Diagnostic) []Policy {
	var out []Policy
	for _, reason := range diags.Reasons {
		out = append(out, policyMap[reason.Position.Filename])
	}
	return out
}

// // DistictPolicySets returns the distict PolicySets from a slice of Policies
// func DistictPolicySets(policies []Policy) []*authzv1.PolicySet {
// 	policyMap := map[string]*authzv1.PolicySet{}
// 	for _, policy := range policies {
// 		if _, ok := policyMap[policy.PolicySet.ID]; !ok {
// 			ps := &authzv1.PolicySet{}
// 			ps.Id = policy.PolicySet.ID
// 			ps.Text = policy.PolicySet.Text
// 			for _, pol := range policy.PolicySet.Policies {
// 				ps.Policies = append(ps.Policies, &authzv1.Policy{
// 					Id:   pol.ID,
// 					Text: pol.Text,
// 				})
// 			}
// 			policyMap[policy.PolicySet.ID] = ps
// 		}
// 	}
// 	policySets := make([]*authzv1.PolicySet, 0, len(policyMap))
// 	for k := range policyMap {
// 		ps := policyMap[k]

// 		// sort the policy IDs
// 		slices.SortFunc(ps.Policies, func(a, b *authzv1.Policy) int {
// 			return policysort.Sort(a.Id, b.Id)
// 		})

// 		policySets = append(policySets, policyMap[k])
// 	}
// 	sort.Slice(policySets, func(i, j int) bool { return policySets[i].Id < policySets[j].Id })
// 	return policySets
// }

// Combines the policy statement with its parent policy set for ease of lookup and forming dignostic outputs
type Policy struct {
	// the human readable path <policySet.id>.<policy.id>
	ID   string
	Text string
	// Statement   policyset.Policy
	// Annotations []parser.Annotation
	// PolicySet   policyset.PolicySet
}

// func CombinePolicySets(policySets []policyset.PolicySet) (cedar.PolicySet, map[string]Policy, error) {
// 	var out cedar.PolicySet
// 	policyMap := map[string]Policy{}
// 	for _, policySet := range policySets {
// 		for _, policy := range policySet.Policies {

// 			// policyID := fmt.Sprintf("%s.%s", policySet.ID, policy.ID)
// 			// the policy id that comes from authz is already prefixed with the policy set id e.g "open.policy1"
// 			// if we change that behaviour then we shoudl probably update this to go back to formatting the policy ID with the policySet id
// 			policyMap[policy.ID] = Policy{Statement: policy, PolicySet: policySet, ID: policy.ID, Annotations: ParseAnnotations([]byte(policy.Text))}
// 			ps, err := cedar.NewPolicySet(policy.ID, []byte(policy.Text))
// 			if len(ps) > 1 {
// 				return nil, nil, fmt.Errorf("unexpected policy count, expected 1 found %v. policy: %s", len(ps), policy.Text)
// 			}
// 			if err != nil {
// 				return nil, nil, err
// 			}
// 			// there should only be one policy in the set after parsing
// 			out = append(out, ps[0])
// 		}
// 	}
// 	return out, policyMap, nil
// }

// ParseAnnotations attempts to parse annotations from a policy text, returning nil if there are any errors
// I'm returning nil here because its probably safer given the parser is not stable from the cedar go package
// the input should be a single cedar policy
// only the annotations from the first policy will be returned
func ParseAnnotations(policy []byte) []parser.Annotation {
	tokens, err := parser.Tokenize(policy)
	if err != nil {
		return nil
	}
	res, err := parser.Parse(tokens)
	if err != nil {
		return nil
	}
	if len(res) > 0 {
		return res[0].Annotations
	}
	return nil
}
