/** HTTP Headers params types */
export type THttpHeaderDefinition = {
  header: string;
  value: string;
};

export type TBuildHttpHeaderParams = {
  headersDefinition?: THttpHeaderDefinition[];
  bearerToken?: string;
};

/** HTTP Request params types */
export type THttpGETRequestParams = {
  url: string;
  headers?: THttpHeaderDefinition[];
  bearerToken?: string;
  queryStringParams?: any;
  abortControllerSignal?: any;
};

export type THttpPOSTRequestParams = {
  url: string;
  headers?: THttpHeaderDefinition[];
  bearerToken?: string;
  body?: any;
  abortControllerSignal?: any;
};

export type THttpDELETERequestParams = {
  url: string;
  headers?: THttpHeaderDefinition[];
  bearerToken?: string;
  body?: any;
  queryStringParams?: any;
  abortControllerSignal?: any;
};

export type THttpPUTRequestParams = {
  url: string;
  headers?: THttpHeaderDefinition[];
  bearerToken?: string;
  queryStringParams?: any;
  body?: any;
  abortControllerSignal?: any;
};
