import { createBrowserRouter } from 'react-router-dom';
import { shortUrlFormAction } from './application/components/ShortUrlForm/ShortUrlForm.action';
import { MainPage } from './application/pages/MainPage/MainPage';
import { RootLayout } from './application/pages/RootLayout/RootLayout';
import { ShortUrlListPage } from './application/pages/ShortUrlListPage/ShortUrlListPage';
import { ErrorPage } from './application/pages/ErrorPage/ErrorPage';
import { LoginPage } from './application/pages/LoginPage/LoginPage';
import { loginAction } from './application/components/LoginForm/LoginForm.action';
import { authTokenLoader } from './application/routing/loaders/authToken.loader';
import { logoutAction } from './application/routing/actions/logout.action';
import { protectRouteLoader } from './application/routing/loaders/protectRoute.loader';

export const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    element: <RootLayout />,
    action: shortUrlFormAction,
    errorElement: <ErrorPage />,
    loader: authTokenLoader,
    children: [
      { index: true, element: <MainPage />, loader: protectRouteLoader },
      { path: 'logout', action: logoutAction },
      { path: 'list', element: <ShortUrlListPage />, loader: protectRouteLoader },
      { path: 'login', element: <LoginPage />, action: loginAction },
    ],
  },
]);
