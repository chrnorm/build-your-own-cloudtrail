package event

import (
	"context"
	"errors"
	"sort"
	"sync"

	authzv1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
)

var ErrNotFound = errors.New("resource not found")

type Storage struct {
	mu             sync.RWMutex
	events         map[string]*authzv1.Event
	authorizations map[string]*authzv1.Evaluation
}

func (s *Storage) LogEvent(ctx context.Context, evt *authzv1.Event) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.events == nil {
		s.events = make(map[string]*authzv1.Event)
	}
	if s.authorizations == nil {
		s.authorizations = make(map[string]*authzv1.Evaluation)
	}

	s.events[evt.Id] = evt

	for _, e := range evt.AuthzEvaluations {
		s.authorizations[e.Id] = e
	}

	return nil
}

func (s *Storage) ListEvents(ctx context.Context) ([]*authzv1.Event, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	events := make([]*authzv1.Event, 0, len(s.events))
	for _, event := range s.events {
		events = append(events, event)
	}

	// Sort events by descending 'start' field
	sort.Slice(events, func(i, j int) bool {
		return events[i].StartTime.AsTime().After(events[j].StartTime.AsTime())
	})

	return events, nil
}

func (s *Storage) GetEvent(ctx context.Context, eventID string) (*authzv1.Event, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	evt, ok := s.events[eventID]
	if !ok {
		return nil, ErrNotFound
	}

	return evt, nil
}

func (s *Storage) GetEvaluation(ctx context.Context, evalID string) (*authzv1.Evaluation, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	evt, ok := s.authorizations[evalID]
	if !ok {
		return nil, ErrNotFound
	}

	return evt, nil
}
