import { invalidDataError } from ".";
import { Contract } from "../zod";
import { createApiRequest } from "./create-api-request";
import { FetchApiRecord } from "./fetch.types";

interface JsonQueryConfig {
  url: string;
  method: "HEAD" | "GET";
  headers?: FetchApiRecord;
  query?: FetchApiRecord;
}
// 이거 선언하는 이유는 좀 찾아봐야될것 같음
export async function createJsonQuery<
  Response,
  ContractData extends Response,
  MappedData
>(config: {
  request: JsonQueryConfig;
  response: {
    contract: Contract<Response, ContractData>;
    mapData: (data: ContractData) => MappedData;
  };
  abort?: AbortSignal;
}): Promise<MappedData>;

export async function createJsonQuery<
  Response,
  ContractData extends Response
>(config: {
  request: JsonQueryConfig;
  response: {
    contract: Contract<Response, ContractData>;
  };
  abort?: AbortSignal;
}): Promise<ContractData>;

export async function createJsonQuery<
  Response,
  ContractData extends Response,
  MappedData
>(config: {
  request: JsonQueryConfig;
  response: {
    mapData: (data: ContractData) => MappedData;
  };
  abort?: AbortSignal;
}): Promise<MappedData>;

export async function createJsonQuery(config: {
  request: JsonQueryConfig;
  abort?: AbortSignal;
}): Promise<unknown>;

// 조건에 따라 다양한 output이 나올수 있기 때문에 함수 다중 정의를 이용하였다.
export async function createJsonQuery<
  Response,
  ContractData extends Response,
  MappedData
>(config: {
  request: JsonQueryConfig;
  response?: {
    contract?: Contract<Response, ContractData>;
    mapData?: (data: ContractData) => MappedData;
  };
  abort?: AbortSignal;
}) {
  const data = await createApiRequest({
    request: config.request,
    abort: config.abort,
  });
  if (config?.response?.contract && !config.response.contract.isData(data)) {
    throw invalidDataError({
      validationErrors: config.response.contract.getErrorMessages(data),
      response: data,
    });
  }

  return config?.response?.mapData ? config.response.mapData(data) : data;
}
