import { ArticleAPI, ArticleAnnotationsAPI, ArticlePageDoc } from '../../types/articles'
import { api } from './apiService'
const REACT_APP_SERVER_URL = 'https://szczpanczyk.tech/'

const articleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArticle: builder.query({
      query: (query) => {
        return {
          url: `${REACT_APP_SERVER_URL}/api/article?url=${encodeURIComponent(query.url)}`,
          method: 'GET',
          credentials: 'include',
          mode: 'cors'
        }
      },
      transformResponse: (response: ArticleAPI): ArticlePageDoc => {
        const article = (({ url, title, header, summary, imageURL, figcaption, paragraphs }) => ({
          url,
          title,
          header,
          summary,
          imageURL,
          figcaption,
          paragraphs
        }))(response)

        return article
      }
    }),
    getArticleNotes: builder.query({
      query: (query) => {
        return {
          url: `${process.env.REACT_APP_SERVER_URL}/api/articlenote?url=${encodeURIComponent(
            query.url
          )}`,
          method: 'GET',
          credentials: 'include',
          mode: 'cors'
        }
      },
      keepUnusedDataFor: 0
    }),
    getAnnotations: builder.query({
      query: (query) => {
        return {
          url: `${process.env.REACT_APP_SERVER_URL}/api/articleannotation?url=${encodeURIComponent(
            query.url
          )}`,
          method: 'GET',
          credentials: 'include',
          mode: 'cors'
        }
      },
      keepUnusedDataFor: 0
    }),
    addAnnotation: builder.mutation({
      query: (annotation) => {
        return {
          url: '/articlenote',
          method: 'PUT',
          body: annotation,
          credentials: 'include',
          mode: 'cors'
        }
      }
    }),
    editAnnotation: builder.mutation({
      query: ({ annotation, annotationId }) => {
        return {
          url: `/articleannotation/${annotationId}`,
          method: 'PATCH',
          body: annotation,
          credentials: 'include',
          mode: 'cors'
        }
      },
      transformResponse: (data: ArticleAnnotationsAPI[]): ArticleAnnotationsAPI[] => {
        return data
      }
    }),
    deleteAnnotation: builder.mutation({
      query: (annotationId) => {
        return {
          url: `/articleannotation/${annotationId}`,
          method: 'DELETE',
          credentials: 'include',
          mode: 'cors'
        }
      },
      transformResponse: (data: ArticleAnnotationsAPI[]): ArticleAnnotationsAPI[] => {
        return data
      }
    }),
    bookmark: builder.mutation({
      query: (query) => {
        return {
          url: `/articlenote/bookmark?url=${encodeURIComponent(query.url)}`,
          method: 'PUT',
          credentials: 'include',
          mode: 'cors'
        }
      }
    }),
    unmark: builder.mutation({
      query: (query) => {
        return {
          url: `/articlenote/unmark?url=${encodeURIComponent(query.url)}`,
          method: 'PUT',
          credentials: 'include',
          mode: 'cors'
        }
      }
    })
  })
})

export const {
  useGetArticleQuery,
  useLazyGetAnnotationsQuery,
  useGetAnnotationsQuery,
  useAddAnnotationMutation,
  useEditAnnotationMutation,
  useDeleteAnnotationMutation,
  useBookmarkMutation,
  useUnmarkMutation,
  useGetArticleNotesQuery
} = articleApi
