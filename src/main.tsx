import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrimarySearchAppBar from "./components/PrimarySearchAppBar";
import "./index.css";
import TasksPage from "./components/TasksPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrimarySearchAppBar />,
    children: [{ path: "/tasks", element: <TasksPage /> }],
  },
]);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
