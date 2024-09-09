package accesstest

import (
	"github.com/cedar-policy/cedar-go"
	"github.com/cedar-policy/cedar-go/types"
)

type Test struct {
	Name    string
	Request cedar.Request
	Want    cedar.Decision
}

func All() []Test {
	return []Test{
		{
			Name: "A user can read their own receipt metadata",
			Request: cedar.Request{
				Principal: types.NewEntityUID(types.EntityType("User"), types.String("alice")),
				Action:    types.NewEntityUID(types.EntityType("Action"), types.String("GetReceipt")),
				Resource:  types.NewEntityUID(types.EntityType("Receipt"), types.String("1")),
			},
			Want: cedar.Allow,
		},
		{
			Name: "A user can read their own receipt S3 object",
			Request: cedar.Request{
				Principal: types.NewEntityUID(types.EntityType("User"), types.String("alice")),
				Action:    types.NewEntityUID(types.EntityType("S3::Action"), types.String("GetObject")),
				Resource:  types.NewEntityUID(types.EntityType("S3::Object"), types.String("1")),
			},
			Want: cedar.Allow,
		},
		{
			Name: "Cross-user S3 object access",
			Request: cedar.Request{
				Principal: types.NewEntityUID(types.EntityType("User"), types.String("alice")),
				Action:    types.NewEntityUID(types.EntityType("S3::Action"), types.String("GetObject")),
				Resource:  types.NewEntityUID(types.EntityType("S3::Object"), types.String("2")),
			},
			Want: cedar.Deny,
		},
	}
}
