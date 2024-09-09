import { Box, Flex, HStack, Select, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-location";
import { useCompiler } from "../utils/context/compilerContext";
import { EXAMPLES } from "../utils/examples";
import { CommonFateLightLogo } from "./Logos";

interface Props {
  children?: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const { isCompiling, run, exampleName, setExampleName } = useCompiler();
  return (
    <>
      <Flex
        w="100%"
        as="nav"
        h="60px"
        top={0}
        borderBottomWidth={"1px"}
        alignItems="center"
        justifyContent={"space-between"}
        px={3}
        zIndex={500}
        position="fixed"
      >
        <HStack spacing={6}>
          <HStack spacing={3}>
            <Box w="142px" h="25px" as={Link} to="/">
              <CommonFateLightLogo w="100%" h="100%" />
            </Box>
            <Text whiteSpace={"nowrap"} textStyle={"Body/Medium"}>
              Policy Playground
            </Text>
          </HStack>
        </HStack>
        <HStack spacing={6}>
          {isCompiling ? <Spinner size="xs" /> : undefined}
          {/* <Button
            px={6}
            borderRadius={4}
            leftIcon={<Icon as={BsPlayFill} />}
            onClick={run}
            className="runButton"
          >
            Run
          </Button> */}
          <Select
            className="selectExample"
            value={exampleName}
            onChange={(e) => setExampleName(e.target.value)}
          >
            {EXAMPLES.map((e) => (
              <option key={e.name} value={e.name}>
                {e.name}
              </option>
            ))}
          </Select>
        </HStack>
      </Flex>
      <Box pt="60px">{children}</Box>
    </>
  );
};
