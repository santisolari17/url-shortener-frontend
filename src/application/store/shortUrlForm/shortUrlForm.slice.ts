import { createSlice } from '@reduxjs/toolkit';
import { ShortUrl } from '../../../domain/entities/ShortUrl.entity';

const sliceName = 'shortUrlForm';

interface RootState {
  [sliceName]: {
    shortUrl: ShortUrl;
    hideForm: boolean;
    hideResult: boolean;
    longUrlTextFieldValue: string;
    shortenedUrlTextFieldValue: string;
  };
}

const initialState = {
  shortUrl: {} as ShortUrl,
  hideForm: false,
  hideResult: true,
  longUrlTextFieldValue: '',
  shortenedUrlTextFieldValue: '',
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
});

export const selectShortUrlFormState = (state: RootState) => state[sliceName];
export const shortUrlFormActions = shortUrlFormSlice.actions;
export default sliceName;
