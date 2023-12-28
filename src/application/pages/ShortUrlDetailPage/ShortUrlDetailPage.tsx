import { Grid } from '@mui/material';
import { useStyles } from './ShortUrlDetailPage.styles';
import { FindLongUrlForm } from '../../components/FindLongUrlForm/FindLongUrlForm';
import { ApplicationErrorPage } from '../../components/ApplicationErrorPage/ApplicationErrorPage';
import { useSelector } from 'react-redux';
import { findShortUrlActions, selectFindShortUrlState } from '../../store/findShortUrl/findShortUrl.slice';

export const ShortUrlDetailPage = () => {
  const classes = useStyles();
  const findShortUrlFormState = useSelector(selectFindShortUrlState);

  if (findShortUrlFormState.error) {
    return (
      <ApplicationErrorPage error={findShortUrlFormState.error} resetStateAction={findShortUrlActions.resetState} />
    );
  }

  return (
    <>
      <Grid container spacing={2} padding={5} justifyContent="center" alignItems="center">
        <Grid item lg={12} sx={classes.row}>
          <FindLongUrlForm />
        </Grid>
      </Grid>
    </>
  );
};
