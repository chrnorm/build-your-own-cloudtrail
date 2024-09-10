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
  listS3Objects,
  listUsers,
} from "../../gen/authz/v1/authz-AuthzService_connectquery";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { S3Object } from "../../gen/authz/v1/authz_pb";
import { useMemo } from "react";

function S3ObjectsPage() {
  const receipts = useQuery(listS3Objects);

  const columnHelper = createColumnHelper<S3Object>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: () => "ID",
      }),
      columnHelper.accessor("owner", {
        header: () => "Owner",
      }),
    ],
    [columnHelper],
  );

  const table = useReactTable({
    data: receipts.data?.objects ?? [],
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
            S3 Objects
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

export default S3ObjectsPage;
