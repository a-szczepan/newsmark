import { useEffect, useState } from 'react';
import { MobileModal } from '../MobileModal/MobileModal';
import { Tags, Typography } from '../../../components/Typography/Typography';
import styles from './Panel.module.scss';
import {
  Button,
  ButtonType,
  IconButton
} from '../../../components/Button/Button';
import { IconType } from '../../../components/Icon/Icon';
import {
  useBookmarkMutation,
  useLazyGetAnnotationsQuery,
  useGetArticleNotesQuery,
  useUnmarkMutation
} from '../../../store/api/articleApi';
import { useSearchParams } from 'react-router-dom';
import {
  EditAnnotation,
  ReadAnnotation
} from '../../../components/Annotation/Annotation';
import { Accordion } from '../../../components/Accordion/Accordion';

const usePanelState = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url');
  const { data: articleNotes, isSuccess: gotNotes } = useGetArticleNotesQuery({
    url
  });
  const [bookmarkOpt, setBookmarkOpt] = useState(false);
  const [annotationOpt, setAnnotationOpt] = useState(false);
  const [viewOpt, setViewOpt] = useState(false);
  const [isAnnotationEditMode, setIsAnnotationEditMode] = useState(false);
  const [bookmark] = useBookmarkMutation({});
  const [unmark] = useUnmarkMutation({});

  useEffect(() => {
    if (gotNotes) setBookmarkOpt(articleNotes?.isBookmarked);
  }, [articleNotes?.isBookmarked]);

  const toggleBookmark = () => {
    if (!bookmarkOpt) {
      bookmark({ url });
    } else {
      unmark({ url });
    }
    setBookmarkOpt(!bookmarkOpt);
    setAnnotationOpt(false);
    setViewOpt(false);
  };

  const toggleAnnotate = () => {
    setAnnotationOpt(!annotationOpt);
    setIsAnnotationEditMode(true);
    setViewOpt(false);
  };

  const toggleView = () => {
    setViewOpt(!viewOpt);
    setIsAnnotationEditMode(false);
    setAnnotationOpt(false);
  };

  return {
    bookmarkOpt,
    annotationOpt,
    setAnnotationOpt,
    viewOpt,
    setViewOpt,
    isAnnotationEditMode,
    setIsAnnotationEditMode,
    toggleBookmark,
    toggleAnnotate,
    toggleView
  };
};

type PanelProps = {
  selectedText: string;
};

export const MobilePanel: React.FC<PanelProps> = ({ selectedText }) => {
  const {
    bookmarkOpt,
    annotationOpt,
    setAnnotationOpt,
    viewOpt,
    setViewOpt,
    isAnnotationEditMode,
    setIsAnnotationEditMode,
    toggleBookmark,
    toggleAnnotate,
    toggleView
  } = usePanelState();
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url');
  const [
    getAnnotations,
    { data: fetchedAnnotations, isSuccess: gotannotations }
  ] = useLazyGetAnnotationsQuery({});

  const [annotations, setAnnotations] = useState<any[]>([]);

  useEffect(() => {
    getAnnotations({ url });
    if (gotannotations) setAnnotations(fetchedAnnotations);
  }, [fetchedAnnotations, viewOpt]);

  return (
    <>
      {annotationOpt && (
        <MobileModal isOpened={annotationOpt} setIsOpened={setAnnotationOpt}>
          <Typography styleVariant="h3" tag={Tags.h1}>
            Add annotation
          </Typography>
          <hr />
          <div className={styles.annotationWrapper}>
            <EditAnnotation selectedText={selectedText} />
          </div>
        </MobileModal>
      )}
      {viewOpt && (
        <MobileModal isOpened={viewOpt} setIsOpened={setViewOpt}>
          <Typography styleVariant="h3" tag={Tags.h1}>
            Annotations
          </Typography>
          <hr />
          <div className={styles.annotationList}>
            {annotations.length > 0 &&
              annotations.map((a, i) => {
                return (
                  <div key={i}>
                    <Accordion key={i} header={a.title}>
                      <div className={styles.annotationWrapper}>
                        {isAnnotationEditMode ? (
                          <EditAnnotation
                            data={{
                              titleValue: a.title,
                              colorValue: a.color,
                              noteValue: a.note
                            }}
                            selectedText={a.selectedText}
                          />
                        ) : (
                          <ReadAnnotation
                            data={{
                              titleValue: a.title,
                              colorValue: a.color,
                              noteValue: a.note
                            }}
                            selectedText={a.selectedText}
                            setEditMode={setIsAnnotationEditMode}
                          />
                        )}
                      </div>
                    </Accordion>
                    <hr />
                  </div>
                );
              })}
          </div>
        </MobileModal>
      )}
      <div className={styles.mobilePanel}>
        <IconButton
          icon={IconType.bookmark}
          buttonAction={() => {
            toggleBookmark();
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
            toggleAnnotate();
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
            toggleView();
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

export const DesktopPanel: React.FC<PanelProps> = ({ selectedText }) => {
  const {
    bookmarkOpt,
    annotationOpt,
    viewOpt,
    isAnnotationEditMode,
    setIsAnnotationEditMode,
    toggleBookmark,
    toggleAnnotate,
    toggleView
  } = usePanelState();
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url');
  const [
    getAnnotations,
    { data: fetchedAnnotations, isSuccess: gotannotations }
  ] = useLazyGetAnnotationsQuery({});
  const [annotations, setAnnotations] = useState<any[]>([]);

  useEffect(() => {
    getAnnotations({ url });
    if (gotannotations) setAnnotations(fetchedAnnotations);
  }, [fetchedAnnotations, viewOpt]);

  return (
    <div className={styles.optionsSection}>
      <Button
        variant={ButtonType.text}
        icon={IconType.bookmark}
        iconVariant="start"
        buttonAction={() => {
          toggleBookmark();
        }}
        classes={
          bookmarkOpt
            ? [styles.bookmarkClicked, styles.option]
            : [styles.option]
        }
      >
        Bookmark
      </Button>
      <hr />
      <Button
        variant={ButtonType.text}
        icon={IconType.annotation}
        iconVariant="start"
        buttonAction={() => {
          toggleAnnotate();
        }}
        classes={
          annotationOpt
            ? [styles.annotationClicked, styles.option]
            : [styles.option]
        }
      >
        Annotate
      </Button>
      {annotationOpt && (
        <div className="container">
          <div className={styles.annotationWrapper}>
            <EditAnnotation selectedText={selectedText} />
          </div>
        </div>
      )}
      <hr />
      <Button
        variant={ButtonType.text}
        icon={IconType.eye}
        iconVariant="start"
        buttonAction={() => {
          toggleView();
        }}
        classes={
          viewOpt ? [styles.viewClicked, styles.option] : [styles.option]
        }
      >
        View
      </Button>
      {viewOpt && (
        <div className={styles.annotationList}>
          {annotations.length > 0 &&
            annotations.map((a, i) => {
              return (
                <div key={i}>
                  <Accordion header={a.title}>
                    <div className={styles.annotationWrapper}>
                      {isAnnotationEditMode ? (
                        <EditAnnotation
                          data={{
                            titleValue: a.title,
                            colorValue: a.color,
                            noteValue: a.note
                          }}
                          selectedText={a.selectedText}
                        />
                      ) : (
                        <ReadAnnotation
                          data={{
                            titleValue: a.title,
                            colorValue: a.color,
                            noteValue: a.note
                          }}
                          selectedText={a.selectedText}
                          setEditMode={setIsAnnotationEditMode}
                        />
                      )}
                    </div>
                  </Accordion>
                  <hr />
                </div>
              );
            })}
        </div>
      )}
      {!viewOpt && <hr />}
    </div>
  );
};
