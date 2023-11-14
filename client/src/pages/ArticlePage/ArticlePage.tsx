import { useSearchParams } from 'react-router-dom';
import { useGetArticleQuery } from '../../store/api/articleApi';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
import { Layout } from '../../components/Layout/Layout';
import { useWidthChecker } from '../../hooks/useWidthChecker';
import styles from './ArticlePage.module.scss';
import { Tags, Typography } from '../../components/Typography/Typography';
import { ArticlePageDoc } from '../../types/articles';

export const ArticlePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useWidthChecker() <= 768 ? true : false;
  const url = searchParams.get('url');
  const { data: article, isSuccess: gotArticle } = useGetArticleQuery({
    url
  });
  const [articleData, setArticleData] = useState<ArticlePageDoc>();

  useEffect(() => {
    console.log(article);
    if (gotArticle) {
      setArticleData(article);
    }
  }, [article]);

  const optionsSection = <div className={styles.optionsSection}>option</div>;

  const mobilePanel = <div className={styles.mobilePanel}>mobile</div>;

  const articleSection = (
    <article>
      <Typography styleVariant="h3" tag={Tags.h1}>
        {articleData?.header}
      </Typography>
      <Typography styleVariant="body">{articleData?.summary}</Typography>
      {articleData?.imageURL && (
        <figure>
          <picture>
            <img src={articleData.imageURL} />
          </picture>
          {article?.figcaption && (
            <figcaption>
              <Typography styleVariant="caption">
                {article?.figcaption.replace('Credit...', ' ')}
              </Typography>
            </figcaption>
          )}
        </figure>
      )}
      {article?.paragraphs && (
        <div>
          {article.paragraphs.map((paragraph, i) => (
            <Typography styleVariant="body" key={i}>
              {paragraph}
            </Typography>
          ))}
        </div>
      )}
    </article>
  );

  return (
    <>
      <Header />
      <div className={styles.articlePage}>
        <Layout>
          {articleData && articleSection}
          {!isMobile && optionsSection}
        </Layout>
        {isMobile && mobilePanel}
      </div>
    </>
  );
};
