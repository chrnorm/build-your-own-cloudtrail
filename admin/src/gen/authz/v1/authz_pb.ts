// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file authz/v1/authz.proto (package authz.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum authz.v1.Decision
 */
export enum Decision {
  /**
   * @generated from enum value: DECISION_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: DECISION_ALLOW = 1;
   */
  ALLOW = 1,

  /**
   * @generated from enum value: DECISION_DENY = 2;
   */
  DENY = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(Decision)
proto3.util.setEnumType(Decision, "authz.v1.Decision", [
  { no: 0, name: "DECISION_UNSPECIFIED" },
  { no: 1, name: "DECISION_ALLOW" },
  { no: 2, name: "DECISION_DENY" },
]);

/**
 * @generated from message authz.v1.PreviewPolicyRequest
 */
export class PreviewPolicyRequest extends Message<PreviewPolicyRequest> {
  /**
   * @generated from field: string cedar_policy_text = 1;
   */
  cedarPolicyText = "";

  constructor(data?: PartialMessage<PreviewPolicyRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "authz.v1.PreviewPolicyRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "cedar_policy_text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PreviewPolicyRequest {
    return new PreviewPolicyRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PreviewPolicyRequest {
    return new PreviewPolicyRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PreviewPolicyRequest {
    return new PreviewPolicyRequest().fromJsonString(jsonString, options);
  }

  static equals(a: PreviewPolicyRequest | PlainMessage<PreviewPolicyRequest> | undefined, b: PreviewPolicyRequest | PlainMessage<PreviewPolicyRequest> | undefined): boolean {
    return proto3.util.equals(PreviewPolicyRequest, a, b);
  }
}

/**
 * @generated from message authz.v1.PreviewPolicyResponse
 */
export class PreviewPolicyResponse extends Message<PreviewPolicyResponse> {
  /**
   * @generated from field: repeated authz.v1.Evaluation permission_changes = 1;
   */
  permissionChanges: Evaluation[] = [];

  /**
   * @generated from field: repeated authz.v1.Test test_results = 2;
   */
  testResults: Test[] = [];

  constructor(data?: PartialMessage<PreviewPolicyResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "authz.v1.PreviewPolicyResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "permission_changes", kind: "message", T: Evaluation, repeated: true },
    { no: 2, name: "test_results", kind: "message", T: Test, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PreviewPolicyResponse {
    return new PreviewPolicyResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PreviewPolicyResponse {
    return new PreviewPolicyResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PreviewPolicyResponse {
    return new PreviewPolicyResponse().fromJsonString(jsonString, options);
  }

  static equals(a: PreviewPolicyResponse | PlainMessage<PreviewPolicyResponse> | undefined, b: PreviewPolicyResponse | PlainMessage<PreviewPolicyResponse> | undefined): boolean {
    return proto3.util.equals(PreviewPolicyResponse, a, b);
  }
}

/**
 * @generated from message authz.v1.EID
 */
export class EID extends Message<EID> {
  /**
   * @generated from field: string type = 1;
   */
  type = "";

  /**
   * @generated from field: string id = 2;
   */
  id = "";

  constructor(data?: PartialMessage<EID>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "authz.v1.EID";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EID {
    return new EID().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EID {
    return new EID().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EID {
    return new EID().fromJsonString(jsonString, options);
  }

  static equals(a: EID | PlainMessage<EID> | undefined, b: EID | PlainMessage<EID> | undefined): boolean {
    return proto3.util.equals(EID, a, b);
  }
}

/**
 * @generated from message authz.v1.AuthzRequest
 */
export class AuthzRequest extends Message<AuthzRequest> {
  /**
   * @generated from field: authz.v1.EID principal = 1;
   */
  principal?: EID;

  /**
   * @generated from field: authz.v1.EID action = 2;
   */
  action?: EID;

  /**
   * @generated from field: authz.v1.EID resource = 3;
   */
  resource?: EID;

  constructor(data?: PartialMessage<AuthzRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "authz.v1.AuthzRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "principal", kind: "message", T: EID },
    { no: 2, name: "action", kind: "message", T: EID },
    { no: 3, name: "resource", kind: "message", T: EID },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AuthzRequest {
    return new AuthzRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AuthzRequest {
    return new AuthzRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AuthzRequest {
    return new AuthzRequest().fromJsonString(jsonString, options);
  }

  static equals(a: AuthzRequest | PlainMessage<AuthzRequest> | undefined, b: AuthzRequest | PlainMessage<AuthzRequest> | undefined): boolean {
    return proto3.util.equals(AuthzRequest, a, b);
  }
}

/**
 * @generated from message authz.v1.Test
 */
export class Test extends Message<Test> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: authz.v1.AuthzRequest request = 2;
   */
  request?: AuthzRequest;

  /**
   * @generated from field: bool pass = 3;
   */
  pass = false;

  /**
   * @generated from field: authz.v1.Decision want = 4;
   */
  want = Decision.UNSPECIFIED;

  /**
   * @generated from field: authz.v1.Decision got = 5;
   */
  got = Decision.UNSPECIFIED;

  constructor(data?: PartialMessage<Test>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "authz.v1.Test";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "request", kind: "message", T: AuthzRequest },
    { no: 3, name: "pass", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 4, name: "want", kind: "enum", T: proto3.getEnumType(Decision) },
    { no: 5, name: "got", kind: "enum", T: proto3.getEnumType(Decision) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Test {
    return new Test().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Test {
    return new Test().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Test {
    return new Test().fromJsonString(jsonString, options);
  }

  static equals(a: Test | PlainMessage<Test> | undefined, b: Test | PlainMessage<Test> | undefined): boolean {
    return proto3.util.equals(Test, a, b);
  }
}

/**
 * @generated from message authz.v1.Evaluation
 */
export class Evaluation extends Message<Evaluation> {
  /**
   * @generated from field: authz.v1.AuthzRequest request = 1;
   */
  request?: AuthzRequest;

  /**
   * @generated from field: authz.v1.Decision decision = 2;
   */
  decision = Decision.UNSPECIFIED;

  constructor(data?: PartialMessage<Evaluation>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "authz.v1.Evaluation";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "request", kind: "message", T: AuthzRequest },
    { no: 2, name: "decision", kind: "enum", T: proto3.getEnumType(Decision) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Evaluation {
    return new Evaluation().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Evaluation {
    return new Evaluation().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Evaluation {
    return new Evaluation().fromJsonString(jsonString, options);
  }

  static equals(a: Evaluation | PlainMessage<Evaluation> | undefined, b: Evaluation | PlainMessage<Evaluation> | undefined): boolean {
    return proto3.util.equals(Evaluation, a, b);
  }
}

