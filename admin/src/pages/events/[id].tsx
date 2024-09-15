import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Text,
  Thead,
  Tr,
  Badge,
  Flex,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { useQuery } from "@connectrpc/connect-query";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import {
  Link as ReactRouterLink,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getEvent } from "../../gen/authz/v1/authz-AuthzService_connectquery";
import { UserIcon } from "../../components/Logos";
import { RepeatClockIcon } from "@chakra-ui/icons";
import { Timestamp } from "@bufbuild/protobuf";
import { Decision, Evaluation, Event } from "../../gen/authz/v1/authz_pb";
import { formatEID } from "../../eid";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { githubDark } from "@uiw/codemirror-theme-github";

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

const renderEvent = (event: Event | undefined) => {
  if (event === undefined) {
    return "";
  }

  const decision = event.decision === Decision.ALLOW ? "allow" : "deny";

  const { authzEvaluations, ...otherFields } = event;

  return JSON.stringify(
    {
      ...otherFields,
      decision,
      authorizations: authzEvaluations.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ debugInformation, ...rest }) => ({
          ...rest,
          decision: rest.decision === Decision.ALLOW ? "allow" : "deny",
        }),
      ),
    },
    null,
    "  ",
  );
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

const jsonExtensions = [json(), EditorView.lineWrapping];

function EventDetailPage() {
  const { id: eventId } = useParams();

  const event = useQuery(getEvent, { eventId });

  const columnHelper = createColumnHelper<Evaluation>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("request.principal", {
        header: () => "Principal",
        cell: (info) => formatEID(info.getValue()),
      }),
      columnHelper.accessor("request.action", {
        header: () => "Action",
        cell: (info) => formatEID(info.getValue()),
      }),
      columnHelper.accessor("request.resource", {
        header: () => "Resource",
        cell: (info) => formatEID(info.getValue()),
      }),
      columnHelper.accessor("decision", {
        header: () => "Decision",
        cell: (info) => renderDecision(info.getValue()),
      }),
    ],
    [columnHelper],
  );

  const table = useReactTable({
    data: event.data?.event?.authzEvaluations ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const navigate = useNavigate();

  const eventJSON =
    event.data?.event !== undefined ? renderEvent(event.data.event) : "";

  return (
    <Container maxW={"1000px"} pt={6}>
      <Breadcrumb mb={6}>
        <BreadcrumbItem>
          <BreadcrumbLink as={ReactRouterLink} to="/events">
            Events
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={ReactRouterLink} to="#">
            {event.data?.event?.id}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Stack spacing={8}>
        <Stack>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Heading size="md">{event.data?.event?.operation?.name}</Heading>
            <HStack>
              <RepeatClockIcon />{" "}
              <Text>{formatDate(event.data?.event?.endTime)}</Text>
            </HStack>
          </Flex>
          <Stack borderRadius={"md"} borderWidth={"1px"} px={4} pb={4} pt={2}>
            <Table size="md">
              <Tbody>
                <Tr>
                  <Td px={0} py={2} w="200px">
                    <Text color="textDim">Principal</Text>
                  </Td>
                  <Td px={0} py={2}>
                    <HStack>
                      <UserIcon />
                      <Text>{event.data?.event?.principal?.id}</Text>
                    </HStack>
                  </Td>
                </Tr>
                <Tr>
                  <Td px={0} py={2} w="200px">
                    <Text color="textDim">HTTP Operation</Text>
                  </Td>
                  <Td px={0} py={2}>
                    <Text>
                      {event.data?.event?.operation?.method}{" "}
                      {event.data?.event?.operation?.scheme}://
                      {event.data?.event?.operation?.host}
                      {event.data?.event?.operation?.path}{" "}
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td px={0} py={2} w="200px">
                    <Text color="textDim">Decision</Text>
                  </Td>
                  <Td px={0} py={2}>
                    {renderDecision(event.data?.event?.decision)}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Stack>
        </Stack>
        <Stack>
          <Heading size="xs">Authorizations</Heading>
          <Table
            size={"sm"}
            sx={{ tableLayout: "fixed", width: "full" }}
            variant="unstyled"
          >
            <Thead bg="#252626" borderTopRadius="4px">
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id} borderTopWidth={"0px"}>
                  {headerGroup.headers.map((header) => (
                    <Th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => (
                <Tr
                  borderBottomWidth={"1px"}
                  key={row.id}
                  cursor={"pointer"}
                  onClick={() =>
                    navigate(`/events/${eventId}/authz/${row.original.id}`)
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <Td
                      key={cell.id}
                      fontSize={"13px"}
                      bg={
                        cell.row.original.decision === Decision.ALLOW
                          ? "#2ea04326"
                          : "#f8514926"
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack>
        <Stack pb={6}>
          <Heading size="xs">Event Details</Heading>
          <CodeMirror
            theme={githubDark}
            value={eventJSON}
            extensions={jsonExtensions}
          />
        </Stack>
      </Stack>
    </Container>
  );
}

export default EventDetailPage;
