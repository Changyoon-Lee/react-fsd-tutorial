import { baseUrl } from "~shared/api/realworld";
import { createJsonQuery } from "~shared/lib/fetch";
import { authorizationHeader } from "./session.model";
import { zodContract } from "~shared/lib/zod";
import { UserDtoSchema } from "./session.contracts";
export async function currentUserQuery(signal?: AbortSignal) {
  return createJsonQuery({
    request: {
      url: baseUrl("/user"),
      method: "GET",
      headers: { ...authorizationHeader() },
    },
    response: {
      contract: zodContract(UserDtoSchema),
    },
    abort: signal,
  });
}
