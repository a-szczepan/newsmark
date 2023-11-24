import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiService';

import userReducer from './slices/userSlice';
import annotationModalReducer from './slices/annotationModalSlice';
import viewModalReducer from './slices/viewModalSlice';

//DEV NOTE:  https://redux.js.org/usage/migrating-to-modern-redux
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    annotationModal: annotationModalReducer,
    viewModal: viewModalReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
