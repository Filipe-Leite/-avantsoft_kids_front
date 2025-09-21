import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { sessionAuthSliceReducer } from '../features/session/sessionSlice';

export const store = configureStore({
            reducer: {
                      session: sessionAuthSliceReducer,
            }
});

type GetStateType = typeof store.getState
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<GetStateType>;
export type AppThunk<ReturnType = void> = ThunkAction<
                                                      ReturnType,
                                                      RootState,
                                                      unknown,
                                                      Action<string>
                                                    >;