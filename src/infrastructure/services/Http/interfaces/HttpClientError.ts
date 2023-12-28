import { IHttpClientError } from '../interfaces/IHttpClientError';
import { THttpMethods } from '../types/THttpMethods';

export class HttpClientError extends Error implements IHttpClientError {
  public readonly context: string;
  public readonly statusCode: number;
  public readonly statusText?: string;
  public readonly method: THttpMethods;
  public readonly host: string;
  public readonly path: string;
  public readonly aditionalData?: any;

  constructor(params: IHttpClientError) {
    super(params.message);
    this.context = params.context;
    this.statusCode = params.statusCode;
    this.statusText = params.statusText || undefined;
    this.method = params.method;
    this.host = params.host;
    this.path = params.path;
    this.aditionalData = params.aditionalData;
  }
}
