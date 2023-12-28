import { Box, Grid, Alert, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { ApplicationErrorData } from '../../../infrastructure/errors/ApplicationErrorData';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { uiActions } from '../../store/ui/ui.slice';

type ApplicationErrorPageProps = {
  error: ApplicationErrorData;
  resetStateAction: ActionCreatorWithoutPayload;
};

export const ApplicationErrorPage = (props: ApplicationErrorPageProps) => {
  const navigate = useNavigate();
  const error = { ...props.error };
  const dispatch = useDispatch();

  dispatch(uiActions.setDisableAppNavigation(true));

  const returnToAppHanlder = () => {
    dispatch(props.resetStateAction());
    dispatch(uiActions.setDisableAppNavigation(false));
    navigate('/');
  };

  return (
    <Box>
      <Grid container padding={2} spacing={2}>
        <Grid item sm={12}>
          <Alert severity="error">The application encountered an error!</Alert>
        </Grid>
        <Grid item sm={12}>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {`${error.type} - ${error.statusCode} - ${error.statusText}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <ul>
                  {error.messages.map(msg => (
                    <li>{msg}</li>
                  ))}
                </ul>
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={returnToAppHanlder}>
                Return to the Application
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
