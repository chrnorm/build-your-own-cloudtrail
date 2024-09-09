package receipt

import (
	"time"

	"github.com/cedar-policy/cedar-go/types"
)

type User struct {
	ID string
}

func (u User) ToCedar() types.Entity {
	return types.Entity{
		UID:        types.NewEntityUID(types.EntityType("User"), types.String(u.ID)),
		Attributes: types.Record{},
	}
}

type Receipt struct {
	ID       string
	Merchant string
	Amount   float32
	Category string
	Owner    string
	Date     time.Time
}

func (r Receipt) ToCedar() types.Entity {
	return types.Entity{
		UID: types.NewEntityUID(types.EntityType("Receipt"), types.String(r.ID)),
		Attributes: types.Record{
			"category": types.String(r.Category),
			"owner":    types.NewEntityUID(types.EntityType("User"), types.String(r.Owner)),
		},
	}
}

type S3Object struct {
	ID    string
	Owner string
}

func (s S3Object) ToCedar() types.Entity {
	return types.Entity{
		UID: types.NewEntityUID(types.EntityType("S3::Object"), types.String(s.ID)),
		Attributes: types.Record{
			"owner": types.NewEntityUID(types.EntityType("User"), types.String(s.Owner)),
		},
	}
}

type Storage struct{}

func (s *Storage) ListReceipts() []Receipt {
	return []Receipt{
		{
			ID:       "1",
			Merchant: "Lidl",
			Owner:    "alice",
			Amount:   32.05,
			Category: "Food",
			Date:     time.Date(2024, time.September, 07, 16, 03, 0, 0, time.UTC),
		},
		{
			ID:       "2",
			Merchant: "Rough Trade East",
			Owner:    "bob",
			Amount:   50.00,
			Category: "Music",
			Date:     time.Date(2024, time.September, 07, 11, 9, 0, 0, time.UTC),
		},
		{
			ID:       "3",
			Merchant: "fwd:cloudsec Coffee Shop",
			Owner:    "alice",
			Amount:   10.04,
			Category: "Food",
			Date:     time.Date(2024, time.September, 07, 11, 9, 0, 0, time.UTC),
		},
	}
}

func (s *Storage) ListUsers() []User {
	return []User{
		{
			ID: "alice",
		},
		{
			ID: "bob",
		},
	}
}

func (s *Storage) ListS3Objects() []S3Object {
	return []S3Object{
		{
			ID:    "1",
			Owner: "alice",
		},
		{
			ID:    "2",
			Owner: "bob",
		},
		{
			ID:    "3",
			Owner: "alice",
		},
	}
}

func (s *Storage) Entities() types.Entities {
	entities := make(types.Entities)

	receipts := s.ListReceipts()

	for _, r := range receipts {
		entity := r.ToCedar()
		entities[entity.UID] = &entity
	}

	objects := s.ListS3Objects()

	for _, r := range objects {
		entity := r.ToCedar()
		entities[entity.UID] = &entity
	}

	users := s.ListUsers()

	for _, r := range users {
		entity := r.ToCedar()
		entities[entity.UID] = &entity
	}

	return entities
}
