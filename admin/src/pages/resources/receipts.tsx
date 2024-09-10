import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Flex,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@connectrpc/connect-query";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  listReceipts,
  listUsers,
} from "../../gen/authz/v1/authz-AuthzService_connectquery";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Receipt } from "../../gen/authz/v1/authz_pb";
import { useMemo } from "react";

function ReceiptsPage() {
  const receipts = useQuery(listReceipts);

  const columnHelper = createColumnHelper<Receipt>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: () => "ID",
      }),
      columnHelper.accessor("owner", {
        header: () => "Owner",
      }),
      columnHelper.accessor("category", {
        header: () => "Category",
      }),
    ],
    [columnHelper],
  );

  const table = useReactTable({
    data: receipts.data?.receipts ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container maxW={"1000px"} pt={6}>
      <Breadcrumb mb={6}>
        <BreadcrumbItem>
          <BreadcrumbLink as={ReactRouterLink} to="/resources">
            Resources
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={ReactRouterLink} href="#">
            Receipts
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
              <Tr borderBottomWidth={"1px"} key={row.id}>
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

export default ReceiptsPage;
