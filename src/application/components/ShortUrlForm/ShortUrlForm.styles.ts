import { SxProps, Theme } from '@mui/material';

const paper: SxProps<Theme> = {
  width: '40rem',
  padding: 3,
  borderRadius: 4,
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
};

export const useStyles = () => ({ paper });
