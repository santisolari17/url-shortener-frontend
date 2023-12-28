import { useEffect, useState } from 'react';
import CachedIcon from '@mui/icons-material/Cached';
import { ShortUrlTable } from '../../components/ShortUrlTable/ShortUrlTable';
import { Button, Grid, Typography } from '@mui/material';
import { DeleteUrlDialog } from './ShortUrlListPage.delete-dialog';
import { urlShortenerService } from '../../../domain/services/UrlShortener.service';
import { useDispatch, useSelector } from 'react-redux';
import { selectShortUrlState, shortUrlActions } from '../../store/shortUrl/shortUrl.slice';
import { AppDispatch } from '../../store';
import { fetchShortUrlsThunk } from '../../store/shortUrl/thunks/fetchShortUrls.thunk';
import { ApplicationErrorPage } from '../../components/ApplicationErrorPage/ApplicationErrorPage';

export const ShortUrlListPage = () => {
  const [deleteDialogOpenState, setDeleteDialogOpenState] = useState(false);
  const shortUrlState = useSelector(selectShortUrlState);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchShortUrlsThunk());
  }, [dispatch, shortUrlState.reloadToggle]);

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpenState(true);
  };

  const handleClose = () => {
    setDeleteDialogOpenState(false);
  };

  const deleteIdsHandler = async () => {
    await urlShortenerService.deleteShortUrls(shortUrlState.selectedUrlIds);
    setDeleteDialogOpenState(false);
    dispatch(shortUrlActions.toggleReload());
  };

  const onSelectedElements = (elements: string[]) => {
    dispatch(shortUrlActions.setSelectedUrlIds(elements));
  };

  if (shortUrlState.error) {
    return <ApplicationErrorPage error={shortUrlState.error} resetStateAction={shortUrlActions.resetState} />;
  }

  return (
    <>
      <Grid container padding={4} spacing={2} justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
        <Grid item md={12} sm={12}>
          <Typography variant="h4">Shortened Url List</Typography>
        </Grid>
        <Grid item md={12} sm={12}>
          <ShortUrlTable rows={shortUrlState.shortUrls} rowsIdProperty="urlId" onSelectedElement={onSelectedElements} />
        </Grid>
        <Grid item md={12} sm={12}>
          <Button
            variant="contained"
            disabled={shortUrlState.selectedUrlIds.length === 0}
            onClick={handleOpenDeleteDialog}
          >
            Delete Selected Urls
          </Button>
          <Button
            startIcon={<CachedIcon />}
            variant="outlined"
            onClick={() => dispatch(shortUrlActions.toggleReload())}
            sx={{ marginLeft: 2 }}
          >
            Refresh table
          </Button>
        </Grid>
      </Grid>
      <DeleteUrlDialog
        openState={deleteDialogOpenState}
        onDialogClose={handleClose}
        onCancelBtnClick={handleClose}
        onConfirmBtnClick={deleteIdsHandler}
        urlIdList={shortUrlState.selectedUrlIds}
      />
    </>
  );
};
