export interface GlideExample {
  name: string;
  workflowDefinition: string;
  input: InputExample[];
  inputSchema: string;
}

export interface InputExample {
  name: string;
  data: string;
}

export const EXAMPLES: GlideExample[] = [
  {
    name: "On-call access",
    workflowDefinition: `permit (principal, resource, action) when { principal.is_admin == true };
`,
    input: [
      {
        name: "On-call",
        data: `{
  "pagerduty": {
    "on_call": true
  },
  "group": "admins",
  "approvals": []
}
`,
      },
      {
        name: "Not on-call",
        data: `{
  "pagerduty": {
    "on_call": false
  },
  "group": "admins",
  "approvals": []
}
`,
      },
      {
        name: "Admin approval",
        data: `{
  "pagerduty": {
    "on_call": false
  },
  "group": "admins",
  "approvals": [
    {
      "user": "chris@commonfate.io",
      "groups": ["admins"]
    }
  ]
}
`,
      },
    ],
    inputSchema: `{
  "$id": "https://example.com/workflow.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "pagerduty": {
      "type": "object",
      "properties": {
        "on_call": {
          "type": "boolean"
        }
      }
    },
    "group": {
      "type": "string"
    }
  }
}
`,
  },
  {
    name: "Peer approval",
    workflowDefinition: `workflow:
  # Require approval from an additional developer.
  approval:
    steps:
      - start: request

      - name: Peer Approval
        action: approval
        with:
          groups:
            - developers

      - outcome: approved
`,
    input: [
      {
        name: "No approval",
        data: `{
  "approvals": []
}
`,
      },
      {
        name: "Peer approval",
        data: `{
  "approvals": [
    {
        "user": "chris@commonfate.io",
        "groups": ["developers"]
    }
  ]
}
`,
      },
      {
        name: "Wrong group",
        data: `{
  "approvals": [
    {
        "user": "chris@commonfate.io",
        "groups": ["other-group"]
    }
  ]
}
`,
      },
    ],
    inputSchema: `{
  "$id": "https://example.com/workflow.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "pagerduty": {
      "type": "object",
      "properties": {
        "on_call": {
          "type": "boolean"
        }
      }
    },
    "group": {
      "type": "string"
    }
  }
}
`,
  },
  {
    name: "Multi-party approval",
    workflowDefinition: `workflow:
  multiparty_approval:
    steps:
      - start: request

      # first, ops must approve access.
      - name: Ops Approval
        action: approval
        with:
          groups:
            - ops

      # then, security must approve access.
      - name: Security Approval
        action: approval
        with:
          groups:
            - security

      # must have approvals from 2 people
      - name: Approvals from two people?
        check: size(input.approvals) >= 2

      - outcome: approved
`,
    input: [
      {
        name: "No approval",
        data: `{
  "approvals": []
}
`,
      },
      {
        name: "ops approval",
        data: `{
  "approvals": [
    {
        "user": "alice@commonfate.io",
        "groups": ["ops"]
    }
  ]
}
`,
      },
      {
        name: "security approval",
        data: `{
  "approvals": [
    {
        "user": "bob@commonfate.io",
        "groups": ["security"]
    }
  ]
}
`,
      },
      {
        name: "ops and security approval",
        data: `{
  "approvals": [
    {
        "user": "alice@commonfate.io",
        "groups": ["ops"]
    },
    {
        "user": "bob@commonfate.io",
        "groups": ["security"]
    }
  ]
}
`,
      },
    ],
    inputSchema: `{
  "$id": "https://example.com/workflow.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "approvals": {
      "type": "array",
      "items": {
        "user": {
          "type": "string"
        },
        "groups": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    }
  }
}
`,
  },
  {
    name: "Expression evaluation",
    workflowDefinition: `workflow:
  device_management:
    steps:
      - start: request

      - and:
          - or:
            - name: Managed MacOS device
              check: 'input.device.sys_name == "Darwin" && input.device.managed'

            - name: Windows device with WebAuthn
              check: 'input.device.sys_name == "Windows" && input.webauthn.valid'

            - name: Location in UK
              check: 'input.location.country == "UK"'

          # a label on the namespace should match the requestor's groups
          - name: Resource namespace has requestor group
            check: input.resource.kubernetes.namespace.labels.exists(l, input.groups.exists(g, g == l))

      - outcome: approved`,
    input: [
      {
        name: "Successful request",
        data: `{
  "resource": {
    "kubernetes": {
      "namespace": {
        "labels": [
          "ops-group-owners",
          "prod"
        ]
      }
    }
  },
  "groups": ["ops-group-owners"],
  "device": {
    "managed": true,
    "sys_name": "Darwin",
    "last_updated": "12.6.0"
  },
  "location": {
    "country": "UK"
  },
  "webauthn": {
    "valid": true
  }
}
`,
      },
    ],
    inputSchema: `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "resource": {
      "type": "object",
      "properties": {
        "kubernetes": {
          "type": "object",
          "properties": {
            "namespace": {
              "type": "object",
              "properties": {
                "labels": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              },
              "required": ["labels"]
            }
          },
          "required": ["namespace"]
        }
      },
      "required": ["kubernetes"]
    },
    "groups": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "device": {
      "type": "object",
      "properties": {
        "managed": {
          "type": "boolean"
        },
        "sys_name": {
          "type": "string"
        },
        "last_updated": {
          "type": "string"
        }
      },
      "required": ["managed", "sys_name", "last_updated"]
    },
    "location": {
      "type": "object",
      "properties": {
        "country": {
          "type": "string"
        }
      },
      "required": ["country"]
    },
    "webauthn": {
      "type": "object",
      "properties": {
        "valid": {
          "type": "boolean"
        }
      },
      "required": ["valid"]
    }
  },
  "required": ["resource", "groups", "device", "location", "webauthn"]
}

`,
  },
];

export const EXAMPLE_NAMES = EXAMPLES.map((e) => e.name);
