import { SxProps, Theme } from '@mui/material';

const appName: SxProps<Theme> = {
  mr: 2,
  display: { xs: 'none', md: 'flex' },
  fontFamily: 'monospace',
  fontWeight: 700,
  color: 'inherit',
  textDecoration: 'none',
};

const linkIcon: SxProps<Theme> = {
  display: { xs: 'none', md: 'flex' },
  mr: 1,
};

const linkBox: SxProps<Theme> = {
  flexGrow: 1,
  display: { xs: 'none', md: 'flex' },
};

const button: SxProps<Theme> = {
  color: 'white',
};

export const useStyles = () => ({
  appName,
  linkIcon,
  linkBox,
  button,
});
