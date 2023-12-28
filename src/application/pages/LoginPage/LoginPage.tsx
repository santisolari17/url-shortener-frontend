import { Grid } from '@mui/material';
import { useStyles } from './LoginPage.styles';
import { LoginForm } from '../../components/LoginForm/LoginForm';

export const LoginPage = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} padding={5} justifyContent="center" alignItems="center">
      <Grid item lg={12} sx={classes.row}>
        <LoginForm />
      </Grid>
    </Grid>
  );
};
