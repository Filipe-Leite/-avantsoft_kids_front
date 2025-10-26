import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { sessionAuthSliceReducer } from '../features/session/sessionSlice';
import { navigationSliceReducers } from '../features/sessionBusiness/sessionNavigation';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['sessionNavigation']
};

const rootReducer = combineReducers({
  session: sessionAuthSliceReducer,
  sessionNavigation: navigationSliceReducers
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Tipos
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;