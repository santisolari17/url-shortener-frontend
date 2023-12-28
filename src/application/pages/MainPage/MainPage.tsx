import { Grid, Typography } from '@mui/material';
import { ShortUrlForm } from '../../components/ShortUrlForm/ShortUrlForm';
import { useStyles } from './MainPage.styles';
import { useSelector } from 'react-redux';
import { selectShortUrlFormState, shortUrlFormActions } from '../../store/shortUrlForm/shortUrlForm.slice';
import { ApplicationErrorPage } from '../../components/ApplicationErrorPage/ApplicationErrorPage';

export const MainPage = () => {
  const classes = useStyles();
  const shortUrlFormState = useSelector(selectShortUrlFormState);

  if (shortUrlFormState.error) {
    return <ApplicationErrorPage error={shortUrlFormState.error} resetStateAction={shortUrlFormActions.resetState} />;
  }

  return (
    <>
      <Grid container spacing={2} padding={5} justifyContent="center" alignItems="center">
        <Grid item md={12} sm={12}>
          <Typography variant="h4">Shorten an Url</Typography>
        </Grid>
        <Grid item lg={12} sx={classes.row}>
          <ShortUrlForm />
        </Grid>
      </Grid>
    </>
  );
};
