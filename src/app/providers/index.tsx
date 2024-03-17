import { BrowserRouter } from "./RouterProvider";

function Providers() {
  console.log("Providers");
  return <BrowserRouter />;
}

export const Provider = () => <Providers />;
