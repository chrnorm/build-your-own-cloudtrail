package authzsvc

import (
	"github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1/authzv1connect"
	"github.com/chrnorm/build-your-own-cloudtrail/pkg/event"
	"github.com/chrnorm/build-your-own-cloudtrail/pkg/policy"
	"github.com/chrnorm/build-your-own-cloudtrail/pkg/receipt"
)

type Service struct {
	Storage       *receipt.Storage
	PolicyStorage *policy.Storage
	EventStorage  *event.Storage
}

var _ authzv1connect.AuthzServiceHandler = &Service{}
