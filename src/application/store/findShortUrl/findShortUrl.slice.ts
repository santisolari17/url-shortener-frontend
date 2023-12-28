import { createSlice } from '@reduxjs/toolkit';
import { ShortUrl } from '../../../domain/entities/ShortUrl.entity';
import { ApplicationErrorData } from '../../../infrastructure/errors/ApplicationErrorData';
import { findShortUrlThunk } from './thunks/findShortUrl.thunk';

const sliceName = 'findShortUrl';

type TInitialState = {
  shortUrl?: ShortUrl;
  shortUrlTextFieldValue: string;
  shortUrlExtractedId: '';
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: ApplicationErrorData;
  reloadToggle: boolean;
};

interface RootState {
  [sliceName]: TInitialState;
}

const initialState: TInitialState = {
  shortUrl: undefined,
  shortUrlTextFieldValue: '',
  shortUrlExtractedId: '',
  status: 'idle',
  error: undefined,
  reloadToggle: false,
};

export const findShortUrlSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetState: () => initialState,
    setShortUrl: (state, action) => {
      state.shortUrl = action.payload;
    },
    setShortUrlTextFieldValue: (state, action) => {
      state.shortUrlTextFieldValue = action.payload;
      state.shortUrlExtractedId = action.payload.slice(-9);
    },
    toggleReload: state => {
      state.reloadToggle = !state.reloadToggle;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(findShortUrlThunk.pending, state => {
        state.shortUrl = undefined;
        state.status = 'loading';
      })
      .addCase(findShortUrlThunk.fulfilled, (state, action) => {
        console.log('vamoooo', action.payload);
        state.status = 'succeeded';
        state.shortUrl = action.payload;
      })
      .addCase(findShortUrlThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const selectFindShortUrlState = (state: RootState) => state[sliceName];
export const findShortUrlActions = findShortUrlSlice.actions;
export default sliceName;
