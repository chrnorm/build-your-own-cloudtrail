import React, { useMemo, useRef, useState } from "react";
import CodeMirror, { keymap, ViewUpdate } from "@uiw/react-codemirror";
import { cedar } from "codemirror-lang-cedar";
import { githubDark } from "@uiw/codemirror-theme-github";
import { Layout } from "./components/Layout";
import { Allotment, AllotmentHandle } from "allotment";
import "allotment/dist/style.css";
import {
  Badge,
  Box,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Table,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CloseIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { indentLess, indentMore } from "@codemirror/commands";
import { acceptCompletion, completionStatus } from "@codemirror/autocomplete";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const customKeymap = keymap.of([
  {
    key: "Tab",
    preventDefault: true,
    shift: indentLess,
    run: (e) => {
      if (!completionStatus(e.state)) return indentMore(e);
      return acceptCompletion(e);
    },
  },
]);

function App() {
  const [value, setValue] = React.useState(
    "permit (principal, action, resource);",
  );
  const onChange = React.useCallback((val: string, viewUpdate: ViewUpdate) => {
    setValue(val);
  }, []);

  const ref = useRef<AllotmentHandle>(null);
  const resultsRef = useRef<AllotmentHandle>(null);
  const [resultsMinimized, setResultsMinimized] = useState(false);
  const onResultsPanelChange = (sizes: number[]) => {
    if (sizes[1] <= 40) {
      setResultsMinimized(true);
    } else {
      setResultsMinimized(false);
    }
  };

  return (
    <Layout>
      <Flex w="100%" maxW="100vw" h="calc(100vh - 60px)">
        <Allotment defaultSizes={[35, 65]}>
          <Allotment
            vertical
            minSize={40}
            ref={ref}
            defaultSizes={[60, 40]}
            // onChange={onInputPanelChange}
          >
            <Stack className="workflowEditor" h="100%" flexGrow={1} w="100%">
              <Flex pt={2} px={3}>
                <Text textStyle={"Body/Medium"}>Policies</Text>
              </Flex>
              <Flex overflowY="scroll" width="100%">
                <CodeMirror
                  style={{ width: "100%" }}
                  value={value}
                  extensions={[customKeymap, cedar()]}
                  theme={githubDark}
                  indentWithTab={false}
                  onChange={onChange}
                />
              </Flex>
            </Stack>
          </Allotment>
          <Allotment
            vertical
            defaultSizes={[70, 30]}
            minSize={40}
            ref={resultsRef}
            onChange={onResultsPanelChange}
          >
            <Stack height="100%" className="workflowGraph">
              <Flex
                pt={2}
                px={3}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Text textStyle={"Body/Medium"}>Preview Changes</Text>
                <DiffStat added={1} removed={1} />
              </Flex>
              <Flex px={3}>
                <PermissionChangeTable
                  evals={[
                    {
                      decision: "allow",
                      request: {
                        action: {
                          id: "GetObject",
                          type: "AWS::S3::Action",
                        },
                        resource: {
                          id: "123456",
                          type: "S3::Object",
                        },
                        principal: {
                          id: "alice",
                          type: "User",
                        },
                      },
                    },
                    {
                      decision: "deny",
                      request: {
                        action: {
                          id: "GetObject",
                          type: "AWS::S3::Action",
                        },
                        resource: {
                          id: "123456",
                          type: "S3::Object",
                        },
                        principal: {
                          id: "bob",
                          type: "User",
                        },
                      },
                    },
                  ]}
                />
              </Flex>
            </Stack>
            <CollapsePanel
              minimised={resultsMinimized}
              onExpand={() => {
                resultsRef.current?.resize([70, 30]);
              }}
              onMinimise={() => {
                resultsRef.current?.resize([1000, 0]);
              }}
              title={
                <Flex pt={2}>
                  <Text textStyle={"Body/Medium"}>Tests</Text>
                </Flex>
              }
            >
              <TestResultList
                tests={[
                  {
                    name: "A user can read their own receipt metadata",
                    got: "allow",
                    want: "allow",
                    pass: true,
                    request: {
                      action: {
                        id: "GetReceipt",
                        type: "Action",
                      },
                      resource: {
                        id: "1",
                        type: "Receipt",
                      },
                      principal: {
                        id: "alice",
                        type: "User",
                      },
                    },
                  },
                  {
                    name: "A user can read their own receipt S3 object",
                    got: "allow",
                    want: "allow",
                    pass: true,
                    request: {
                      action: {
                        id: "GetObject",
                        type: "AWS::S3::Action",
                      },
                      resource: {
                        id: "123456",
                        type: "S3::Object",
                      },
                      principal: {
                        id: "alice",
                        type: "User",
                      },
                    },
                  },
                  {
                    name: "Cross-user S3 object access",
                    got: "allow",
                    want: "deny",
                    pass: false,
                    request: {
                      action: {
                        id: "GetObject",
                        type: "AWS::S3::Action",
                      },
                      resource: {
                        id: "123456",
                        type: "S3::Object",
                      },
                      principal: {
                        id: "bob",
                        type: "User",
                      },
                    },
                  },
                ]}
              />
            </CollapsePanel>
          </Allotment>
        </Allotment>
      </Flex>
    </Layout>
  );
}

interface CollapsePanelProps extends React.PropsWithChildren {
  title: React.ReactNode;
  onExpand: () => void;
  onMinimise: () => void;
  minimised: boolean;
}

const CollapsePanel: React.FC<CollapsePanelProps> = ({
  onExpand,
  onMinimise,
  minimised,
  title,
  children,
}) => {
  const callback = minimised ? onExpand : onMinimise;

  return (
    <Stack>
      <Tabs>
        <Flex
          justify="space-between"
          alignItems={"center"}
          px={3}
          py={1}
          pt={1}
        >
          {title}
          <Spacer onClick={callback} />
          <IconButton
            variant={"ghost"}
            icon={minimised ? <ChevronUpIcon /> : <ChevronDownIcon />}
            aria-label={"expand"}
            size="xs"
            onClick={callback}
          />
        </Flex>
        {children}
      </Tabs>
    </Stack>
  );
};

interface AccessTest {
  name: string;
  request: AuthzRequest;
  want: "allow" | "deny";
  got: "allow" | "deny";
  pass: boolean;
}

interface TestResultListProps {
  tests: AccessTest[];
}

const TestResultList: React.FC<TestResultListProps> = ({ tests }) => {
  return (
    <Stack spacing={5}>
      {tests.map((test) => (
        <TestResult key={test.name} test={test} />
      ))}
    </Stack>
  );
};

interface TestResultProps {
  test: AccessTest;
}

const TestResult: React.FC<TestResultProps> = ({ test }) => {
  const [expanded, setExpanded] = useState(test.pass === false);

  return (
    <Stack spacing={0}>
      <Flex color="#d0d7de" alignItems={"center"} py={1} px={3}>
        <Flex w={6} alignItems="center">
          <IconButton
            color="neutrals.500"
            size="s"
            variant={"unstyled"}
            aria-label="expand"
            onClick={() => setExpanded(!expanded)}
            icon={expanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
          />
        </Flex>
        <Flex w={6} alignItems="center">
          {test.pass ? (
            <CheckCircleIcon boxSize={"18px"} color="#3fb950" />
          ) : (
            <CloseIcon
              boxSize={"18px"}
              bgColor="#f85149"
              rounded="full"
              p={"4px"}
              color="#0d1116"
            />
          )}
        </Flex>
        <Text color={test.pass ? "#d0d7de" : "#f85149"}>{test.name}</Text>
      </Flex>
      {expanded && (
        <Stack pl={"60px"} spacing={1}>
          <Text color="#d0d7de" fontSize={"12px"} fontFamily="mono">
            {formatEID(test.request.principal)} is{" "}
            {test.got === "allow" ? "allowed to call" : "denied from calling"}{" "}
            {formatEID(test.request.action)} on{" "}
            {formatEID(test.request.resource)}
            {test.pass === false ? ` (expected ${test.want})` : null}
          </Text>
        </Stack>
      )}
    </Stack>
  );
};

interface PermissionChangeTableProps {
  evals: Evaluation[];
}

interface EID {
  id: string;
  type: string;
}

interface AuthzRequest {
  principal: EID;
  action: EID;
  resource: EID;
}

interface Evaluation {
  request: AuthzRequest;
  decision: "allow" | "deny";
}

const formatEID = (eid: EID) => `${eid.type}::"${eid.id}"`;

const PermissionChangeTable: React.FC<PermissionChangeTableProps> = ({
  evals,
}) => {
  const columnHelper = createColumnHelper<Evaluation>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("request.principal", {
        header: () => "Principal",
        cell: (info) => `${info.getValue().type}::"${info.getValue().id}"`,
      }),
      columnHelper.accessor("request.action", {
        header: () => "Action",
        cell: (info) => `${info.getValue().type}::"${info.getValue().id}"`,
      }),
      columnHelper.accessor("request.resource", {
        header: () => "Resource",
        cell: (info) => `${info.getValue().type}::"${info.getValue().id}"`,
      }),
      columnHelper.accessor("decision", {
        header: () => "Decision",
        cell: (info) => {
          const decision = info.getValue();
          switch (decision) {
            case "allow":
              return <Badge colorScheme="green">Will be allowed</Badge>;
            case "deny":
              return <Badge colorScheme="red">Will be denied</Badge>;
            default:
              return <Badge>Unspecified</Badge>;
          }
        },
      }),
    ],
    [columnHelper],
  );

  const table = useReactTable({
    data: evals,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
  );
};

interface DiffStatProps {
  added: number;
  removed: number;
}

const getDiffBoxColor = (added: number, removed: number, index: number) => {
  const total = added + removed;
  if (total === 0) {
    return {
      bgColor: "#656c7633",
      outline: "1px solid #3d444db3",
      outlineOffset: "-1px",
    };
  }

  if (index < added) {
    return { bgColor: "#3fb950" };
  } else if (index < total) {
    return { bgColor: "#f85149" };
  } else {
    return {
      bgColor: "#656c7633",
      outline: "1px solid #3d444db3",
      outlineOffset: "-1px",
    };
  }
};

const DiffStat: React.FC<DiffStatProps> = ({ added, removed }) => {
  return (
    <HStack fontSize={"12px"}>
      <Text color="#3fb950">+{added}</Text>
      <Text color="#f85149">-{removed}</Text>
      <HStack spacing={0.5}>
        <Box boxSize={"8px"} {...getDiffBoxColor(added, removed, 0)} />
        <Box boxSize={"8px"} {...getDiffBoxColor(added, removed, 1)} />
        <Box boxSize={"8px"} {...getDiffBoxColor(added, removed, 2)} />
        <Box boxSize={"8px"} {...getDiffBoxColor(added, removed, 3)} />
        <Box boxSize={"8px"} {...getDiffBoxColor(added, removed, 4)} />
      </HStack>
    </HStack>
  );
};

export default App;
