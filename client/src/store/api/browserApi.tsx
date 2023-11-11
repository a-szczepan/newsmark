import { api } from './apiService';
import { NYT_API_KEY } from '../../../config';
import { BrowserPageArticle, TopStoriesAPI } from '../../types/articles';
import { parseMainPage } from '../../utils/articleParsing';

const browserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMainPageArticles: builder.query({
      keepUnusedDataFor: 3600,
      query: () => {
        return {
          url: `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${NYT_API_KEY}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        };
      },
      transformResponse: (
        response: { data: TopStoriesAPI },
        meta,
        arg
      ): BrowserPageArticle[] => {
        return parseMainPage(response);
      }
    })
  }),
  overrideExisting: false
});

export const { useGetMainPageArticlesQuery } = browserApi;
