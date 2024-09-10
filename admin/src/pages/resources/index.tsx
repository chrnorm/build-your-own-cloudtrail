import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

function ResourcesPage() {
  return (
    <Container maxW={"1000px"} pt={6}>
      <Breadcrumb mb={6}>
        <BreadcrumbItem>
          <BreadcrumbLink as={ReactRouterLink} href="/resources">
            Resources
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Stack>
        <Flex
          as={ReactRouterLink}
          to="/resources/users"
          borderRadius={"md"}
          borderWidth={"1px"}
          p={3}
        >
          Users
        </Flex>
        <Flex
          as={ReactRouterLink}
          to="/resources/receipts"
          borderRadius={"md"}
          borderWidth={"1px"}
          p={3}
        >
          Receipts
        </Flex>
        <Flex
          as={ReactRouterLink}
          to="/resources/s3-objects"
          borderRadius={"md"}
          borderWidth={"1px"}
          p={3}
        >
          S3 Objects
        </Flex>
      </Stack>
    </Container>
  );
}

export default ResourcesPage;
