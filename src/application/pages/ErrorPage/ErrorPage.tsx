import { Alert, Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';
import { MainNavigation } from '../../components/MainNavigation/MainNavigation';
import { HttpClientError } from '../../../infrastructure/services/Http/interfaces/HttpClientError';

export const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  let errorMessages = ['Something unexpected happened.'];

  let titleElement = (
    <Typography gutterBottom variant="h5" component="div">
      Unknown Error
    </Typography>
  );

  let bodyElement = (
    <Typography variant="body2" color="text.secondary">
      Unknown error
    </Typography>
  );

  if (isRouteErrorResponse(error)) {
    if (error.data.aditionalData) {
      errorMessages = Array.isArray(error.data.aditionalData.message)
        ? error.data.aditionalData.message
        : [error.data.aditionalData.message];
    }

    titleElement = (
      <Typography gutterBottom variant="h5" component="div">
        {`${error.status} - ${error.statusText}`}
      </Typography>
    );

    bodyElement = (
      <Typography variant="body2" color="text.secondary">
        <ul>
          {errorMessages.map(msg => (
            <li>{msg}</li>
          ))}
        </ul>
      </Typography>
    );
  }

  if (error instanceof HttpClientError) {
    if (error.aditionalData) {
      errorMessages = Array.isArray(error.aditionalData.message)
        ? error.aditionalData.message
        : [error.aditionalData.message];
    }

    titleElement = (
      <Typography gutterBottom variant="h5" component="div">
        {`${error.statusCode} - ${error.statusText}`}
      </Typography>
    );

    bodyElement = (
      <Typography variant="body2" color="text.secondary">
        <ul>
          {errorMessages.map(msg => (
            <li>{msg}</li>
          ))}
        </ul>
      </Typography>
    );
  }

  return (
    <Box>
      <MainNavigation />
      <Grid container padding={2} spacing={2}>
        <Grid item sm={12}>
          <Alert severity="error">The application encountered an error!</Alert>
        </Grid>
        <Grid item sm={12}>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              {titleElement}
              {bodyElement}
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/')}>
                Return to the Application
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
