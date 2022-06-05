import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { developersApi } from 'api';

export const store = configureStore({
  reducer: {
    [developersApi.reducerPath]: developersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(developersApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
