import { LoaderFunction } from 'react-router-dom';
import { authService } from '../../../domain/services/Authentication.service';

export const authTokenLoader: LoaderFunction = async () => {
  return authService.getAuthToken();
};
