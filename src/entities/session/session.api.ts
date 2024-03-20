import { baseUrl } from "~shared/api/realworld";
import { createJsonQuery } from "~shared/lib/fetch";

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
  });
}
