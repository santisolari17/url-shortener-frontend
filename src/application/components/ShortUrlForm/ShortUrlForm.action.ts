import { json } from 'react-router-dom';
import { urlShortenerService } from '../../../domain/services/UrlShortener.service';
import { HttpClientError } from '../../../infrastructure/services/Http/interfaces/HttpClientError';

export const shortUrlFormAction = async ({ request }: { request: Request }) => {
  const data = await request.formData();

  const longUrl = data.get('longUrl');
  let shortUrl;

  try {
    shortUrl = await urlShortenerService.shortenUrl(longUrl as string);
  } catch (error) {
    if (error instanceof HttpClientError) {
      throw json(error, { status: error.statusCode, statusText: error.statusText });
    }

    console.error('ShortUrlFormActionError', error);
    throw json(
      { message: `Could not shorten url. Unknown Reason. Check console for "ShortUrlFormActionError"` },
      { status: 500 },
    );
  }

  return { response: shortUrl };
};
