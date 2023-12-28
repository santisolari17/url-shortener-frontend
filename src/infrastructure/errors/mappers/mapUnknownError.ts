import { ApplicationErrorData } from '../ApplicationErrorData';

export const mapUnknownError = (error: unknown): ApplicationErrorData => {
  console.log(error);
  const appError = new ApplicationErrorData({
    type: 'Unknown Error',
    messages: ['Unknown Error'],
    statusCode: 0,
    statusText: '',
  });

  return appError;
};
