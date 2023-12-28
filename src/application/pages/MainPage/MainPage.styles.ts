import { SxProps, Theme } from '@mui/material';

const row: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginY: '2rem',
  marginX: '15rem',
};

export const useStyles = () => ({
  row,
});
