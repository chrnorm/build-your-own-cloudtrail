import { ChakraProvider, ColorModeScript, DarkMode } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { ViewUpdate } from "@codemirror/view";
import CodeMirror, { basicSetup } from "@uiw/react-codemirror";
import { cedar } from "codemirror-lang-cedar";

export default function App({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState("permit(principal, action, resource);");

  const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
    setValue(value);
    // console.log("value:", value);
  }, []);

  return (
    <>
      <ColorModeScript initialColorMode={"dark"} />
      <CodeMirror
        value={value}
        height="200px"
        extensions={[cedar()]}
        // theme={xcodeDark}
        onChange={onChange}
      />
      {/**  <DarkMode>{children}</DarkMode> */}
    </>
  );
}
