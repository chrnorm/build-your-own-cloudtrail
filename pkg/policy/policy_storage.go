package policy

import (
	"context"
	"sync"

	"github.com/cedar-policy/cedar-go"
)

type Storage struct {
	mu     sync.Mutex
	policy *cedar.PolicySet
}

func NewInMemoryStorage(defaultPolicy string) (*Storage, error) {
	ps, err := cedar.NewPolicySetFromBytes("", []byte(defaultPolicy))
	if err != nil {
		return nil, err
	}

	s := Storage{
		policy: ps,
	}

	return &s, nil
}

func (s *Storage) UpdatePolicySet(ctx context.Context, policy *cedar.PolicySet) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.policy = policy
	return nil
}

func (s *Storage) GetPolicySet(ctx context.Context) (*cedar.PolicySet, error) {
	return s.policy, nil
}
