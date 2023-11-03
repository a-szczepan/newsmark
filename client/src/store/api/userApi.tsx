import { api } from './apiService';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => {
        return {
          url: '/me',
          method: 'GET'
        };
      }
    }),
    loginWithPassword: builder.mutation({
      query: (user) => {
        return {
          url: '/login',
          method: 'POST',
          body: user
        };
      }
    }),
    logout: builder.mutation({
      query: (user) => ({
        url: '/logout',
        method: 'POST',
        body: user
      })
    })
  }),
  overrideExisting: false
});

export const {
  useGetUserQuery,
  useLoginWithPasswordMutation,
  useLogoutMutation
} = userApi;
