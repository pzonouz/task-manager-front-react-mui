import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrimarySearchAppBar from "./components/PrimarySearchAppBar";
import "./index.css";
import TasksPage from "./components/TasksPage";
import { store } from "./lib/store/store";
import { LocalizationProviderWrapper } from "./LocalizationProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TaskPage from "./components/TaskPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrimarySearchAppBar />,
    children: [
      { path: "/tasks", element: <TasksPage /> },
      { path: "/tasks/:taskId", element: <TaskPage /> },
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
