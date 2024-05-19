import { queryOptions as tsqQueryOptions } from "@tanstack/react-query";
import { queryClient } from "~shared/lib/react-query/queryClient";
import { User } from "./session.types";
import { hasToken } from "./session.model";
import { currentUserQuery } from "./session.api";

// api end point (query id 이기도 함)
const keys = {
  root: () => ["session"],
  currentUser: () => [...keys.root(), "currentUser"] as const,
  createUser: () => [...keys.root(), "createUser"] as const,
  loginUser: () => [...keys.root(), "loginUser"] as const,
  updateUser: () => [...keys.root(), "updateUser"] as const,
  deleteUser: () => [...keys.root(), "deleteUser"] as const,
};

export const userService = {
  queryKey: () => keys.currentUser(),
  getCache: () => queryClient.getQueryData<User>(userService.queryKey()),
  setCache: (user: User | null) =>
    queryClient.setQueryData(userService.queryKey(), user),
  removeCach: () =>
    queryClient.removeQueries({ queryKey: userService.queryKey() }),

  queryOptions: () => {
    const userKey = userService.queryKey();
    return tsqQueryOptions({
      queryKey: userKey,
      // token이 저장되어있는지 확인하여 없으면 fetch하여 가져온다.
      queryFn: async ({ signal }) =>
        hasToken() ? currentUserQuery(signal) : null,
    });
  },
};
