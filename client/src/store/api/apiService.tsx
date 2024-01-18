import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = 'https://newsmark.onrender.com/api';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: URL
  }),
  endpoints: () => ({})
});
