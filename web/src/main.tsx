import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ReceiptListView from "./pages/index.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReceiptDetailPage from "./pages/receipts/[id].tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ReceiptListView />,
  },
  {
    path: "receipts/:id",
    element: <ReceiptDetailPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
