import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { reducer as sessionsReducer } from '../../modules/sessions/slice';
import { reducer as identityReducer } from '../../modules/identity/slice';
import { reducer as faceTecReducer } from '../../modules/face-tec/slice';
import { reducer as kycReducer } from '../../modules/kyc/slice';
import { reducer as globalReducer } from '../../modules/global/slice';

const rootReducer = combineReducers({
  sessions: sessionsReducer,
  identity: identityReducer,
  kyc: kycReducer,
  faceTec: faceTecReducer,
  global: globalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (get) => get().concat(logger),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
