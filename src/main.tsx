import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import PrimarySearchAppBar from "./components/PrimarySearchAppBar";
import "./index.css";
import { store } from "./lib/store/store";
import { LocalizationProviderWrapper } from "./LocalizationProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TaskPage from "./pages/TaskPage";
import TasksPage from "./pages/TasksPage";
import CategoriesPage from "./pages/CategoriesPage";
import PrioritiesPage from "./pages/PrioritiesPage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import NotFound from "./components/NotFound";
import ErrorPage from "./components/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrimarySearchAppBar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/tasks",
        loader: async () => {
          const resUser = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/users/me/`,
            {
              credentials: "include",
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!resUser.ok && resUser.status === 401) {
            return redirect("/auth/signin");
          }
          const user = await resUser.json();
          const resCategories = await fetch(
            `${import.meta.env.VITE_API_URL}/categories/`
          );
          const categories = await resCategories.json();
          const resPriorities = await fetch(
            `${import.meta.env.VITE_API_URL}/priorities/`
          );
          const priorities = await resPriorities.json();
          return { categories: categories, priorities: priorities, user: user };
        },
        element: <TasksPage />,
      },
      { path: "/tasks/:taskId", element: <TaskPage /> },
      { path: "/categories", element: <CategoriesPage /> },
      { path: "/priorities", element: <PrioritiesPage /> },
      { path: "/auth/signin", element: <SigninPage /> },
      { path: "/auth/signup", element: <SignupPage /> },
      { path: "*", element: <NotFound /> },
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
