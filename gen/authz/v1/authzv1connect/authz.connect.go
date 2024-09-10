// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: authz/v1/authz.proto

package authzv1connect

import (
	connect "connectrpc.com/connect"
	context "context"
	errors "errors"
	v1 "github.com/chrnorm/build-your-own-cloudtrail/gen/authz/v1"
	http "net/http"
	strings "strings"
)

// This is a compile-time assertion to ensure that this generated file and the connect package are
// compatible. If you get a compiler error that this constant is not defined, this code was
// generated with a version of connect newer than the one compiled into your binary. You can fix the
// problem by either regenerating this code with an older version of connect or updating the connect
// version compiled into your binary.
const _ = connect.IsAtLeastVersion1_13_0

const (
	// AuthzServiceName is the fully-qualified name of the AuthzService service.
	AuthzServiceName = "authz.v1.AuthzService"
)

// These constants are the fully-qualified names of the RPCs defined in this package. They're
// exposed at runtime as Spec.Procedure and as the final two segments of the HTTP route.
//
// Note that these are different from the fully-qualified method names used by
// google.golang.org/protobuf/reflect/protoreflect. To convert from these constants to
// reflection-formatted method names, remove the leading slash and convert the remaining slash to a
// period.
const (
	// AuthzServiceGetPolicyProcedure is the fully-qualified name of the AuthzService's GetPolicy RPC.
	AuthzServiceGetPolicyProcedure = "/authz.v1.AuthzService/GetPolicy"
	// AuthzServiceUpdatePolicyProcedure is the fully-qualified name of the AuthzService's UpdatePolicy
	// RPC.
	AuthzServiceUpdatePolicyProcedure = "/authz.v1.AuthzService/UpdatePolicy"
	// AuthzServicePreviewAuthorizationProcedure is the fully-qualified name of the AuthzService's
	// PreviewAuthorization RPC.
	AuthzServicePreviewAuthorizationProcedure = "/authz.v1.AuthzService/PreviewAuthorization"
	// AuthzServiceListAccessProcedure is the fully-qualified name of the AuthzService's ListAccess RPC.
	AuthzServiceListAccessProcedure = "/authz.v1.AuthzService/ListAccess"
	// AuthzServiceListEventsProcedure is the fully-qualified name of the AuthzService's ListEvents RPC.
	AuthzServiceListEventsProcedure = "/authz.v1.AuthzService/ListEvents"
	// AuthzServiceGetEventProcedure is the fully-qualified name of the AuthzService's GetEvent RPC.
	AuthzServiceGetEventProcedure = "/authz.v1.AuthzService/GetEvent"
	// AuthzServiceGetAuthorizationEvaluationProcedure is the fully-qualified name of the AuthzService's
	// GetAuthorizationEvaluation RPC.
	AuthzServiceGetAuthorizationEvaluationProcedure = "/authz.v1.AuthzService/GetAuthorizationEvaluation"
	// AuthzServicePreviewPolicyProcedure is the fully-qualified name of the AuthzService's
	// PreviewPolicy RPC.
	AuthzServicePreviewPolicyProcedure = "/authz.v1.AuthzService/PreviewPolicy"
	// AuthzServiceListUsersProcedure is the fully-qualified name of the AuthzService's ListUsers RPC.
	AuthzServiceListUsersProcedure = "/authz.v1.AuthzService/ListUsers"
	// AuthzServiceListReceiptsProcedure is the fully-qualified name of the AuthzService's ListReceipts
	// RPC.
	AuthzServiceListReceiptsProcedure = "/authz.v1.AuthzService/ListReceipts"
	// AuthzServiceListS3ObjectsProcedure is the fully-qualified name of the AuthzService's
	// ListS3Objects RPC.
	AuthzServiceListS3ObjectsProcedure = "/authz.v1.AuthzService/ListS3Objects"
	// AuthzServiceLogEventProcedure is the fully-qualified name of the AuthzService's LogEvent RPC.
	AuthzServiceLogEventProcedure = "/authz.v1.AuthzService/LogEvent"
)

// These variables are the protoreflect.Descriptor objects for the RPCs defined in this package.
var (
	authzServiceServiceDescriptor                          = v1.File_authz_v1_authz_proto.Services().ByName("AuthzService")
	authzServiceGetPolicyMethodDescriptor                  = authzServiceServiceDescriptor.Methods().ByName("GetPolicy")
	authzServiceUpdatePolicyMethodDescriptor               = authzServiceServiceDescriptor.Methods().ByName("UpdatePolicy")
	authzServicePreviewAuthorizationMethodDescriptor       = authzServiceServiceDescriptor.Methods().ByName("PreviewAuthorization")
	authzServiceListAccessMethodDescriptor                 = authzServiceServiceDescriptor.Methods().ByName("ListAccess")
	authzServiceListEventsMethodDescriptor                 = authzServiceServiceDescriptor.Methods().ByName("ListEvents")
	authzServiceGetEventMethodDescriptor                   = authzServiceServiceDescriptor.Methods().ByName("GetEvent")
	authzServiceGetAuthorizationEvaluationMethodDescriptor = authzServiceServiceDescriptor.Methods().ByName("GetAuthorizationEvaluation")
	authzServicePreviewPolicyMethodDescriptor              = authzServiceServiceDescriptor.Methods().ByName("PreviewPolicy")
	authzServiceListUsersMethodDescriptor                  = authzServiceServiceDescriptor.Methods().ByName("ListUsers")
	authzServiceListReceiptsMethodDescriptor               = authzServiceServiceDescriptor.Methods().ByName("ListReceipts")
	authzServiceListS3ObjectsMethodDescriptor              = authzServiceServiceDescriptor.Methods().ByName("ListS3Objects")
	authzServiceLogEventMethodDescriptor                   = authzServiceServiceDescriptor.Methods().ByName("LogEvent")
)

// AuthzServiceClient is a client for the authz.v1.AuthzService service.
type AuthzServiceClient interface {
	GetPolicy(context.Context, *connect.Request[v1.GetPolicyRequest]) (*connect.Response[v1.GetPolicyResponse], error)
	UpdatePolicy(context.Context, *connect.Request[v1.UpdatePolicyRequest]) (*connect.Response[v1.UpdatePolicyResponse], error)
	PreviewAuthorization(context.Context, *connect.Request[v1.PreviewAuthorizationRequest]) (*connect.Response[v1.PreviewAuthorizationResponse], error)
	ListAccess(context.Context, *connect.Request[v1.ListAccessRequest]) (*connect.Response[v1.ListAccessResponse], error)
	ListEvents(context.Context, *connect.Request[v1.ListEventsRequest]) (*connect.Response[v1.ListEventsResponse], error)
	GetEvent(context.Context, *connect.Request[v1.GetEventRequest]) (*connect.Response[v1.GetEventResponse], error)
	GetAuthorizationEvaluation(context.Context, *connect.Request[v1.GetAuthorizationEvaluationRequest]) (*connect.Response[v1.GetAuthorizationEvaluationResponse], error)
	PreviewPolicy(context.Context, *connect.Request[v1.PreviewPolicyRequest]) (*connect.Response[v1.PreviewPolicyResponse], error)
	ListUsers(context.Context, *connect.Request[v1.ListUsersRequest]) (*connect.Response[v1.ListUsersResponse], error)
	ListReceipts(context.Context, *connect.Request[v1.ListReceiptsRequest]) (*connect.Response[v1.ListReceiptsResponse], error)
	ListS3Objects(context.Context, *connect.Request[v1.ListS3ObjectsRequest]) (*connect.Response[v1.ListS3ObjectsResponse], error)
	LogEvent(context.Context, *connect.Request[v1.LogEventRequest]) (*connect.Response[v1.LogEventResponse], error)
}

// NewAuthzServiceClient constructs a client for the authz.v1.AuthzService service. By default, it
// uses the Connect protocol with the binary Protobuf Codec, asks for gzipped responses, and sends
// uncompressed requests. To use the gRPC or gRPC-Web protocols, supply the connect.WithGRPC() or
// connect.WithGRPCWeb() options.
//
// The URL supplied here should be the base URL for the Connect or gRPC server (for example,
// http://api.acme.com or https://acme.com/grpc).
func NewAuthzServiceClient(httpClient connect.HTTPClient, baseURL string, opts ...connect.ClientOption) AuthzServiceClient {
	baseURL = strings.TrimRight(baseURL, "/")
	return &authzServiceClient{
		getPolicy: connect.NewClient[v1.GetPolicyRequest, v1.GetPolicyResponse](
			httpClient,
			baseURL+AuthzServiceGetPolicyProcedure,
			connect.WithSchema(authzServiceGetPolicyMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		updatePolicy: connect.NewClient[v1.UpdatePolicyRequest, v1.UpdatePolicyResponse](
			httpClient,
			baseURL+AuthzServiceUpdatePolicyProcedure,
			connect.WithSchema(authzServiceUpdatePolicyMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		previewAuthorization: connect.NewClient[v1.PreviewAuthorizationRequest, v1.PreviewAuthorizationResponse](
			httpClient,
			baseURL+AuthzServicePreviewAuthorizationProcedure,
			connect.WithSchema(authzServicePreviewAuthorizationMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		listAccess: connect.NewClient[v1.ListAccessRequest, v1.ListAccessResponse](
			httpClient,
			baseURL+AuthzServiceListAccessProcedure,
			connect.WithSchema(authzServiceListAccessMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		listEvents: connect.NewClient[v1.ListEventsRequest, v1.ListEventsResponse](
			httpClient,
			baseURL+AuthzServiceListEventsProcedure,
			connect.WithSchema(authzServiceListEventsMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		getEvent: connect.NewClient[v1.GetEventRequest, v1.GetEventResponse](
			httpClient,
			baseURL+AuthzServiceGetEventProcedure,
			connect.WithSchema(authzServiceGetEventMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		getAuthorizationEvaluation: connect.NewClient[v1.GetAuthorizationEvaluationRequest, v1.GetAuthorizationEvaluationResponse](
			httpClient,
			baseURL+AuthzServiceGetAuthorizationEvaluationProcedure,
			connect.WithSchema(authzServiceGetAuthorizationEvaluationMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		previewPolicy: connect.NewClient[v1.PreviewPolicyRequest, v1.PreviewPolicyResponse](
			httpClient,
			baseURL+AuthzServicePreviewPolicyProcedure,
			connect.WithSchema(authzServicePreviewPolicyMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		listUsers: connect.NewClient[v1.ListUsersRequest, v1.ListUsersResponse](
			httpClient,
			baseURL+AuthzServiceListUsersProcedure,
			connect.WithSchema(authzServiceListUsersMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		listReceipts: connect.NewClient[v1.ListReceiptsRequest, v1.ListReceiptsResponse](
			httpClient,
			baseURL+AuthzServiceListReceiptsProcedure,
			connect.WithSchema(authzServiceListReceiptsMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		listS3Objects: connect.NewClient[v1.ListS3ObjectsRequest, v1.ListS3ObjectsResponse](
			httpClient,
			baseURL+AuthzServiceListS3ObjectsProcedure,
			connect.WithSchema(authzServiceListS3ObjectsMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		logEvent: connect.NewClient[v1.LogEventRequest, v1.LogEventResponse](
			httpClient,
			baseURL+AuthzServiceLogEventProcedure,
			connect.WithSchema(authzServiceLogEventMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
	}
}

// authzServiceClient implements AuthzServiceClient.
type authzServiceClient struct {
	getPolicy                  *connect.Client[v1.GetPolicyRequest, v1.GetPolicyResponse]
	updatePolicy               *connect.Client[v1.UpdatePolicyRequest, v1.UpdatePolicyResponse]
	previewAuthorization       *connect.Client[v1.PreviewAuthorizationRequest, v1.PreviewAuthorizationResponse]
	listAccess                 *connect.Client[v1.ListAccessRequest, v1.ListAccessResponse]
	listEvents                 *connect.Client[v1.ListEventsRequest, v1.ListEventsResponse]
	getEvent                   *connect.Client[v1.GetEventRequest, v1.GetEventResponse]
	getAuthorizationEvaluation *connect.Client[v1.GetAuthorizationEvaluationRequest, v1.GetAuthorizationEvaluationResponse]
	previewPolicy              *connect.Client[v1.PreviewPolicyRequest, v1.PreviewPolicyResponse]
	listUsers                  *connect.Client[v1.ListUsersRequest, v1.ListUsersResponse]
	listReceipts               *connect.Client[v1.ListReceiptsRequest, v1.ListReceiptsResponse]
	listS3Objects              *connect.Client[v1.ListS3ObjectsRequest, v1.ListS3ObjectsResponse]
	logEvent                   *connect.Client[v1.LogEventRequest, v1.LogEventResponse]
}

// GetPolicy calls authz.v1.AuthzService.GetPolicy.
func (c *authzServiceClient) GetPolicy(ctx context.Context, req *connect.Request[v1.GetPolicyRequest]) (*connect.Response[v1.GetPolicyResponse], error) {
	return c.getPolicy.CallUnary(ctx, req)
}

// UpdatePolicy calls authz.v1.AuthzService.UpdatePolicy.
func (c *authzServiceClient) UpdatePolicy(ctx context.Context, req *connect.Request[v1.UpdatePolicyRequest]) (*connect.Response[v1.UpdatePolicyResponse], error) {
	return c.updatePolicy.CallUnary(ctx, req)
}

// PreviewAuthorization calls authz.v1.AuthzService.PreviewAuthorization.
func (c *authzServiceClient) PreviewAuthorization(ctx context.Context, req *connect.Request[v1.PreviewAuthorizationRequest]) (*connect.Response[v1.PreviewAuthorizationResponse], error) {
	return c.previewAuthorization.CallUnary(ctx, req)
}

// ListAccess calls authz.v1.AuthzService.ListAccess.
func (c *authzServiceClient) ListAccess(ctx context.Context, req *connect.Request[v1.ListAccessRequest]) (*connect.Response[v1.ListAccessResponse], error) {
	return c.listAccess.CallUnary(ctx, req)
}

// ListEvents calls authz.v1.AuthzService.ListEvents.
func (c *authzServiceClient) ListEvents(ctx context.Context, req *connect.Request[v1.ListEventsRequest]) (*connect.Response[v1.ListEventsResponse], error) {
	return c.listEvents.CallUnary(ctx, req)
}

// GetEvent calls authz.v1.AuthzService.GetEvent.
func (c *authzServiceClient) GetEvent(ctx context.Context, req *connect.Request[v1.GetEventRequest]) (*connect.Response[v1.GetEventResponse], error) {
	return c.getEvent.CallUnary(ctx, req)
}

// GetAuthorizationEvaluation calls authz.v1.AuthzService.GetAuthorizationEvaluation.
func (c *authzServiceClient) GetAuthorizationEvaluation(ctx context.Context, req *connect.Request[v1.GetAuthorizationEvaluationRequest]) (*connect.Response[v1.GetAuthorizationEvaluationResponse], error) {
	return c.getAuthorizationEvaluation.CallUnary(ctx, req)
}

// PreviewPolicy calls authz.v1.AuthzService.PreviewPolicy.
func (c *authzServiceClient) PreviewPolicy(ctx context.Context, req *connect.Request[v1.PreviewPolicyRequest]) (*connect.Response[v1.PreviewPolicyResponse], error) {
	return c.previewPolicy.CallUnary(ctx, req)
}

// ListUsers calls authz.v1.AuthzService.ListUsers.
func (c *authzServiceClient) ListUsers(ctx context.Context, req *connect.Request[v1.ListUsersRequest]) (*connect.Response[v1.ListUsersResponse], error) {
	return c.listUsers.CallUnary(ctx, req)
}

// ListReceipts calls authz.v1.AuthzService.ListReceipts.
func (c *authzServiceClient) ListReceipts(ctx context.Context, req *connect.Request[v1.ListReceiptsRequest]) (*connect.Response[v1.ListReceiptsResponse], error) {
	return c.listReceipts.CallUnary(ctx, req)
}

// ListS3Objects calls authz.v1.AuthzService.ListS3Objects.
func (c *authzServiceClient) ListS3Objects(ctx context.Context, req *connect.Request[v1.ListS3ObjectsRequest]) (*connect.Response[v1.ListS3ObjectsResponse], error) {
	return c.listS3Objects.CallUnary(ctx, req)
}

// LogEvent calls authz.v1.AuthzService.LogEvent.
func (c *authzServiceClient) LogEvent(ctx context.Context, req *connect.Request[v1.LogEventRequest]) (*connect.Response[v1.LogEventResponse], error) {
	return c.logEvent.CallUnary(ctx, req)
}

// AuthzServiceHandler is an implementation of the authz.v1.AuthzService service.
type AuthzServiceHandler interface {
	GetPolicy(context.Context, *connect.Request[v1.GetPolicyRequest]) (*connect.Response[v1.GetPolicyResponse], error)
	UpdatePolicy(context.Context, *connect.Request[v1.UpdatePolicyRequest]) (*connect.Response[v1.UpdatePolicyResponse], error)
	PreviewAuthorization(context.Context, *connect.Request[v1.PreviewAuthorizationRequest]) (*connect.Response[v1.PreviewAuthorizationResponse], error)
	ListAccess(context.Context, *connect.Request[v1.ListAccessRequest]) (*connect.Response[v1.ListAccessResponse], error)
	ListEvents(context.Context, *connect.Request[v1.ListEventsRequest]) (*connect.Response[v1.ListEventsResponse], error)
	GetEvent(context.Context, *connect.Request[v1.GetEventRequest]) (*connect.Response[v1.GetEventResponse], error)
	GetAuthorizationEvaluation(context.Context, *connect.Request[v1.GetAuthorizationEvaluationRequest]) (*connect.Response[v1.GetAuthorizationEvaluationResponse], error)
	PreviewPolicy(context.Context, *connect.Request[v1.PreviewPolicyRequest]) (*connect.Response[v1.PreviewPolicyResponse], error)
	ListUsers(context.Context, *connect.Request[v1.ListUsersRequest]) (*connect.Response[v1.ListUsersResponse], error)
	ListReceipts(context.Context, *connect.Request[v1.ListReceiptsRequest]) (*connect.Response[v1.ListReceiptsResponse], error)
	ListS3Objects(context.Context, *connect.Request[v1.ListS3ObjectsRequest]) (*connect.Response[v1.ListS3ObjectsResponse], error)
	LogEvent(context.Context, *connect.Request[v1.LogEventRequest]) (*connect.Response[v1.LogEventResponse], error)
}

// NewAuthzServiceHandler builds an HTTP handler from the service implementation. It returns the
// path on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewAuthzServiceHandler(svc AuthzServiceHandler, opts ...connect.HandlerOption) (string, http.Handler) {
	authzServiceGetPolicyHandler := connect.NewUnaryHandler(
		AuthzServiceGetPolicyProcedure,
		svc.GetPolicy,
		connect.WithSchema(authzServiceGetPolicyMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	authzServiceUpdatePolicyHandler := connect.NewUnaryHandler(
		AuthzServiceUpdatePolicyProcedure,
		svc.UpdatePolicy,
		connect.WithSchema(authzServiceUpdatePolicyMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	authzServicePreviewAuthorizationHandler := connect.NewUnaryHandler(
		AuthzServicePreviewAuthorizationProcedure,
		svc.PreviewAuthorization,
		connect.WithSchema(authzServicePreviewAuthorizationMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	authzServiceListAccessHandler := connect.NewUnaryHandler(
		AuthzServiceListAccessProcedure,
		svc.ListAccess,
		connect.WithSchema(authzServiceListAccessMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	authzServiceListEventsHandler := connect.NewUnaryHandler(
		AuthzServiceListEventsProcedure,
		svc.ListEvents,
		connect.WithSchema(authzServiceListEventsMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	authzServiceGetEventHandler := connect.NewUnaryHandler(
		AuthzServiceGetEventProcedure,
		svc.GetEvent,
		connect.WithSchema(authzServiceGetEventMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	authzServiceGetAuthorizationEvaluationHandler := connect.NewUnaryHandler(
		AuthzServiceGetAuthorizationEvaluationProcedure,
		svc.GetAuthorizationEvaluation,
		connect.WithSchema(authzServiceGetAuthorizationEvaluationMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	authzServicePreviewPolicyHandler := connect.NewUnaryHandler(
		AuthzServicePreviewPolicyProcedure,
		svc.PreviewPolicy,
		connect.WithSchema(authzServicePreviewPolicyMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	authzServiceListUsersHandler := connect.NewUnaryHandler(
		AuthzServiceListUsersProcedure,
		svc.ListUsers,
		connect.WithSchema(authzServiceListUsersMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	authzServiceListReceiptsHandler := connect.NewUnaryHandler(
		AuthzServiceListReceiptsProcedure,
		svc.ListReceipts,
		connect.WithSchema(authzServiceListReceiptsMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	authzServiceListS3ObjectsHandler := connect.NewUnaryHandler(
		AuthzServiceListS3ObjectsProcedure,
		svc.ListS3Objects,
		connect.WithSchema(authzServiceListS3ObjectsMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	authzServiceLogEventHandler := connect.NewUnaryHandler(
		AuthzServiceLogEventProcedure,
		svc.LogEvent,
		connect.WithSchema(authzServiceLogEventMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	return "/authz.v1.AuthzService/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case AuthzServiceGetPolicyProcedure:
			authzServiceGetPolicyHandler.ServeHTTP(w, r)
		case AuthzServiceUpdatePolicyProcedure:
			authzServiceUpdatePolicyHandler.ServeHTTP(w, r)
		case AuthzServicePreviewAuthorizationProcedure:
			authzServicePreviewAuthorizationHandler.ServeHTTP(w, r)
		case AuthzServiceListAccessProcedure:
			authzServiceListAccessHandler.ServeHTTP(w, r)
		case AuthzServiceListEventsProcedure:
			authzServiceListEventsHandler.ServeHTTP(w, r)
		case AuthzServiceGetEventProcedure:
			authzServiceGetEventHandler.ServeHTTP(w, r)
		case AuthzServiceGetAuthorizationEvaluationProcedure:
			authzServiceGetAuthorizationEvaluationHandler.ServeHTTP(w, r)
		case AuthzServicePreviewPolicyProcedure:
			authzServicePreviewPolicyHandler.ServeHTTP(w, r)
		case AuthzServiceListUsersProcedure:
			authzServiceListUsersHandler.ServeHTTP(w, r)
		case AuthzServiceListReceiptsProcedure:
			authzServiceListReceiptsHandler.ServeHTTP(w, r)
		case AuthzServiceListS3ObjectsProcedure:
			authzServiceListS3ObjectsHandler.ServeHTTP(w, r)
		case AuthzServiceLogEventProcedure:
			authzServiceLogEventHandler.ServeHTTP(w, r)
		default:
			http.NotFound(w, r)
		}
	})
}

// UnimplementedAuthzServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedAuthzServiceHandler struct{}

func (UnimplementedAuthzServiceHandler) GetPolicy(context.Context, *connect.Request[v1.GetPolicyRequest]) (*connect.Response[v1.GetPolicyResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("authz.v1.AuthzService.GetPolicy is not implemented"))
}

func (UnimplementedAuthzServiceHandler) UpdatePolicy(context.Context, *connect.Request[v1.UpdatePolicyRequest]) (*connect.Response[v1.UpdatePolicyResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("authz.v1.AuthzService.UpdatePolicy is not implemented"))
}

func (UnimplementedAuthzServiceHandler) PreviewAuthorization(context.Context, *connect.Request[v1.PreviewAuthorizationRequest]) (*connect.Response[v1.PreviewAuthorizationResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("authz.v1.AuthzService.PreviewAuthorization is not implemented"))
}

func (UnimplementedAuthzServiceHandler) ListAccess(context.Context, *connect.Request[v1.ListAccessRequest]) (*connect.Response[v1.ListAccessResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("authz.v1.AuthzService.ListAccess is not implemented"))
}

func (UnimplementedAuthzServiceHandler) ListEvents(context.Context, *connect.Request[v1.ListEventsRequest]) (*connect.Response[v1.ListEventsResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("authz.v1.AuthzService.ListEvents is not implemented"))
}

func (UnimplementedAuthzServiceHandler) GetEvent(context.Context, *connect.Request[v1.GetEventRequest]) (*connect.Response[v1.GetEventResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("authz.v1.AuthzService.GetEvent is not implemented"))
}

func (UnimplementedAuthzServiceHandler) GetAuthorizationEvaluation(context.Context, *connect.Request[v1.GetAuthorizationEvaluationRequest]) (*connect.Response[v1.GetAuthorizationEvaluationResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("authz.v1.AuthzService.GetAuthorizationEvaluation is not implemented"))
}

func (UnimplementedAuthzServiceHandler) PreviewPolicy(context.Context, *connect.Request[v1.PreviewPolicyRequest]) (*connect.Response[v1.PreviewPolicyResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("authz.v1.AuthzService.PreviewPolicy is not implemented"))
}

func (UnimplementedAuthzServiceHandler) ListUsers(context.Context, *connect.Request[v1.ListUsersRequest]) (*connect.Response[v1.ListUsersResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("authz.v1.AuthzService.ListUsers is not implemented"))
}

func (UnimplementedAuthzServiceHandler) ListReceipts(context.Context, *connect.Request[v1.ListReceiptsRequest]) (*connect.Response[v1.ListReceiptsResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("authz.v1.AuthzService.ListReceipts is not implemented"))
}

func (UnimplementedAuthzServiceHandler) ListS3Objects(context.Context, *connect.Request[v1.ListS3ObjectsRequest]) (*connect.Response[v1.ListS3ObjectsResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("authz.v1.AuthzService.ListS3Objects is not implemented"))
}

func (UnimplementedAuthzServiceHandler) LogEvent(context.Context, *connect.Request[v1.LogEventRequest]) (*connect.Response[v1.LogEventResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("authz.v1.AuthzService.LogEvent is not implemented"))
}
