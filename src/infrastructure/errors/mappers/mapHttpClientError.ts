import { HttpClientError } from '../../services/Http/interfaces/HttpClientError';
import { ApplicationErrorData } from '../ApplicationErrorData';

export const mapHttpClientError = (error: HttpClientError): ApplicationErrorData => {
  const defaultMessage = 'The server was not able to respond to the client request';
  let messages = [defaultMessage];

  if (error.aditionalData) {
    messages = Array.isArray(error.aditionalData.message)
      ? [defaultMessage, ...error.aditionalData.message]
      : [defaultMessage, error.aditionalData.message];
  }

  const appError = new ApplicationErrorData({
    type: 'HttpClientError',
    messages,
    statusCode: error.statusCode,
    statusText: error.statusText || '',
  });

  return appError;
};
