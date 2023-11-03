import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiService';

import userReducer from './slices/userSlice';

//DEV NOTE:  https://redux.js.org/usage/migrating-to-modern-redux
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
