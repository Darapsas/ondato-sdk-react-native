import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FaceTecLicense } from './types';
import { reset } from '../global/slice';

export interface IdentityState {
  license: FaceTecLicense | null;
  sessionToken: string | null;
}

const initialState: IdentityState = {
  license: null,
  sessionToken: null,
};

const faceTecSlice = createSlice({
  name: 'faceTec',
  initialState,
  reducers: {
    setFaceTecLicense: (state, action: PayloadAction<{ license: FaceTecLicense }>) => {
      state.license = action.payload.license;
    },
    setFaceTecSessionToken: (state, action: PayloadAction<{ sessionToken: string }>) => {
      state.sessionToken = action.payload.sessionToken;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(reset, () => initialState);
  },
});

export const { setFaceTecLicense, setFaceTecSessionToken } = faceTecSlice.actions;
export const { reducer } = faceTecSlice;
