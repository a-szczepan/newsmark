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
    })
  })
});

export const { useGetArticleQuery } = articleApi;
