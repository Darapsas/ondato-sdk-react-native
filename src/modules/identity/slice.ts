import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { reset } from '../global/slice';

export interface IdentityState {
  setupId: string | null;
  isScreenRecordingEnabled: boolean;
}

const initialState: IdentityState = {
  setupId: null,
  isScreenRecordingEnabled: false,
};

const identitySlice = createSlice({
  name: 'identity',
  initialState,
  reducers: {
    setSetupId: (state, action: PayloadAction<{ setupId: string }>) => {
      state.setupId = action.payload.setupId;
    },
    setIsScreenRecordingEnabled: (state, action: PayloadAction<{ enabled: boolean }>) => {
      state.isScreenRecordingEnabled = action.payload.enabled;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(reset, () => initialState);
  },
});

export const { setSetupId, setIsScreenRecordingEnabled } = identitySlice.actions;
export const { reducer } = identitySlice;
