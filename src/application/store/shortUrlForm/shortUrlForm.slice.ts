import { createSlice } from '@reduxjs/toolkit';
import { ShortUrl } from '../../../domain/entities/ShortUrl.entity';
import { makeShortUrlThunk } from './thunks/makeShortUrl.thunk';
import { ApplicationErrorData } from '../../../infrastructure/errors/ApplicationErrorData';

const sliceName = 'shortUrlForm';

type TInitialState = {
  shortUrl?: ShortUrl;
  hideForm: boolean;
  hideResult: boolean;
  longUrlTextFieldValue: string;
  shortenedUrlTextFieldValue: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: ApplicationErrorData;
  reloadToggle: boolean;
};

interface RootState {
  [sliceName]: TInitialState;
}

const initialState: TInitialState = {
  shortUrl: undefined,
  hideForm: false,
  hideResult: true,
  longUrlTextFieldValue: '',
  shortenedUrlTextFieldValue: '',
  status: 'idle',
  error: undefined,
  reloadToggle: false,
};

export const shortUrlFormSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
    setShortUrl: (state, action) => {
      state.shortUrl = action.payload;
    },
    setHideForm: (state, action) => {
      state.hideForm = action.payload;
    },
    setHideResult: (state, action) => {
      state.hideResult = action.payload;
    },
    setLongUrlTextFieldValue: (state, action) => {
      state.longUrlTextFieldValue = action.payload;
    },
    setShortenedUrlTextFieldValue: (state, action) => {
      state.shortenedUrlTextFieldValue = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(makeShortUrlThunk.pending, state => {
        state.status = 'loading';
        state.shortUrl = undefined;
      })
      .addCase(makeShortUrlThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shortUrl = action.payload;
      })
      .addCase(makeShortUrlThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const selectShortUrlFormState = (state: RootState) => state[sliceName];
export const shortUrlFormActions = shortUrlFormSlice.actions;
export default sliceName;
