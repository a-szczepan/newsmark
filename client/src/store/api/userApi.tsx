import { AllUserAnnotationsAPI, AllUserBookmarksAPI } from '../../types/userNotes'
import { api } from './apiService'

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => {
        return {
          url: '/me',
          method: 'GET',
          credentials: 'include',
          mode: 'cors'
        }
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
        }
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
        }
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
      query: (params) => {
        return {
          url: `/user/bookmarks${params.phrase ? `?phrase=${params.phrase}` : ''}`,
          method: 'GET',
          credentials: 'include',
          mode: 'cors'
        }
      },
      transformResponse: (data: AllUserBookmarksAPI[]): AllUserBookmarksAPI[] => {
        return data
      }
    }),
    getAllAnnotations: builder.query({
      query: (params) => {
        return {
          url: `/user/allannotations${params.phrase ? `?phrase=${params.phrase}` : ''}`,
          method: 'GET',
          credentials: 'include',
          mode: 'cors'
        }
      },
      transformResponse: (data: AllUserAnnotationsAPI[]): AllUserAnnotationsAPI[] => {
        return data
      }
    })
  }),
  overrideExisting: false
})

export const {
  useGetUserQuery,
  useLoginWithPasswordMutation,
  useRegisterWithPasswordMutation,
  useLogoutMutation,
  useLazyGetAllAnnotationsQuery,
  useLazyGetAllBookmarksQuery,
  useLazyGetUserQuery
} = userApi
