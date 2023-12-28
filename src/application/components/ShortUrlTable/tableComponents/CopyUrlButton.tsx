import { Alert, IconButton, Popover } from '@mui/material';
import { appConfig } from '../../../../infrastructure/config/AppConfig';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';

export const CopyUrlButton = ({ shortUrlId }: { shortUrlId: string }) => {
  const url = appConfig.backendUrl;
  const shortUrl = `${url}/${shortUrlId}`;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const copyToClipboard = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setTimeout(() => {
      handleClose();
    }, 1000);

    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        console.log('Copied to clipboard!');
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <IconButton onClick={event => copyToClipboard(event)}>
        <ContentCopyIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorReference="anchorEl"
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Alert severity="info">Copied to clipboard</Alert>
      </Popover>
    </>
  );
};
