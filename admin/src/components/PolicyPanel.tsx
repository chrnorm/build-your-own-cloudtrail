import {
  Card,
  CardHeader,
  CardBody,
  Stack,
  Heading,
  Code,
  Text,
  Box,
} from "@chakra-ui/react";
import React, { useState, useMemo } from "react";
import {
  PolicySet,
  Evaluation,
  Policy,
  Decision,
} from "../gen/authz/v1/authz_pb";

interface PolicyPanelProps {
  policySets: PolicySet[] | undefined;
  evaluation: Evaluation;
}

export const PolicyPanel: React.FC<PolicyPanelProps> = (props) => {
  const [relevant] = useState(true);

  return (
    <Card variant="brand" w="full">
      {(props.policySets?.length ?? 0) > 0 ? (
        <CardHeader
          borderBottomColor={"border"}
          borderBottomWidth={"1px"}
          p={1}
        >
          {/** <Flex justifyContent={"flex-end"} w="full">
            <Button
              size="xs"
              rounded="none"
              borderRadius={"4px"}
              variant={"outline"}
              onClick={() => setRelevant(!relevant)}
              minW="190px"
              pl={"10px"}
              textAlign={"left"}
            >
              {relevant ? "Show All Policies" : "Show Contributing Policies"}
            </Button>
          </Flex> */}
        </CardHeader>
      ) : null}
      <CardBody>
        {relevant ? (
          <RelevantPolicies {...props} />
        ) : (
          <Stack>
            {props.policySets?.map((ps) => (
              <Stack key={ps.id}>
                <Heading size="sm" textColor="foreground">
                  {ps.id}
                </Heading>
                <Code whiteSpace={"pre"} p={2}>
                  {ps.text}
                </Code>
              </Stack>
            ))}
          </Stack>
        )}
      </CardBody>
    </Card>
  );
};

interface MatchingPolicy {
  policy: Policy;
  effect: "permit" | "forbid";
}

const RelevantPolicies: React.FC<PolicyPanelProps> = (props) => {
  const action = props.evaluation.request?.action;
  const reason = props.evaluation.diagnostics?.reason ?? [];

  const decision =
    props.evaluation?.decision === Decision.ALLOW
      ? "Allowed"
      : props.evaluation?.decision === Decision.DENY
        ? "Denied"
        : "Unspecified";

  const matchingPolicies = useMemo(() => {
    const matching: MatchingPolicy[] = [];

    const policySets: Map<string, PolicySet> = new Map();

    props.policySets?.forEach((ps) => {
      ps.policies.forEach((policy) => {
        const effect = policy.text.trim().startsWith("permit")
          ? "permit"
          : "forbid";

        matching.push({
          policy,
          effect,
        });
      });
      policySets.set(ps.id, ps);
    });

    return matching;
  }, [props.policySets]);

  if (reason.length === 0 && props.evaluation.decision === Decision.DENY) {
    // there were no matching policies so suggest a fix
    return (
      <Stack>
        <Text fontSize={"sm"} color="foreground">
          <Box as="span" color="textDim">
            {action?.type}::
          </Box>
          {action?.id} was <b>{decision.toLowerCase()}</b> because no matching
          policies were found.
          {reason.map((reason, i) => (
            <React.Fragment key={reason}>
              <Code>{reason}</Code>
              {i < reason.length - 1 ? ", " : null}
            </React.Fragment>
          ))}
        </Text>
        <Text fontSize={"sm"} color="foreground">
          To fix this, you can add a <Code>permit</Code> policy as follows:
        </Text>
        <Code whiteSpace={"pre"} p={2}>{`permit(
  principal == ${props.evaluation.request?.principal?.type}::"${
    props.evaluation.request?.principal?.id
  }",
  action == ${props.evaluation.request?.action?.type}::"${
    props.evaluation.request?.action?.id
  }",
  resource == ${props.evaluation.request?.resource?.type}::"${
    props.evaluation.request?.resource?.id
  }"
);
`}</Code>
      </Stack>
    );
  }

  if (props.policySets === undefined) {
    return (
      <Stack>
        <Text fontSize={"sm"} color="foreground">
          <Box as="span" color="textDim">
            {action?.type}::
          </Box>
          {action?.id} was <b>{decision.toLowerCase()}</b> because of:{" "}
          {reason.map((reason, i) => (
            <React.Fragment key={reason}>
              <Code>{reason}</Code>
              {i < reason.length - 1 ? ", " : null}
            </React.Fragment>
          ))}
        </Text>
      </Stack>
    );
  }

  return (
    <Stack>
      <Text fontSize={"sm"} color="foreground">
        <Box as="span" color="textDim">
          {action?.type}::
        </Box>
        {action?.id} was <b>{decision.toLowerCase()}</b> because of:
      </Text>
      <Stack>
        {matchingPolicies.map(({ policy, effect }) => (
          <Stack key={policy.id}>
            <Heading size="sm" textColor="foreground">
              {policy.id}
            </Heading>
            <Code
              whiteSpace={"pre"}
              colorScheme={effect === "permit" ? "green" : "red"}
              p={2}
            >
              {policy.text}
            </Code>
            {policy.id.includes("default_api_authorization_policy.") ? (
              <Text fontSize={"12px"}>
                This policy is a built-in Cedar policy used internally for
                authorizing Common Fate APIs.
              </Text>
            ) : null}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
