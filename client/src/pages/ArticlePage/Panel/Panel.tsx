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
  useGetArticleNotesQuery,
  useUnmarkMutation
} from '../../../store/api/articleApi';
import { useSearchParams } from 'react-router-dom';
import {
  EditAnnotation,
  ReadAnnotation
} from '../../../components/Annotation/Annotation';
import { Accordion } from '../../../components/Accordion/Accordion';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import {
  openAnnotationModal,
  closeAnnotationModal
} from '../../../store/slices/annotationModalSlice';
import {
  openViewModal,
  closeViewModal
} from '../../../store/slices/viewModalSlice';
import { useSelector } from 'react-redux';
import { closeAllAccordions } from '../../../store/slices/accordionSlice';
import { useGetAnnotations } from '../../../hooks/useGetAnnotations';

type PanelProps = {
  highlighted: any;
  triggerAnnotationView?: any;
};

const usePanelState = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url');
  const { data: articleNotes, isSuccess: gotNotes } = useGetArticleNotesQuery({
    url
  });
  const [bookmarkOpt, setBookmarkOpt] = useState(false);

  const [editModeAnnotationId, setEditModeAnnotationId] = useState<
    number | null
  >(null);
  const [bookmark] = useBookmarkMutation({});
  const [unmark] = useUnmarkMutation({});
  const isAnnotationModalOpen = useSelector(
    (state: any) => state.annotationModal.isOpened
  );
  const isViewModalOpen = useSelector((state: any) => state.viewModal.isOpened);
  const dispatch = useDispatch();

  const triggerAnnotationModal = () => {

    if (isAnnotationModalOpen) {
      dispatch(closeAnnotationModal());
    } else {
      dispatch(openAnnotationModal());
    }
  };

  const triggerViewModal = () => {
    if (isViewModalOpen) {
      dispatch(closeViewModal());
    } else {
      dispatch(openViewModal());
    }
  };

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
  };

  const toggleAnnotate = () => {
    setEditModeAnnotationId(null);
    triggerAnnotationModal();
  };

  const toggleView = () => {
    setEditModeAnnotationId(null);
    triggerViewModal();
  };

  return {
    bookmarkOpt,
    editModeAnnotationId,
    isAnnotationModalOpen,
    isViewModalOpen,
    setEditModeAnnotationId,
    toggleBookmark,
    toggleAnnotate,
    toggleView
  };
};

export const MobilePanel: React.FC<PanelProps> = ({ highlighted }) => {
  const {
    bookmarkOpt,
    editModeAnnotationId,
    setEditModeAnnotationId,
    isAnnotationModalOpen,
    isViewModalOpen,
    toggleBookmark,
    toggleAnnotate,
    toggleView
  } = usePanelState();
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url');
  const { annotations, getAnnotations } = useGetAnnotations();
  const dispatch = useDispatch();

  useEffect(() => {
    getAnnotations({ url });
  }, [isViewModalOpen]);

  return (
    <>
      {isAnnotationModalOpen && (
        <MobileModal>
          <Typography styleVariant="h3" tag={Tags.h1}>
            Add annotation
          </Typography>
          <hr />
          <div className={styles.annotationWrapper}>
            <EditAnnotation highlighted={highlighted} />
          </div>
        </MobileModal>
      )}
      {isViewModalOpen && (
        <MobileModal>
          <Typography styleVariant="h3" tag={Tags.h1}>
            Annotations
          </Typography>
          <hr />
          <div className={styles.annotationList}>
            {annotations.length > 0 &&
              annotations.map((a, i) => {
                return (
                  <div key={i}>
                    <Accordion header={a.title} id={a.id.toString()}>
                      <div className={styles.annotationWrapper}>
                        {editModeAnnotationId === a.id ? (
                          <EditAnnotation
                            data={{
                              titleValue: a.title,
                              colorValue: a.color,
                              noteValue: a.note
                            }}
                            highlighted={{
                              text: a.selectedText,
                              paragraphNumber: a.paragraphNumber,
                              substringPosition: a.substringPosition
                            }}
                            annotationId={a.id}
                          />
                        ) : (
                          <ReadAnnotation
                            data={{
                              titleValue: a.title,
                              colorValue: a.color,
                              noteValue: a.note
                            }}
                            highlighted={{
                              text: a.selectedText,
                              paragraphNumber: a.paragraphNumber,
                              substringPosition: a.substringPosition
                            }}
                            setEditMode={setEditModeAnnotationId}
                            annotationId={a.id}
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
            isAnnotationModalOpen
              ? [styles.annotationClicked, styles.actionBtn]
              : [styles.actionBtn]
          }
        >
          Annotation
        </IconButton>
        <IconButton
          id="test-id"
          icon={IconType.eye}
          buttonAction={() => {
            toggleView();
            if (!isViewModalOpen) dispatch(closeAllAccordions());
          }}
          lightVariant
          classes={
            isViewModalOpen
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

export const DesktopPanel: React.FC<PanelProps> = ({
  highlighted,
  triggerAnnotationView: { viewOption, setViewOption }
}) => {
  const [annotationOpt, setAnnotationOpt] = useState(false);
  const [viewOpt, setViewOpt] = useState(viewOption ? viewOption : false);
  const {
    bookmarkOpt,
    editModeAnnotationId,
    setEditModeAnnotationId,
    toggleBookmark,
    toggleAnnotate,
    toggleView
  } = usePanelState();
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url');
  const { annotations, getAnnotations } = useGetAnnotations();
  const dispatch = useDispatch();

  useEffect(() => setViewOpt(viewOption), [viewOption]);

  useEffect(() => {
    getAnnotations({ url });
  }, [viewOpt]);

  return (
    <div className={styles.optionsSection}>
      <Button
        variant={ButtonType.text}
        icon={IconType.bookmark}
        iconVariant="start"
        buttonAction={() => {
          toggleBookmark();
          setAnnotationOpt(false);
          setViewOpt(false);
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
          setAnnotationOpt(!annotationOpt);
          setViewOpt(false);
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
            <EditAnnotation
              highlighted={highlighted}
              isAnnotationVisible={setAnnotationOpt}
            />
          </div>
        </div>
      )}
      <hr />
      <Button
        id={'view-btn'}
        variant={ButtonType.text}
        icon={IconType.eye}
        iconVariant="start"
        buttonAction={() => {
          toggleView();
          setViewOpt(!viewOpt);
          setAnnotationOpt(false);
          setViewOption(false);
          if (!viewOpt) dispatch(closeAllAccordions());
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
                  <Accordion header={a.title} id={a.id.toString()}>
                    <div className={styles.annotationWrapper}>
                      {editModeAnnotationId === a.id ? (
                        <EditAnnotation
                          annotationId={a.id}
                          data={{
                            titleValue: a.title,
                            colorValue: a.color,
                            noteValue: a.note
                          }}
                          highlighted={{
                            text: a.selectedText,
                            paragraphNumber: a.paragraphNumber,
                            substringPosition: a.substringPosition
                          }}
                          isAnnotationVisible={setAnnotationOpt}
                        />
                      ) : (
                        <ReadAnnotation
                          annotationId={a.id}
                          data={{
                            titleValue: a.title,
                            colorValue: a.color,
                            noteValue: a.note
                          }}
                          highlighted={{
                            text: a.selectedText,
                            paragraphNumber: a.paragraphNumber,
                            substringPosition: a.substringPosition
                          }}
                          setEditMode={setEditModeAnnotationId}
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
