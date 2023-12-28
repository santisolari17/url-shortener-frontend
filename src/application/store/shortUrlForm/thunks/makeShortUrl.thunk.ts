import { ShortUrl } from '../../../../domain/entities/ShortUrl.entity';
import { urlShortenerService } from '../../../../domain/services/UrlShortener.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpClientError } from '../../../../infrastructure/services/Http/interfaces/HttpClientError';
import { ApplicationErrorData } from '../../../../infrastructure/errors/ApplicationErrorData';
import { mapHttpClientError } from '../../../../infrastructure/errors/mappers/mapHttpClientError';
import { mapUnknownError } from '../../../../infrastructure/errors/mappers/mapUnknownError';

type RejectValue = {
  rejectValue: ApplicationErrorData;
};

type ThunkParams = {
  longUrl: string;
};

export const makeShortUrlThunk = createAsyncThunk<ShortUrl, ThunkParams, RejectValue>(
  'data/makeShortUrl',
  async (params, { rejectWithValue }) => {
    try {
      return await urlShortenerService.shortenUrl(params.longUrl);
    } catch (error) {
      if (error instanceof HttpClientError) {
        return rejectWithValue(mapHttpClientError(error));
      }

      return rejectWithValue(mapUnknownError(error));
    }
  },
);
