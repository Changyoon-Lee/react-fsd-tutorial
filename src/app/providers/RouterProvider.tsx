import {
  RouterProvider,
  createBrowserRouter,
  redirect,
  useRouteError,
} from "react-router-dom";
import { homePageRoute } from "~pages/home";
import { GenericLayout } from "~pages/layouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GenericLayout />,
    children: [
      homePageRoute
    ]
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
