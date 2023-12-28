import { createSlice } from '@reduxjs/toolkit';

const sliceName = 'ui';

interface RootState {
  [sliceName]: {
    disableAppNavigation: boolean;
  };
}

const initialState = {
  disableAppNavigation: false,
};

export const uiSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
    setDisableAppNavigation: (state, action) => {
      state.disableAppNavigation = action.payload;
    },
  },
});

export const selectUiState = (state: RootState) => state[sliceName];
export const uiActions = uiSlice.actions;
export default sliceName;
