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
      }
    })
  })
});

export const { useGetArticleQuery } = articleApi;
