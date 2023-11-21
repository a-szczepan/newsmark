import { ArticleAPI, ArticlePageDoc } from '../../types/articles';
import { api } from './apiService';

const articleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArticle: builder.query({
      query: (query) => {
        return {
          url: `http://localhost:5000/api/article?url=${query.url}`,
          method: 'GET',
          credentials: 'include',
          mode: 'cors'
        };
      },
      transformResponse: (response: ArticleAPI): ArticlePageDoc => {
        const article = (({
          url,
          title,
          header,
          summary,
          imageURL,
          figcaption,
          paragraphs
        }) => ({
          url,
          title,
          header,
          summary,
          imageURL,
          figcaption,
          paragraphs
        }))(response);

        return article;
      }
    }),
    getArticleNotes: builder.query({
      query: (query) => {
        return {
          url: `http://localhost:5000/api/articlenote?url=${query.url}`,
          method: 'GET',
          credentials: 'include',
          mode: 'cors'
        };
      }
    }),
    getAnnotations: builder.query({
      query: (query) => {
        return {
          url: `http://localhost:5000/api/articleannotation?url=${query.url}`,
          method: 'GET',
          credentials: 'include',
          mode: 'cors'
        };
      }
    }),
    addAnnotation: builder.mutation({
      query: (annotation) => {
        return {
          url: '/articlenote',
          method: 'PUT',
          body: annotation,
          credentials: 'include',
          mode: 'cors'
        };
      }
    }),
    bookmark: builder.mutation({
      query: (query) => {
        return {
          url: `/articlenote/bookmark?url=${query.url}`,
          method: 'PUT',
          credentials: 'include',
          mode: 'cors'
        };
      }
    }),
    unmark: builder.mutation({
      query: (query) => {
        return {
          url: `/articlenote/unmark?url=${query.url}`,
          method: 'PUT',
          credentials: 'include',
          mode: 'cors'
        };
      }
    })
  })
});

export const {
  useGetArticleQuery,
  useGetAnnotationsQuery,
  useAddAnnotationMutation,
  useBookmarkMutation,
  useUnmarkMutation,
  useGetArticleNotesQuery,
} = articleApi;
