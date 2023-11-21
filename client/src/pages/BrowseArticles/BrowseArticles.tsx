import React, { useEffect, useState } from 'react';
import styles from './BrowseArticles.modules.scss';
import { useGetUserQuery } from '../../store/api/userApi';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../../store/slices/userSlice';
import { Header } from '../../components/Header/Header';
import {
  useGetMainPageArticlesQuery,
  useLazySearchArticlesQuery
} from '../../store/api/browserApi';
import { SearchInput } from '../../components/Input/Input';
import { BrowserPageArticle } from '../../types/articles';
import { Tags, Typography } from '../../components/Typography/Typography';
import { Layout } from '../../components/Layout/Layout';
import { Footer } from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

//DEV NOTE: Create divider component - one for whole app

const BrowseArticles: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user, isSuccess: gotUser } = useGetUserQuery({});
  const { data: browserArticles, isSuccess: gotBrowseArticles } =
    useGetMainPageArticlesQuery({});
  const [search, { data: searchedArticles, isSuccess: gotSearchedArticles }] =
    useLazySearchArticlesQuery({});
  const [articles, setArticles] = useState<BrowserPageArticle[]>();

  useEffect(() => {
    if (gotUser)
      dispatch(
        userLoggedIn({
          sessionId: user.id,
          email: user.email
        })
      );
  }, [gotUser]);

  useEffect(() => {
    if (gotBrowseArticles) setArticles(browserArticles);
  }, [browserArticles]);

  useEffect(() => {
    if (gotSearchedArticles) setArticles(searchedArticles);
  }, [searchedArticles]);

  const searchArticle = (inputValue: string) => {
    search(inputValue);
  };

  const ArticleCard: React.FC<BrowserPageArticle> = ({
    title,
    abstract,
    url,
    image
  }): JSX.Element => {
    return (
      <article className={styles.articleCard}>
        <div
        className={styles.wrapper}
          onClick={() => navigate(`/article?url=${url}`)}
        >
          {image.length > 0 && <img src={image} alt={title} />}
          <Typography styleVariant="h5" tag={Tags.h1}>
            {title}
          </Typography>
          <Typography styleVariant="body">{abstract}</Typography>
        </div>
      </article>
    );
  };

  return (
    <div>
      <Header />
      <Layout>
        <div className={styles.browseArticles}>
          <SearchInput
            classes={[styles.search]}
            onSubmitAction={searchArticle}
          />
          <hr className={styles.divider} />
          {articles && (
            <section className={styles.articlesContainer}>
              {articles.map((article, index) => (
                <ArticleCard key={index} {...article} />
              ))}
            </section>
          )}
        </div>
      </Layout>
      <Footer />
    </div>
  );
};

export default BrowseArticles;
