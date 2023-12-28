import { Button, Grid, Paper, TextField } from '@mui/material';
import { useStyles } from './LoginForm.styles';
import { Form, useNavigation } from 'react-router-dom';

export const LoginForm = () => {
  const classes = useStyles();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <Paper sx={classes.paper}>
      <Form method="post">
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <TextField id="email" name="email" label="Email" variant="standard" required fullWidth />
          </Grid>
          <Grid item sm={12}>
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="standard"
              required
              fullWidth
            />
          </Grid>
          <Grid item sm={12} sx={{ textAlign: 'center' }}>
            <Button type="submit" disabled={isSubmitting} variant="contained">
              {isSubmitting ? 'Login in...' : 'Login'}
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Paper>
  );
};
