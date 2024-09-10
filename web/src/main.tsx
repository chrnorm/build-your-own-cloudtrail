import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ReceiptListView from "./pages/index.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReceiptDetailPage from "./pages/receipts/[id].tsx";
import Layout from "./components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
});

const ErrorFallback = ({ error }) => (
  <div className="m-2">
    <h1>Something went wrong:</h1>
    <pre>{error.message}</pre>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <ReceiptListView />
          </ErrorBoundary>
        ),
      },
      {
        path: "receipts/:id",
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <ReceiptDetailPage />
          </ErrorBoundary>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
