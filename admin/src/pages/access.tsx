import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@connectrpc/connect-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { listAccess } from "../gen/authz/v1/authz-AuthzService_connectquery";
import { Decision, Evaluation } from "../gen/authz/v1/authz_pb";
import { useMemo } from "react";
import { formatEID } from "../eid";

function AccessPage() {
  const { data } = useQuery(listAccess);

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
        cell: (info) => {
          const decision = info.getValue();
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
    data: data?.evaluations ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const navigate = useNavigate();

  return (
    <Container maxW={"1000px"} pt={6}>
      <Breadcrumb mb={6}>
        <BreadcrumbItem>
          <BreadcrumbLink as={ReactRouterLink} href="/resources">
            Access
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
                cursor={"pointer"}
                onClick={() =>
                  navigate(
                    `/access/preview?principalType=${row.original.request?.principal?.type}&principalId=${row.original.request?.principal?.id}&actionType=${row.original.request?.action?.type}&actionId=${row.original.request?.action?.id}&resourceType=${row.original.request?.resource?.type}&resourceId=${row.original.request?.resource?.id}`,
                  )
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

export default AccessPage;
