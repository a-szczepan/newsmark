import { api } from './apiService';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => {
        return {
          url: '/me',
          method: 'GET',
          credentials: 'include',
          mode: 'cors'
        };
      }
    }),
    loginWithPassword: builder.mutation({
      query: (user) => {
        return {
          url: '/login',
          method: 'POST',
          body: user,
          credentials: 'include',
          mode: 'cors'
        };
      }
    }),
    registerWithPassword: builder.mutation({
      query: (user) => {
        return {
          url: '/register',
          method: 'POST',
          body: user,
          credentials: 'include',
          mode: 'cors'
        };
      }
    }),
    logout: builder.mutation({
      query: (user) => ({
        url: '/logout',
        method: 'POST',
        body: user,
        credentials: 'include',
        mode: 'cors'
      })
    }),
    getAllBookmarks: builder.query({
      query: () => {
        return {
          url: '/user/bookmarks',
          method: 'GET',
          credentials: 'include',
          mode: 'cors'
        };
      }
    }),
    getAllAnnotations: builder.query({
      query: () => {
        return {
          url: '/user/allannotations',
          method: 'GET',
          credentials: 'include',
          mode: 'cors'
        };
      }
    }),
  }),
  overrideExisting: false
});

export const {
  useGetUserQuery,
  useLoginWithPasswordMutation,
  useRegisterWithPasswordMutation,
  useLogoutMutation,
  useGetAllBookmarksQuery,
  useGetAllAnnotationsQuery
} = userApi;
