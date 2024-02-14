import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = 'https://szczpanczyk.tech/api';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: URL
  }),
  endpoints: () => ({})
});
