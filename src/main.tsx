import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrimarySearchAppBar from "./components/PrimarySearchAppBar";
import "./index.css";
import TasksPage from "./components/TasksPage";
import { store } from "./lib/store/store";
import { LocalizationProviderWrapper } from "./LocalizationProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrimarySearchAppBar />,
    children: [{ path: "/tasks", element: <TasksPage /> }],
  },
]);
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <LocalizationProviderWrapper>
      <RouterProvider router={router} />
    </LocalizationProviderWrapper>
  </Provider>
);
