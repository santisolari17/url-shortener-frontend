import { configureStore } from '@reduxjs/toolkit';
import shortUrlSliceName, { shortUrlSlice } from './shortUrl/shortUrl.slice';
import shortUrlFormSliceName, { shortUrlFormSlice } from './shortUrlForm/shortUrlForm.slice';
import uiSliceName, { uiSlice } from './ui/ui.slice';

export const store = configureStore({
  reducer: {
    [shortUrlSliceName]: shortUrlSlice.reducer,
    [shortUrlFormSliceName]: shortUrlFormSlice.reducer,
    [uiSliceName]: uiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
