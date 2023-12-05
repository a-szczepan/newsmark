import { ArticleAnnotation } from './articles';

export type AllUserBookmarksAPI = {
  userEmail: string;
  articleUrl: string;
  articleTitle: string;
  articleSummary: string | null;
  imageURL: string;
};

export type AllUserAnnotationsAPI = {
  articleUrl: string;
  annotations: ArticleAnnotation[];
  articleTitle: string;
};
