import { useWidthChecker } from '../../hooks/useWidthChecker';
import { Header } from '../../components/Header/Header';
import { Layout } from '../../components/Layout/Layout';
import styles from './UserPage.module.scss';
import { IconButton } from '../../components/Button/Button';
import { IconType } from '../../components/Icon/Icon';
import { useEffect, useState } from 'react';
import {
  EditAnnotation,
  ReadAnnotation
} from '../../components/Annotation/Annotation';
import { Accordion } from '../../components/Accordion/Accordion';
import {
  useLazyGetAllAnnotationsQuery,
  useLazyGetAllBookmarksQuery
} from '../../store/api/userApi';

import { SearchInput } from '../../components/Input/Input';
import { Typography } from '../../components/Typography/Typography';

export const useGetUserPageContent = () => {
  const [fetchAnnotations, { data: annotations }] =
    useLazyGetAllAnnotationsQuery();
  const [fetchBookmarks, { data: bookmarks }] = useLazyGetAllBookmarksQuery({});

  useEffect(() => {
    fetchAnnotations({}).then(() => fetchBookmarks({}));
  }, []);

  const triggerRefetchAnnotations = () => {
    fetchAnnotations({});
  };

  return {
    annotations,
    bookmarks,
    triggerRefetchAnnotations
  };
};

export const UserPage: React.FC = () => {
  const isMobile = useWidthChecker() <= 768 ? true : false;
  const { annotations, bookmarks, triggerRefetchAnnotations } =
    useGetUserPageContent();

  const [activeView, setActiveView] = useState<'bookmarks' | 'annotations'>(
    annotations ? 'annotations' : 'bookmarks'
  );

  const AnnotationSection: React.FC = () => {
    const [editModeAnnotationId, setEditModeAnnotationId] = useState<
      number | null
    >(null);

    return (
      <div>
        {annotations &&
          annotations.map((article, index) => (
            <Accordion
              key={index}
              id={`userpage-accordion-${index}`}
              header={article.articleTitle}
              boldHeader
            >
              {article.annotations.map((annotation, i) => (
                <Accordion
                  header={annotation.title}
                  id={`userpage-accordion-${index}-${i}`}
                >
                  {editModeAnnotationId === annotation.id ? (
                    <EditAnnotation
                      url={annotation.articleUrl}
                      formData={{
                        titleValue: annotation.title,
                        colorValue: annotation.color,
                        noteValue: annotation.note
                      }}
                      highlighted={{
                        text: annotation.selectedText
                      }}
                      key={annotation.id}
                      annotationId={annotation.id}
                      handleAnnotationEditComplete={triggerRefetchAnnotations}
                    />
                  ) : (
                    <ReadAnnotation
                      key={annotation.id}
                      annotationId={annotation.id}
                      data={{
                        titleValue: annotation.title,
                        colorValue: annotation.color,
                        noteValue: annotation.note
                      }}
                      highlighted={{
                        text: annotation.selectedText
                      }}
                      setEditMode={setEditModeAnnotationId}
                      handleAnnotationDeleteComplete={triggerRefetchAnnotations}
                    />
                  )}
                </Accordion>
              ))}
            </Accordion>
          ))}
      </div>
    );
  };

  const BookmarkSection: React.FC = () => {
    return (
      <div>
        {bookmarks &&
          bookmarks.map((bookmark, index) => (
            <div key={index}>{bookmark.articleUrl}</div>
          ))}
      </div>
    );
  };

  const DesktopLayout: React.FC = () => {
    return (
      <div>
        <Layout>Desktop</Layout>
      </div>
    );
  };

  const MobileLayout: React.FC = ({}) => {
    return (
      <div>
        {activeView === 'bookmarks' && (
          <Layout>
            <BookmarkSection />
          </Layout>
        )}
        {activeView === 'annotations' && (
          <Layout>
            <AnnotationSection />
          </Layout>
        )}
        <div className={styles.mobilePanel}>
          <IconButton
            icon={IconType.bookmark}
            buttonAction={() => {
              // setIsBookmarkView(!isBookmarkView);
              // setIsAnnotationView(!isBookmarkView ? false : true);
              setActiveView('bookmarks');
            }}
            lightVariant
            classes={
              activeView === 'bookmarks'
                ? [styles.bookmarkClicked, styles.actionBtn]
                : [styles.actionBtn]
            }
          >
            Bookmarks
          </IconButton>
          <IconButton
            icon={IconType.annotation}
            buttonAction={() => {
              // setIsAnnotationView(!isAnnotationView);
              // setIsBookmarkView(!isAnnotationView ? false : true);
              setActiveView('annotations');
            }}
            lightVariant
            classes={
              activeView === 'annotations'
                ? [styles.annotationClicked, styles.actionBtn]
                : [styles.actionBtn]
            }
          >
            Annotations
          </IconButton>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className={styles.userPage}>
        <Typography styleVariant="h3">Browse your notes</Typography>
        <SearchInput onSubmitAction={() => {}} />
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </div>
    </>
  );
};
