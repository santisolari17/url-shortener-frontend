import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';
import { useStyles } from './MainNavigation.styles';
import { useSelector } from 'react-redux';
import { selectUiState } from '../../store/ui/ui.slice';

export const MainNavigation = () => {
  const classes = useStyles();
  const uiState = useSelector(selectUiState);
  const authToken = useRouteLoaderData('root') as string | null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <LinkIcon sx={classes.linkIcon} />
          <Typography variant="h6" noWrap component="div" sx={classes.appName}>
            UrlShortener
          </Typography>
          <Box sx={classes.linkBox}>
            {authToken && (
              <NavLink to="/" hidden={uiState.disableAppNavigation}>
                <Button sx={classes.button}>Shorten Url</Button>
              </NavLink>
            )}
            {authToken && (
              <NavLink to="/list" end hidden={uiState.disableAppNavigation}>
                <Button sx={classes.button}>Url List</Button>
              </NavLink>
            )}
          </Box>
          {!authToken && (
            <NavLink to="/login">
              <Button sx={classes.button}>login</Button>
            </NavLink>
          )}
          {authToken && (
            <Form action="/logout" method="post">
              <Button sx={classes.button} type="submit">
                logout
              </Button>
            </Form>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
