import { useParams } from 'react-router-dom';

export const ArticlePage: React.FC = () => {
  const { articleId } = useParams();

  return <div>Article page: {articleId}</div>;
};
