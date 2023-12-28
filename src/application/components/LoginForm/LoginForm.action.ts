import { ActionFunction, redirect } from 'react-router-dom';
import { authService } from '../../../domain/services/Authentication.service';

export const loginAction: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const user = data.get('email') as string;
  const password = data.get('password') as string;

  await authService.login(user, password);

  return redirect('/');
};
