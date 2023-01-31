import { RootState } from '../../core/store';

export const selectIsScreenRecordingEnabled = (state: RootState): boolean => {
  return state.identity.isScreenRecordingEnabled;
};
