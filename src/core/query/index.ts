import { QueryClient } from '@tanstack/react-query';
import { setIsLoading } from '../../modules/global/slice';
import { store } from '../store';
import Toast from 'react-native-toast-message';
import i18n from 'i18next';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      onMutate: () => store.dispatch(setIsLoading({ isLoading: true })),
      onSettled: () => Promise.resolve(store.dispatch(setIsLoading({ isLoading: false }))),
      onError: () => Toast.show({ type: 'error', text1: i18n.t('common.base_error') ?? undefined }),
    },
  },
});

export default queryClient;
