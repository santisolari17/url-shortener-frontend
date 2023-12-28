import { THttpClientResponse } from '../types/THttpClientResponse';
import {
  THttpDELETERequestParams,
  THttpGETRequestParams,
  THttpPOSTRequestParams,
  THttpPUTRequestParams,
} from '../types/THttpRequestParams';

export interface IHttpClient {
  get<T>(params: THttpGETRequestParams): Promise<THttpClientResponse<T>>;
  post<T>(params: THttpPOSTRequestParams): Promise<THttpClientResponse<T>>;
  delete<T>(params: THttpDELETERequestParams): Promise<THttpClientResponse<T>>;
  put<T>(params: THttpPUTRequestParams): Promise<THttpClientResponse<T>>;
}
