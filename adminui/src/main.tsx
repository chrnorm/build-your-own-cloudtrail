import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import React, { useCallback, useState } from "react";
import { ViewUpdate } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";
import { githubLight } from "@uiw/codemirror-theme-github";
import { cedar } from "codemirror-lang-cedar";

function App() {
  const [value, setValue] = useState("permit(principal, action, resource);");

  const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
    setValue(value);
  }, []);

  return (
    <>
      <CodeMirror
        value={value}
        height="200px"
        extensions={[cedar()]}
        theme={githubLight}
        onChange={onChange}
      />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
