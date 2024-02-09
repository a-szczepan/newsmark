import { api } from './apiService';
import {
  ArticleSearchAPI,
  BrowserPageArticle,
  TopStoriesAPI
} from '../../types/articles';
import {
  parseMainPage,
  parseSearchedArticles
} from '../../utils/articleParsing';

const REACT_APP_NYT_API_KEY = '3ZvFAkQukP3mHC28tvZZZQH86KpJiBog'

const browserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMainPageArticles: builder.query({
      keepUnusedDataFor: 3600,
      query: () => {
        return {
          url: `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${REACT_APP_NYT_API_KEY}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        };
      },
      transformResponse: (response: {
        data: TopStoriesAPI;
      }): BrowserPageArticle[] => {
        return parseMainPage(response);
      }
    }),
    searchArticles: builder.query({
      query: (query, page = 0) => {
        return {
          url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&page=${page}&api-key=${REACT_APP_NYT_API_KEY}`,
          method: 'GET'
        };
      },
      transformResponse: (response: {
        data: ArticleSearchAPI;
      }): BrowserPageArticle[] => {
        return parseSearchedArticles(response);
      }
    })
  }),
  overrideExisting: false
});

export const { useGetMainPageArticlesQuery, useLazySearchArticlesQuery } =
  browserApi;
