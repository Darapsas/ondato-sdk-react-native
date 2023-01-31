import { RootState } from '../../core/store';

export const selectFullAccessToken = (state: RootState): string | null => {
  return state.sessions.fullAccessToken;
};

export const selectAccessToken = (state: RootState): string | null => {
  return state.sessions.accessToken;
};
