import { createSlice } from '@reduxjs/toolkit';
import { ShortUrl } from '../../../domain/entities/ShortUrl.entity';
import { fetchShortUrlsThunk } from './thunks/fetchShortUrls.thunk';
import { ApplicationErrorData } from '../../../infrastructure/errors/ApplicationErrorData';

const sliceName = 'shortUrl';

type TInitialState = {
  shortUrls: ShortUrl[];
  selectedUrlIds: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: ApplicationErrorData;
  reloadToggle: boolean;
};

interface RootState {
  [sliceName]: TInitialState;
}

const initialState: TInitialState = {
  shortUrls: [] as ShortUrl[],
  selectedUrlIds: [] as string[],
  status: 'idle',
  error: undefined,
  reloadToggle: false,
};

export const shortUrlSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetState: () => initialState,
    setShortUrlList: (state, action) => {
      state.shortUrls = action.payload;
    },
    setSelectedUrlIds: (state, action) => {
      state.selectedUrlIds = action.payload;
    },
    toggleReload: state => {
      state.reloadToggle = !state.reloadToggle;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchShortUrlsThunk.pending, state => {
        state.shortUrls = [];
        state.status = 'loading';
      })
      .addCase(fetchShortUrlsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shortUrls = action.payload;
      })
      .addCase(fetchShortUrlsThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const selectShortUrlState = (state: RootState) => state[sliceName];
export const shortUrlActions = shortUrlSlice.actions;
export default sliceName;
