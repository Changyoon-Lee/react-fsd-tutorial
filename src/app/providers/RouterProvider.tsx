import {
  RouterProvider,
  createBrowserRouter,
  redirect,
  useRouteError,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>hello world</div>,
  },
]);

export function BrowserRouter() {
  console.log("BrowserRouter");
  return <RouterProvider router={router} />;
}
