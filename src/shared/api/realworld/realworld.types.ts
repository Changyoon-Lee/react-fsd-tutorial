// api response error일경우 타입으로 추정됨
export type UnexpectedErrorDto = {
  errors: {
    body: string[];
  };
};
