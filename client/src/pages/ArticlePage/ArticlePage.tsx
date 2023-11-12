import { useSearchParams } from 'react-router-dom';
import { useGetArticleQuery } from '../../store/api/articleApi';
import { useEffect, useState } from 'react';

export const ArticlePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const url = searchParams.get('url');
  const { data: article, isSuccess: gotArticle } = useGetArticleQuery({
    url
  });

  return <div>{article && article.text}</div>;
};
