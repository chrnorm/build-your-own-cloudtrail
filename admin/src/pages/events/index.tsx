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
} from "@chakra-ui/react";
import { useQuery } from "@connectrpc/connect-query";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { listEvents } from "../../gen/authz/v1/authz-AuthzService_connectquery";
import { Decision, Event } from "../../gen/authz/v1/authz_pb";
import { formatEID } from "../../eid";

function EventsPage() {
  const events = useQuery(listEvents, undefined, { refetchInterval: 1000 });

  const columnHelper = createColumnHelper<Event>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("operation", {
        header: () => "Operation",
        cell: (props) => {
          return (
            <Stack>
              <Text fontSize={"md"} fontWeight={"medium"}>
                {props.row.original.operation?.name}
              </Text>
              <Text fontSize="xs" color="gray.400" whiteSpace="nowrap">
                {props.row.original.operation?.method}{" "}
                {props.row.original.operation?.scheme}://
                {props.row.original.operation?.host}
                {props.row.original.operation?.path}{" "}
              </Text>
            </Stack>
          );
        },
      }),
      columnHelper.accessor("principal", {
        header: () => "Principal",
        cell: (props) => formatEID(props.getValue()!),
      }),
      columnHelper.accessor("endTime", {
        header: () => "Time",
        cell: (props) => {
          const date = new Date(props.getValue()!.toDate());
          return date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        },
      }),
      columnHelper.accessor("decision", {
        header: () => "Decision",
        cell: (props) => {
          const decision = props.getValue();
          switch (decision) {
            case Decision.ALLOW:
              return <Badge colorScheme="green">Allowed</Badge>;
            case Decision.DENY:
              return <Badge colorScheme="red">Denied</Badge>;
            default:
              return <Badge>Unspecified</Badge>;
          }
        },
      }),
    ],
    [columnHelper],
  );

  const table = useReactTable({
    data: events.data?.events ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const navigate = useNavigate();

  return (
    <Container maxW={"1600px"} pt={6}>
      <Breadcrumb mb={6}>
        <BreadcrumbItem>
          <BreadcrumbLink as={ReactRouterLink} to="/events">
            Events
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Stack>
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
                backgroundColor={
                  row.original.decision === Decision.DENY
                    ? "#ff000016"
                    : undefined
                }
                onClick={() => navigate(`/events/${row.original.id}`)}
                _hover={{
                  background:
                    row.original.decision === Decision.DENY
                      ? "#ff00008"
                      : "gray.800",
                  cursor: "pointer",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id} fontSize={"13px"}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>
    </Container>
  );
}

export default EventsPage;
