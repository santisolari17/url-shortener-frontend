import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { IHttpClient } from '../interfaces/IHttpClient';
import { THttpClientResponse } from '../types/THttpClientResponse';
import {
  THttpGETRequestParams,
  THttpPOSTRequestParams,
  THttpDELETERequestParams,
  THttpPUTRequestParams,
  TBuildHttpHeaderParams,
  THttpHeaderDefinition,
} from '../types/THttpRequestParams';
import { HttpClientError } from '../interfaces/HttpClientError';

class AxiosHttpClient implements IHttpClient {
  private _axios: AxiosInstance;

  constructor() {
    this._axios = axios.create({
      timeout: 7000,
      maxRedirects: 10,
    });
  }

  getClassDriverForTesting() {
    return this._axios;
  }

  public async get<T>(params: THttpGETRequestParams): Promise<THttpClientResponse<T>> {
    const headers = this._buildHeaders({ headersDefinition: params.headers, bearerToken: params.bearerToken });
    let response: AxiosResponse;

    try {
      response = await this._axios.get(params.url, {
        params: params.queryStringParams,
        headers,
        signal: params.abortControllerSignal,
      });
    } catch (error) {
      throw this._httpClientError(error);
    }

    return this._mapResponse(response);
  }

  public async post<T>(params: THttpPOSTRequestParams): Promise<THttpClientResponse<T>> {
    const headers = this._buildHeaders({ headersDefinition: params.headers, bearerToken: params.bearerToken });
    let response: AxiosResponse;

    try {
      response = await this._axios.post(params.url, params.body, { headers, signal: params.abortControllerSignal });
    } catch (error) {
      throw this._httpClientError(error);
    }

    return this._mapResponse(response);
  }

  public async delete<T>(params: THttpDELETERequestParams): Promise<THttpClientResponse<T>> {
    const headers = this._buildHeaders({ headersDefinition: params.headers, bearerToken: params.bearerToken });
    let response: AxiosResponse;

    try {
      response = await this._axios.delete(params.url, {
        params: params.queryStringParams,
        data: params.body,
        headers,
        signal: params.abortControllerSignal,
      });
    } catch (error) {
      throw this._httpClientError(error);
    }

    return this._mapResponse(response);
  }

  public async put<T>(params: THttpPUTRequestParams): Promise<THttpClientResponse<T>> {
    const headers = this._buildHeaders({ headersDefinition: params.headers, bearerToken: params.bearerToken });
    let response: AxiosResponse;

    try {
      response = await this._axios.put(params.url, params.body, { headers, signal: params.abortControllerSignal });
    } catch (error) {
      throw this._httpClientError(error);
    }

    return this._mapResponse(response);
  }

  private _buildHeaders(params: TBuildHttpHeaderParams): { [key: string]: string } {
    const headersDefinition = params.headersDefinition ? params.headersDefinition : [];

    const headers = headersDefinition.reduce<{ [key: string]: string }>(
      (acc: any, cur: THttpHeaderDefinition) => ({ ...acc, [cur.header]: cur.value }),
      {},
    );

    if (params.bearerToken) {
      // eslint-disable-next-line dot-notation
      headers['Authorization'] = `Bearer ${params.bearerToken}`;
    }

    return headers;
  }

  private _httpClientError(error: any): HttpClientError {
    const err: AxiosError = error;

    return new HttpClientError({
      context: AxiosHttpClient.name,
      method: err.request.method || err.config?.method,
      host: err.request.host || err.config?.url,
      path: err.request.path || err.config?.url,
      message: err.message,
      statusCode: err.response?.status || 0,
      statusText: err.response?.statusText || err.code,
      aditionalData: err.response?.data,
    });
  }

  private _mapResponse<T>(response: AxiosResponse): THttpClientResponse<T> {
    return {
      data: response.data,
      statusCode: response.status,
    };
  }
}

export const http = new AxiosHttpClient();
