import { ActionFunction, redirect } from 'react-router-dom';
import { authService } from '../../../domain/services/Authentication.service';

export const logoutAction: ActionFunction = async () => {
  authService.removeSession();
  return redirect('/login');
};
