package policyclient

import (
	"context"
	"fmt"
	"net/http"
	"sync"
	"time"

	"connectrpc.com/connect"
	"github.com/cedar-policy/cedar-go"
	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
	"github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1/authzv1connect"
)

type PolicyClient struct {
	mu        sync.Mutex
	policySet *cedar.PolicySet
	client    authzv1connect.AuthzServiceClient
}

func Start(ctx context.Context, url string) (*PolicyClient, error) {
	client := authzv1connect.NewAuthzServiceClient(http.DefaultClient, url)

	res, err := client.GetPolicy(ctx, connect.NewRequest(&authzv1.GetPolicyRequest{}))
	if err != nil {
		return nil, err
	}

	ps, err := cedar.NewPolicySetFromBytes("", []byte(res.Msg.CedarPolicyText))
	if err != nil {
		return nil, err
	}

	c := PolicyClient{
		policySet: ps,
		client:    client,
	}

	go c.refreshPolicyLoop()

	return &c, nil
}

func (p *PolicyClient) refreshPolicyLoop() {
	ctx := context.Background()
	for {
		time.Sleep(time.Second)
		res, err := p.client.GetPolicy(ctx, connect.NewRequest(&authzv1.GetPolicyRequest{}))
		if err != nil {
			fmt.Printf("error fetching Cedar policy from authz control plane: %s\n", err.Error())
			continue
		}

		ps, err := cedar.NewPolicySetFromBytes("", []byte(res.Msg.CedarPolicyText))
		if err != nil {
			fmt.Printf("error parsing Cedar policy from authz control plane: %s\n", err.Error())
			continue
		}

		p.mu.Lock()
		p.policySet = ps
		p.mu.Unlock()
	}
}

func (p *PolicyClient) PolicySet() *cedar.PolicySet {
	return p.policySet
}

func (p *PolicyClient) LogEvent(ctx context.Context, evt *authzv1.Event) error {
	_, err := p.client.LogEvent(ctx, connect.NewRequest(&authzv1.LogEventRequest{
		Event: evt,
	}))
	return err
}
