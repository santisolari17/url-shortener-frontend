import { Box, Grid, Typography } from '@mui/material';
import { MainNavigation } from '../../components/MainNavigation/MainNavigation';
import { Outlet, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import { appConfig } from '../../../infrastructure/config/AppConfig';
import { useEffect } from 'react';
import { authService } from '../../../domain/services/Authentication.service';

export const RootLayout = () => {
  const navigation = useNavigation();
  const token = useLoaderData() as string | null;
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (authService.isSessionExpired()) {
      submit(null, { action: '/logout', method: 'post' });
    }

    const sessionRemainingTime = authService.getRemainingSessionTime();

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, sessionRemainingTime);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <Grid container flexDirection="column" spacing={5}>
        <Grid item sm={12}>
          <Box sx={{ width: '100%' }}>
            {navigation.state === 'loading' && <p>Loading...</p>}
            <Outlet />
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          sx={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            textAlign: 'left',
          }}
        >
          <Typography>{appConfig.configVersion}</Typography>
        </Grid>
      </Grid>
    </>
  );
};
