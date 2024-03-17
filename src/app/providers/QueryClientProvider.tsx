import { QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { queryClient } from "~shared/lib/react-query/queryClient";

type QueryClientProviderProps = {
  children: ReactNode;
};

export function QueryClientProvider(props: QueryClientProviderProps) {
  const { children } = props;

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </TanstackQueryClientProvider>
  );
}
