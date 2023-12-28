import { THttpMethods } from '../types/THttpMethods';

export interface IHttpClientError {
  context: string;
  message: string;
  statusCode: number;
  statusText?: string;
  method: THttpMethods;
  host: string;
  path: string;
  aditionalData?: any;
}
