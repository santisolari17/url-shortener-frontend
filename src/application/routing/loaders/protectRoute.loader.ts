import { LoaderFunction, redirect } from 'react-router-dom';
import { authService } from '../../../domain/services/Authentication.service';

export const protectRouteLoader: LoaderFunction = async () => {
  const token = authService.getAuthToken();

  if (!token) {
    return redirect('/login');
  }

  return null;
};
