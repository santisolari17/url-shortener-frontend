import { useDispatch } from 'react-redux';
import { appConfig } from '../../../../infrastructure/config/AppConfig';
import { AppDispatch } from '../../../store';
import { shortUrlActions } from '../../../store/shortUrl/shortUrl.slice';

export const ShortUrlLink = ({ urlId }: { urlId: string }) => {
  const url = appConfig.backendUrl;
  const dispatch = useDispatch<AppDispatch>();
  const redirectReloadTimeMs = 2000;

  const handleReload = () => {
    setTimeout(() => {
      dispatch(shortUrlActions.toggleReload());
    }, redirectReloadTimeMs);
  };

  const hanldeAuxClicReload = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (event.button === 1) {
      console.log('Link opened in a new tab!');
      setTimeout(() => {
        dispatch(shortUrlActions.toggleReload());
      }, redirectReloadTimeMs);
    }
  };

  return (
    <a href={`${url}/${urlId}`} onAuxClick={event => hanldeAuxClicReload(event)} target="_blank" onClick={handleReload}>
      {`${url}/${urlId}`}
    </a>
  );
};
