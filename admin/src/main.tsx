import { StrictMode } from "react";
import { TransportProvider } from "@connectrpc/connect-query";
import { createRoot } from "react-dom/client";
import { ChakraProvider, DarkMode } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createConnectTransport } from "@connectrpc/connect-web";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/Layout.tsx";
import PoliciesPage from "./pages/policies.tsx";
import ResourcesPage from "./pages/resources/index.tsx";
import UsersPage from "./pages/resources/users.tsx";
import ReceiptsPage from "./pages/resources/receipts.tsx";
import S3ObjectsPage from "./pages/resources/s3_objects.tsx";

import EventDetailPage from "./pages/events/[id].tsx";
import EventsPage from "./pages/events/index.tsx";
import AuthzEvaluationDetailPage from "./pages/events/authz/[id].tsx";
import AccessPage from "./pages/access.tsx";
import AccessPreviewPage from "./pages/access-preview.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        index: true,
        element: <PoliciesPage />,
      },
      {
        path: "/access/preview",
        element: <AccessPreviewPage />,
      },
      {
        path: "/access",
        element: <AccessPage />,
      },
      {
        path: "/events/:id/authz/:evaluationId",
        element: <AuthzEvaluationDetailPage />,
      },
      {
        path: "/events/:id",
        element: <EventDetailPage />,
      },
      {
        path: "/events",
        element: <EventsPage />,
      },
      {
        path: "/resources/users",
        element: <UsersPage />,
      },
      {
        path: "/resources/receipts",
        element: <ReceiptsPage />,
      },
      {
        path: "/resources/s3-objects",
        element: <S3ObjectsPage />,
      },
      {
        path: "/resources",
        element: <ResourcesPage />,
      },
    ],
  },
]);

const transport = createConnectTransport({
  baseUrl: import.meta.env.VITE_API_URL || "",
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TransportProvider transport={transport}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <DarkMode>
            <RouterProvider router={router} />
          </DarkMode>
        </ChakraProvider>
      </QueryClientProvider>
    </TransportProvider>
  </StrictMode>,
);
