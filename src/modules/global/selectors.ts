import { RootState } from '../../core/store';

export const selectIsLoading = (state: RootState): boolean => {
  return state.global.isLoading;
};
