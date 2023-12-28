import SearchIcon from '@mui/icons-material/Search';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { selectFindShortUrlState } from '../../../store/findShortUrl/findShortUrl.slice';
import { findShortUrlThunk } from '../../../store/findShortUrl/thunks/findShortUrl.thunk';
import { useNavigate } from 'react-router-dom';

export const ViewDetailBtn = ({ shortUrlId }: { shortUrlId: string }) => {
  const findShortUrlFormState = useSelector(selectFindShortUrlState);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const findUrl = () => {
    dispatch(findShortUrlThunk({ urlId: shortUrlId }));
    navigate('/find-detail');
  };

  return (
    <>
      <IconButton key={shortUrlId} onClick={findUrl}>
        {findShortUrlFormState.status === 'loading' && <HourglassBottomIcon />}
        {findShortUrlFormState.status !== 'loading' && <SearchIcon />}
      </IconButton>
    </>
  );
};
