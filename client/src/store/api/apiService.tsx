import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = 'http://localhost:5000/api';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: () => ({}),
});


