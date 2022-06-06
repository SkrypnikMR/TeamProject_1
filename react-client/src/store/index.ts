import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { developersApi, questionsApi } from 'api';

export const store = configureStore({
  reducer: {
    [developersApi.reducerPath]: developersApi.reducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(developersApi.middleware).concat(questionsApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
