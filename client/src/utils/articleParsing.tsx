import { Document, BrowserPageArticle, Article } from '../types/articles';

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

export const parseSearchedArticles = (data) => {
  const browserPageArticles = data.response.docs.reduce(
    (acc: BrowserPageArticle[], doc: Document) => {
      const { headline, abstract, web_url, multimedia } = doc;
      const image =
        multimedia.length > 0
          ? `https://static01.nyt.com/${multimedia[0].url}`
          : '';

      acc.push({
        title: headline.main,
        abstract,
        url: web_url,
        image
      });

      return acc;
    },
    []
  );
  return browserPageArticles;
};
