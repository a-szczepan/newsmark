import { useSearchParams } from 'react-router-dom';
import { useGetArticleQuery } from '../../store/api/articleApi';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
import { Layout } from '../../components/Layout/Layout';
import { useWidthChecker } from '../../hooks/useWidthChecker';
import styles from './ArticlePage.module.scss';
import { Tags, Typography } from '../../components/Typography/Typography';
import { ArticlePageDoc } from '../../types/articles';
import {  IconButton } from '../../components/Button/Button';
import { IconType } from '../../components/Icon/Icon';
import { MobileModal } from './MobileModal';
import { Annotation } from '../../components/Annotation/Annotation';

const MobilePanel: React.FC = () => {
  const [bookmarkOpt, setBookmarkOpt] = useState(false);
  const [annotationOpt, setAnnotationOpt] = useState(false);
  const [viewOpt, setViewOpt] = useState(false);
  const [isAnnotationEditMode, setIsAnnotationEditMode] = useState(false);


  //UPDATE clicked state when tab is changed
  return (
    <>
      {annotationOpt && (
        <MobileModal isOpened={annotationOpt} setIsOpened={setAnnotationOpt}>
          <Typography styleVariant="h3" tag={Tags.h1}>
            Add annotation
          </Typography>
          <hr />
          <div className={styles.annotationWrapper}>
          <Annotation editMode={isAnnotationEditMode} setEditMode={setIsAnnotationEditMode}/>
          </div>
        </MobileModal>
      )}
      {viewOpt && (
        <MobileModal isOpened={viewOpt} setIsOpened={setViewOpt}>
          <Typography styleVariant="h3" tag={Tags.h1}>
            Annotations
          </Typography>
          <hr />
          <div className={styles.annotationWrapper}>
          <Annotation editMode={isAnnotationEditMode} setEditMode={setIsAnnotationEditMode} viewMode={true}/>
          </div>
        </MobileModal>
      )}
      <div className={styles.mobilePanel}>
        <IconButton
          icon={IconType.bookmark}
          buttonAction={() => {
            setBookmarkOpt(!bookmarkOpt);
          }}
          lightVariant
          classes={
            bookmarkOpt
              ? [styles.bookmarkClicked, styles.actionBtn]
              : [styles.actionBtn]
          }
        >
          Bookmark
        </IconButton>
        <IconButton
          icon={IconType.annotation}
          buttonAction={() => {
            setAnnotationOpt(!annotationOpt);
            setIsAnnotationEditMode(true)
          }}
          lightVariant
          classes={
            annotationOpt
              ? [styles.annotationClicked, styles.actionBtn]
              : [styles.actionBtn]
          }
        >
          Annotation
        </IconButton>
        <IconButton
          icon={IconType.eye}
          buttonAction={() => {
            setViewOpt(!viewOpt);
            setIsAnnotationEditMode(false)
          }}
          lightVariant
          classes={
            viewOpt
              ? [styles.viewClicked, styles.actionBtn]
              : [styles.actionBtn]
          }
        >
          View
        </IconButton>
      </div>
    </>
  );
};

export const ArticlePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useWidthChecker() <= 768 ? true : false;
  const url = searchParams.get('url');
  const { data: article, isSuccess: gotArticle } = useGetArticleQuery({
    url
  });
  const [articleData, setArticleData] = useState<ArticlePageDoc>();

  useEffect(() => {
    if (gotArticle) {
      setArticleData(article);
    }
  }, [article]);

  const optionsSection = <div className={styles.optionsSection}>option</div>;

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
        {isMobile && <MobilePanel />}
      </div>
    </>
  );
};
