import { StrictMode } from "react";
import { TransportProvider } from "@connectrpc/connect-query";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, DarkMode } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createConnectTransport } from "@connectrpc/connect-web";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
