import { Box, Flex, HStack, Text, Link } from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { CommonFateLightLogo } from "./Logos";

interface Props {
  children?: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Flex bg="#0d1116" h="100vh">
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
        bg="#0d1116"
      >
        <HStack spacing={6}>
          <HStack spacing={3}>
            <Text whiteSpace={"nowrap"} textStyle={"Body/Small"} fontSize="sm">
              Build-Your-Own-CloudTrail
            </Text>
          </HStack>
        </HStack>
        <HStack spacing={3}>
          <Text fontSize={"xs"}>
            Created by{" "}
            <Link
              href="https://x.com/chr_norm"
              target="_blank"
              rel="noreferrer"
            >
              Chris Norman
            </Link>{" "}
            at{" "}
            <Link
              href="https://commonfate.io?utm_source=buildyourowncloudtrail"
              target="_blank"
              rel="noreferrer"
            >
              Common Fate
            </Link>{" "}
          </Text>
          <Box
            w="142px"
            h="25px"
            as={ReactRouterLink}
            to="https://commonfate.io?utm_source=buildyourowncloudtrail"
          >
            <CommonFateLightLogo w="100%" h="100%" />
          </Box>
        </HStack>
      </Flex>
      <Box pt="60px" w="100%">
        {children}
      </Box>
    </Flex>
  );
};