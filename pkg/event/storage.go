package event

import (
	"context"
	"sync"

	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
)

type Storage struct {
	mu     sync.Mutex
	events []*authzv1.Event
}

func (s *Storage) LogEvent(ctx context.Context, evt *authzv1.Event) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.events = append(s.events, evt)
	return nil
}

func (s *Storage) ListEvents(ctx context.Context) ([]*authzv1.Event, error) {
	return s.events, nil
}
