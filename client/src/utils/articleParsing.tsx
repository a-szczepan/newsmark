import { TopStoriesAPI, BrowserPageArticle, Article } from '../types/articles';

export const parseMainPage = (data) => {
  const browserPageArticles = data.results.reduce(
    (acc: BrowserPageArticle[], article: Article): BrowserPageArticle[] => {
      if (article.title.length > 0)
        acc.push({
          title: article.title,
          abstract: article.abstract,
          url: article.url,
          image: article.multimedia?.length > 0 ? article.multimedia[0].url : ''
        });
      return acc;
    },
    []
  );

  return browserPageArticles;
};
