import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useStyles } from './FindLongUrlForm.styles';
import { useDispatch, useSelector } from 'react-redux';
import { findShortUrlActions, selectFindShortUrlState } from '../../store/findShortUrl/findShortUrl.slice';
import { AppDispatch } from '../../store';
import ClearIcon from '@mui/icons-material/Clear';
import { findShortUrlThunk } from '../../store/findShortUrl/thunks/findShortUrl.thunk';
import { ApplicationErrorPage } from '../ApplicationErrorPage/ApplicationErrorPage';
import { appConfig } from '../../../infrastructure/config/AppConfig';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const FindLongUrlForm = () => {
  const classes = useStyles();
  const findShortUrlFormState = useSelector(selectFindShortUrlState);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(findShortUrlActions.resetState());
  }, [dispatch]);

  const findShortUrlDetail = () => {
    dispatch(findShortUrlThunk({ urlId: findShortUrlFormState.shortUrlExtractedId }));
  };

  const isSubmitting = findShortUrlFormState.status === 'loading';

  if (findShortUrlFormState.error) {
    return (
      <ApplicationErrorPage error={findShortUrlFormState.error} resetStateAction={findShortUrlActions.resetState} />
    );
  }

  if (findShortUrlFormState.shortUrl) {
    return (
      <Paper sx={classes.paper}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item md={12} sm={12}>
            <Card sx={{ maxWidth: '100%' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Found Url!
                </Typography>
                <Typography variant="body2" component="div">
                  ShortUrl:{' '}
                  <a
                    target="_blank"
                    href={`${appConfig.backendUrl}/${findShortUrlFormState.shortUrl.id}`}
                  >{`${appConfig.backendUrl}/${findShortUrlFormState.shortUrl.id}`}</a>
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  noWrap={false}
                  sx={{ wordBreak: 'break-all', marginTop: 2 }}
                >
                  long Url:{' '}
                  <a target="_blank" href={findShortUrlFormState.shortUrl.longUrl}>
                    {findShortUrlFormState.shortUrl.longUrl}
                  </a>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                  last Visited:{' '}
                  {findShortUrlFormState.shortUrl.lastVisited
                    ? findShortUrlFormState.shortUrl.lastVisited.toString()
                    : 'Not yet visited'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                  Created: {findShortUrlFormState.shortUrl.createdAt.toString()}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                  Total clicks: {findShortUrlFormState.shortUrl.clicks}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => dispatch(findShortUrlActions.resetState())}
                  size="small"
                  sx={{ marginLeft: 'auto' }}
                >
                  Find Another
                </Button>
                <Button variant="contained" onClick={() => navigate('/list')} size="small" sx={{ marginLeft: 'auto' }}>
                  Go to Url list
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  return (
    <Paper sx={classes.paper}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item md={12} sm={12}>
          <Typography variant="subtitle1">Paste a ShortUrl to find the detail</Typography>
        </Grid>
        <Grid item md={9} sm={9}>
          <TextField
            id="shortUrl"
            name="shortUrl"
            label="Enter short Url here"
            variant="outlined"
            value={findShortUrlFormState.shortUrlTextFieldValue}
            onChange={event => dispatch(findShortUrlActions.setShortUrlTextFieldValue(event.target.value))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => dispatch(findShortUrlActions.setShortUrlTextFieldValue(''))}>
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
            onClick={findShortUrlDetail}
            disabled={isSubmitting || !findShortUrlFormState.shortUrlTextFieldValue}
          >
            {isSubmitting ? 'Searching...' : 'Find Url Info'}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
