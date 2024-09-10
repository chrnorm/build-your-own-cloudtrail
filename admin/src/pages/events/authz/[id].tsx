import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  Badge,
  Flex,
  Heading,
  HStack,
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Card,
  CardBody,
  Code,
} from "@chakra-ui/react";
import { useQuery } from "@connectrpc/connect-query";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { getAuthorizationEvaluation } from "../../../gen/authz/v1/authz-AuthzService_connectquery";
import { UserIcon } from "../../../components/Logos";
import { RepeatClockIcon } from "@chakra-ui/icons";
import { Timestamp } from "@bufbuild/protobuf";
import { Decision } from "../../../gen/authz/v1/authz_pb";
import { formatEID } from "../../../eid";
import { PolicyPanel } from "../../../components/PolicyPanel";
import { formatDurationMillis } from "../../../formatDurationMillis";

const formatDate = (date: Timestamp | undefined) => {
  if (date === undefined) return "";

  const parsed = new Date(date.toDate());
  return parsed.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const renderDecision = (decision: Decision | undefined) => {
  switch (decision) {
    case Decision.ALLOW:
      return <Badge colorScheme="green">Allowed</Badge>;
    case Decision.DENY:
      return <Badge colorScheme="red">Denied</Badge>;
    default:
      return null;
  }
};

function AuthzEvaluationDetailPage() {
  const { evaluationId, id } = useParams();

  const { data } = useQuery(getAuthorizationEvaluation, { evaluationId });

  return (
    <Container maxW={"1000px"} pt={6}>
      <Breadcrumb mb={6}>
        <BreadcrumbItem>
          <BreadcrumbLink as={ReactRouterLink} to="/events">
            Events
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={ReactRouterLink} to={`/events/${id}`}>
            {id}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={ReactRouterLink} to={`#`}>
            Authorization {evaluationId}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Stack spacing={8}>
        <Stack>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Heading size="md">
              Authorization evaluation for{" "}
              <Box as="span" color="gray.400">
                {data?.evaluation?.request?.action?.type}::
              </Box>
              {data?.evaluation?.request?.action?.id}
            </Heading>
            <HStack>
              <RepeatClockIcon />{" "}
              <Text>{formatDate(data?.evaluation?.evaluatedAt)}</Text>
            </HStack>
          </Flex>
          <Stack borderRadius={"md"} borderWidth={"1px"} px={4} pb={4} pt={2}>
            <Table size="md">
              <Tbody>
                <Tr>
                  <Td px={0} py={2} w="200px">
                    <Text color="gray.400">Principal</Text>
                  </Td>
                  <Td px={0} py={2}>
                    <HStack>
                      <UserIcon />
                      <Text>{data?.evaluation?.request?.principal?.id}</Text>
                    </HStack>
                  </Td>
                </Tr>
                <Tr>
                  <Td px={0} py={2} w="200px">
                    <Text color="gray.400">Action</Text>
                  </Td>
                  <Td px={0} py={2}>
                    <Text>{formatEID(data?.evaluation?.request?.action)}</Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td px={0} py={2} w="200px">
                    <Text color="gray.400">Resource</Text>
                  </Td>
                  <Td px={0} py={2}>
                    <Text>
                      {formatEID(data?.evaluation?.request?.resource)}
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td px={0} py={2} w="200px">
                    <Text color="gray.400">Decision</Text>
                  </Td>
                  <Td px={0} py={2}>
                    {renderDecision(data?.evaluation?.decision)}
                  </Td>
                </Tr>
                <Tr>
                  <Td px={0} py={2}>
                    <Text color="gray.400">Evaluation Duration</Text>
                  </Td>
                  <Td px={0} py={2}>
                    <Text
                      color="foreground"
                      textOverflow="ellipsis"
                      isTruncated
                      maxW={{ base: "none", sm: "150px", xl: "none" }}
                      // onClick={onCopy}
                    >
                      {formatDurationMillis(
                        data?.evaluation?.evaluationDuration,
                      )}
                    </Text>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Stack>
          <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
            {data?.evaluation !== undefined ? (
              <AccordionItem>
                <AccordionButton>
                  <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    w="100%"
                  >
                    <Heading
                      fontWeight={"medium"}
                      size="md"
                      textColor="foreground"
                    >
                      Policies
                    </Heading>
                    <AccordionIcon />
                  </Flex>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <PolicyPanel
                    evaluation={data.evaluation}
                    policySets={data.evaluation.debugInformation?.policySets}
                  />
                </AccordionPanel>
              </AccordionItem>
            ) : null}

            <AccordionItem>
              <AccordionButton>
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  w="100%"
                >
                  <Heading
                    fontWeight={"medium"}
                    size="md"
                    textColor="foreground"
                  >
                    Principal
                  </Heading>
                  <AccordionIcon />
                </Flex>
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Stack>
                  <Text>
                    Details about the principal the request was evaluated for:
                  </Text>
                  <Card variant="brand" w="full">
                    <CardBody>
                      <Code bg="none" whiteSpace="pre" wordBreak="break-word">
                        {data?.evaluation?.debugInformation?.principalJson}
                      </Code>
                    </CardBody>
                  </Card>
                </Stack>
              </AccordionPanel>
            </AccordionItem>

            {data?.evaluation?.debugInformation?.resourceJson !== undefined &&
            data?.evaluation?.debugInformation?.resourceJson !== "" ? (
              <AccordionItem>
                <AccordionButton>
                  <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    w="100%"
                  >
                    <Heading
                      fontWeight={"medium"}
                      size="md"
                      textColor="foreground"
                    >
                      Resource
                    </Heading>
                    <AccordionIcon />
                  </Flex>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Stack>
                    <Text>
                      Details about the resource the request was evaluated for:
                    </Text>
                    <Card variant="brand" w="full">
                      <CardBody>
                        <Code bg="none" whiteSpace="pre" wordBreak="break-word">
                          {data?.evaluation?.debugInformation?.resourceJson}
                        </Code>
                      </CardBody>
                    </Card>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            ) : null}
          </Accordion>
        </Stack>
      </Stack>
    </Container>
  );
}

export default AuthzEvaluationDetailPage;
