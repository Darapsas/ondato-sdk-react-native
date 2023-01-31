import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BackendConfig, Config, UserConfig } from './types';
import { initialConfig } from './constants';
import { reset } from '../global/slice';

export interface KycState {
  kycId: string | null;
  identityVerificationId: string | null;
  config: Config;
}

const initialState: KycState = {
  kycId: null,
  identityVerificationId: null,
  config: initialConfig,
};

const kycSlice = createSlice({
  name: 'kyc',
  initialState,
  reducers: {
    setKycId: (state, action: PayloadAction<{ kycId: string }>) => {
      state.kycId = action.payload.kycId;
    },
    setIdentityVerificationId: (state, action: PayloadAction<{ identityVerificationId: string }>) => {
      state.identityVerificationId = action.payload.identityVerificationId;
    },
    setBackendConfig: (state, action: PayloadAction<{ backendConfig: BackendConfig }>) => {
      state.config = { ...state.config, ...action.payload.backendConfig };
    },
    setUserConfig: (state, action: PayloadAction<{ userConfig: UserConfig }>) => {
      state.config = { ...state.config, ...action.payload.userConfig };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(reset, () => initialState);
  },
});

export const { setKycId, setBackendConfig, setUserConfig, setIdentityVerificationId } = kycSlice.actions;
export const { reducer } = kycSlice;
