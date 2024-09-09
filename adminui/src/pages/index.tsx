import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Select,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { json } from "@codemirror/lang-json";
import { cedar } from "codemirror-lang-cedar";
import { StreamLanguage, syntaxHighlighting } from "@codemirror/language";
import { yaml } from "@codemirror/legacy-modes/mode/yaml";
import { Diagnostic, linter, lintGutter } from "@codemirror/lint";
import { ViewUpdate } from "@codemirror/view";
import { xcodeDark, xcodeDarkInit } from "@uiw/codemirror-theme-xcode";
import CodeMirror, { basicSetup } from "@uiw/react-codemirror";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { Allotment, AllotmentHandle } from "allotment";
import "allotment/dist/style.css";
import { useCallback, useEffect, useRef, useState } from "react";

import { Layout } from "../components/Layout";
import { useCompiler } from "../utils/context/compilerContext";

const theme = xcodeDarkInit({
  settings: {
    background: "#1c1c1e",
    gutterBackground: "#1c1c1e",
    lineHighlight: "none",
    selection: "#595959",
  },
});

// const jsonExtensions = [json(), EditorView.lineWrapping];

const yamlExtensions = [
  // lintGutter(),
  cedar(),
];

const Home = () => {
  const { setWorkflowDef, workflowDef, graph, compileError, lintErrors } =
    useCompiler();

  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("onboarded") == null) {
      setShowOnboarding(true);
    }
  });

  const ref = useRef<AllotmentHandle>(null);
  const resultsRef = useRef<AllotmentHandle>(null);
  const [schemaMinimised, setSchemaMinimised] = useState(true);
  const onInputPanelChange = (sizes: number[]) => {
    if (sizes[1] <= 40) {
      setSchemaMinimised(true);
    } else {
      setSchemaMinimised(false);
    }
  };

  const [resultsMinimized, setResultsMinimized] = useState(false);
  const onResultsPanelChange = (sizes: number[]) => {
    if (sizes[1] <= 40) {
      setResultsMinimized(true);
    } else {
      setResultsMinimized(false);
    }
  };

  const yamlLinter = useCallback(
    () =>
      linter((view) => {
        // console.log({ lintErrors });
        const diagnostics: Diagnostic[] = lintErrors.map((le) => ({
          from: le.start,
          to: le.end,
          message: le.msg,
          severity: "error",
        }));

        return diagnostics;
      }),
    [lintErrors]
  );

  const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
    setWorkflowDef(value);
    // console.log("value:", value);
  }, []);

  return (
    <CodeMirror
      value={workflowDef}
      height="200px"
      extensions={[cedar()]}
      // theme={xcodeDark}
      onChange={onChange}
    />
  );

  return (
    <Layout>
      <Flex maxW="100vw" h="calc(100vh - 60px)">
        <Allotment defaultSizes={[35, 65]}>
          <Allotment
            vertical
            minSize={40}
            ref={ref}
            defaultSizes={[60, 40]}
            onChange={onInputPanelChange}
          >
            <Stack className="workflowEditor" h="100%" flexGrow={1} w="100%">
              <Flex pt={2} px={3}>
                <Text textStyle={"Body/Medium"}>Policies</Text>
              </Flex>
              <Flex overflowY="scroll">
                <CodeMirror
                  onChange={onChange}
                  theme={theme}
                  value={workflowDef}
                  extensions={yamlExtensions}
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
              <ParentSize className="graph-container" debounceTime={10}>
                {
                  ({ width: visWidth, height: visHeight }) => null
                  // <GlideGraph
                  //   width={visWidth}
                  //   height={visHeight}
                  //   graph={graph}
                  // />
                }
              </ParentSize>
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
                  <Text textStyle={"Body/Medium"}>Access Tests</Text>
                </Flex>
              }
            >
              <Stack px={3}>
                {graph.outcome !== "" ? (
                  <Text textStyle={"Body/Small"} whiteSpace="pre">
                    Outcome: {graph.outcome}
                  </Text>
                ) : null}

                {graph.actions?.length > 0 ? (
                  <Text textStyle={"Body/Small"} whiteSpace="pre">
                    Actions: {graph.actions.join(", ")}
                  </Text>
                ) : null}

                {compileError != undefined ? (
                  <Text textStyle={"Body/Small"} whiteSpace="pre">
                    Error: {compileError}
                  </Text>
                ) : null}
              </Stack>
            </CollapsePanel>
          </Allotment>
        </Allotment>
      </Flex>
    </Layout>
  );
};

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

export default Home;
