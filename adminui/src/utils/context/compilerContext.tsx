import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { CompileError, ExecutionGraph } from "../../../backend-client/types";
import { runWorkflow } from "../../../backend-client/workflow/workflow";
import useDebounce from "../../hooks/useDebounce";
import { EXAMPLES } from "../examples";
import { createCtx } from "./createCtx";

export interface CompilerContextProps {
  isCompiling: boolean;
  setIsCompiling: React.Dispatch<React.SetStateAction<boolean>>;
  inputSchema: string;
  setInputSchema: React.Dispatch<React.SetStateAction<string>>;
  workflowDef: string;
  setWorkflowDef: React.Dispatch<React.SetStateAction<string>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  graph: ExecutionGraph;
  compileError: string | undefined;
  lintErrors: CompileError[];
  exampleName: string;
  setExampleName: React.Dispatch<React.SetStateAction<string>>;
  selectedInputName: string;
  setSelectedInputName: React.Dispatch<React.SetStateAction<string>>;
  inputNames: string[];

  run: () => void;
}

const [useCompiler, CompilerContextProvider] =
  createCtx<CompilerContextProps>();

interface Props {
  children: React.ReactNode;
}

const defaultExample = EXAMPLES[0];
const defaultInput = defaultExample.input[0];

const CompilerProvider: React.FC<Props> = ({ children }) => {
  const [exampleName, setExampleName] = useState(defaultExample.name);
  const [selectedInputName, setSelectedInputName] = useState(defaultInput.name);
  const [inputNames, setInputNames] = useState(
    defaultExample.input.map((e) => e.name)
  );
  const [lintErrors, setLintErrors] = useState<CompileError[]>([]);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const [workflowDef, setWorkflowDef] = useState<string>(
    defaultExample.workflowDefinition
  );
  const debouncedWorkflowDef = useDebounce<string>(workflowDef, 500);

  const [inputSchema, setInputSchema] = useState<string>(
    defaultExample.inputSchema
  );
  const debouncedInputSchema = useDebounce<string>(inputSchema, 500);

  const [input, setInput] = useState<string>(defaultInput.data);
  const debouncedInput = useDebounce<string>(input, 500);

  const [graph, setGraph] = useState<ExecutionGraph>({
    nodes: [],
    actions: [],
    outcome: "",
  });

  // update the editable files when the example changes
  useEffect(() => {
    const example = EXAMPLES.find((e) => e.name === exampleName);
    if (example === undefined) {
      return;
    }
    const input = example.input[0];

    setWorkflowDef(example.workflowDefinition);
    setSelectedInputName(input.name);
    setInput(input.data);
    setInputNames(example.input.map((e) => e.name));
    setInputSchema(example.inputSchema);
  }, [exampleName]);

  // update the input and reset the schema when the input example changes
  useEffect(() => {
    const example = EXAMPLES.find((e) => e.name === exampleName);
    if (example === undefined) {
      return;
    }
    const input = example.input.find((e) => e.name === selectedInputName);
    if (input === undefined) {
      return;
    }

    setSelectedInputName(input.name);
    setInput(input.data);
    setInputSchema(example.inputSchema);
  }, [selectedInputName, exampleName]);

  // recompile the graph automatically
  useEffect(() => {
    setIsCompiling(true);
    runWorkflow({
      inputSchema: inputSchema,
      workflowDefinition: debouncedWorkflowDef,
      input,
    })
      .then((res) => {
        setGraph(res.graph);
        setError(undefined);
        setLintErrors([]);
        setIsCompiling(false);
      })
      .catch((e: any) => {
        let description: string | undefined;
        if (axios.isAxiosError(e)) {
          // try and parse the response as {"error": "msg"}
          description = (e as AxiosError<{ error: string }>)?.response?.data
            .error;
          if (description !== undefined) {
            setError(description);
          }
          // try and parse the response as {"compileError": [<errors>]}
          const errors = (e as AxiosError<{ compileErrors: CompileError[] }>)
            ?.response?.data.compileErrors;
          if (errors !== undefined) {
            setLintErrors(errors);
          }

          setIsCompiling(false);
        }
      });
  }, [debouncedWorkflowDef, debouncedInputSchema, debouncedInput]);

  const run = () => {
    setIsCompiling(true);
    runWorkflow({
      input,
      inputSchema,
      workflowDefinition: workflowDef,
    })
      .then((res) => {
        setGraph(res.graph);
        setError(undefined);
        setIsCompiling(false);
      })
      .catch((e: any) => {
        let description: string | undefined;
        if (axios.isAxiosError(e)) {
          description = (e as AxiosError<{ error: string }>)?.response?.data
            .error;
          setError(description);
          setIsCompiling(false);
        }
      });
  };

  return (
    <CompilerContextProvider
      value={{
        isCompiling,
        setIsCompiling,
        graph,
        input,
        inputSchema,
        setInput,
        setInputSchema,
        setWorkflowDef,
        workflowDef,
        compileError: error,
        run,
        lintErrors,
        exampleName,
        setExampleName,
        selectedInputName,
        setSelectedInputName,
        inputNames,
      }}
    >
      {children}
    </CompilerContextProvider>
  );
};

export { useCompiler, CompilerProvider };
