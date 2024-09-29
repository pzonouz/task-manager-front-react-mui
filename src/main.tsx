import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrimarySearchAppBar from "./components/PrimarySearchAppBar";
import "./index.css";
import { store } from "./lib/store/store";
import { LocalizationProviderWrapper } from "./LocalizationProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TaskPage from "./pages/TaskPage";
import TasksPage from "./pages/TasksPage";
import CategoriesPage from "./pages/CategoriesPage";
import PrioritiesPage from "./pages/PrioritiesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrimarySearchAppBar />,
    children: [
      {
        path: "/tasks",
        element: <TasksPage />,
      },
      { path: "/tasks/:taskId", element: <TaskPage /> },
      { path: "/categories", element: <CategoriesPage /> },
      { path: "/priorities", element: <PrioritiesPage /> },
    ],
  },
]);
const theme = createTheme({});
createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <LocalizationProviderWrapper>
        <RouterProvider router={router} />
      </LocalizationProviderWrapper>
    </Provider>
  </ThemeProvider>
);
