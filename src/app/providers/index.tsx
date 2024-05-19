import { QueryClientProvider } from "./QueryClientProvider";
import { BrowserRouter } from "./RouterProvider";
import '~shared/main.css';
function Providers() {
  return (
    <QueryClientProvider>
      <BrowserRouter />
    </QueryClientProvider>
  );
}

export const Provider = () => <Providers />;
