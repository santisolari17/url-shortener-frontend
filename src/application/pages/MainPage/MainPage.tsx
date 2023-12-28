import { Grid } from '@mui/material';
import { ShortUrlForm } from '../../components/ShortUrlForm/ShortUrlForm';
import { useStyles } from './MainPage.styles';

export const MainPage = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={2} padding={5} justifyContent="center" alignItems="center">
        <Grid item lg={12} sx={classes.row}>
          <ShortUrlForm />
        </Grid>
      </Grid>
    </>
  );
};
