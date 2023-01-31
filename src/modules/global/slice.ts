import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GlobalState {
  isLoading: boolean;
}

const initialState: GlobalState = {
  isLoading: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
    reset: () => initialState,
  },
});

export const { setIsLoading, reset } = globalSlice.actions;
export const { reducer } = globalSlice;
