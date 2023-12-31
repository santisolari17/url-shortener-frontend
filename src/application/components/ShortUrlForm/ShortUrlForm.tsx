import { Box, Button, Grid, IconButton, InputAdornment, Paper, Snackbar, TextField, Typography } from '@mui/material';
import { useStyles } from './ShortUrlForm.styles';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { selectShortUrlFormState, shortUrlFormActions } from '../../store/shortUrlForm/shortUrlForm.slice';
import ClearIcon from '@mui/icons-material/Clear';
import { appConfig } from '../../../infrastructure/config/AppConfig';
import { makeShortUrlThunk } from '../../store/shortUrlForm/thunks/makeShortUrl.thunk';

export const ShortUrlForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const shortUrlFormState = useSelector(selectShortUrlFormState);
  const shortUrlTextFieldRef = useRef<HTMLInputElement>(null);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    if (shortUrlFormState.shortUrl) {
      dispatch(shortUrlFormActions.setShortUrl(shortUrlFormState.shortUrl));
      dispatch(shortUrlFormActions.setHideForm(true));
      dispatch(shortUrlFormActions.setHideResult(false));
      dispatch(shortUrlFormActions.setLongUrlTextFieldValue(''));
      dispatch(
        shortUrlFormActions.setShortenedUrlTextFieldValue(
          `${appConfig.backendUrl}/${shortUrlFormState.shortUrl.urlId}`,
        ),
      );
    }
  }, [shortUrlFormState, dispatch]);

  const isSubmitting = shortUrlFormState.status === 'loading';

  const handleCopyToClipboard = () => {
    if (shortUrlTextFieldRef.current) {
      const valueToCopy = shortUrlTextFieldRef.current.value;

      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => {
          console.log('Text copied to clipboard:', valueToCopy);
          setSnackOpen(true);
        })
        .catch(err => {
          console.error('Error copying to clipboard:', err);
        });
    }
  };

  const resetFormToInitialStateHandler = () => {
    dispatch(shortUrlFormActions.resetState());
  };

  const makeShortUrl = () => {
    dispatch(makeShortUrlThunk({ longUrl: shortUrlFormState.longUrlTextFieldValue }));
  };

  return (
    <>
      <Paper sx={classes.paper}>
        {!shortUrlFormState.shortUrl && (
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item md={12} sm={12}>
              <Typography variant="subtitle1">Paste an Url to be shortened</Typography>
            </Grid>
            <Grid item md={9} sm={9}>
              <TextField
                id="longUrl"
                name="longUrl"
                label="Enter long Url here"
                variant="outlined"
                value={shortUrlFormState.longUrlTextFieldValue}
                onChange={event => dispatch(shortUrlFormActions.setLongUrlTextFieldValue(event.target.value))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => dispatch(shortUrlFormActions.setLongUrlTextFieldValue(''))}>
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Grid>
            <Grid item md={3} sm={3}>
              <Button
                type="submit"
                variant="contained"
                onClick={makeShortUrl}
                disabled={isSubmitting || !shortUrlFormState.longUrlTextFieldValue}
              >
                {isSubmitting ? 'Shortening...' : 'Shorten Url'}
              </Button>
            </Grid>
          </Grid>
        )}
        {shortUrlFormState.shortUrl && (
          <Box>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item md={12} sm={12}>
                <Typography variant="h5">You can now use your short Url!</Typography>
              </Grid>
              <Grid item md={9} sm={9}>
                <TextField
                  inputRef={shortUrlTextFieldRef}
                  id="shortUrl"
                  variant="outlined"
                  InputProps={{ readOnly: true }}
                  value={shortUrlFormState.shortenedUrlTextFieldValue}
                  fullWidth
                />
              </Grid>
              <Grid item md={3} sm={3}>
                <Button variant="contained" size="large" onClick={handleCopyToClipboard}>
                  Copy Url
                </Button>
              </Grid>
              <Grid item md={12} sm={12}>
                <Typography variant="caption" noWrap={false} sx={{ wordBreak: 'break-all' }}>
                  Long Url:{' '}
                  <a href={shortUrlFormState.shortUrl.longUrl} target="_blank">
                    {shortUrlFormState.shortUrl.longUrl}
                  </a>
                </Typography>
              </Grid>
              <Grid item md={12} sm={12}>
                <Button variant="contained" size="small" onClick={resetFormToInitialStateHandler}>
                  Shorten another Url
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setSnackOpen(false)}
        message="Short Url copied to clipboard!"
      />
    </>
  );
};
