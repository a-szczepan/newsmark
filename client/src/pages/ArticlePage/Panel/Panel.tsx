import { useState } from 'react';
import { MobileModal } from '../MobileModal/MobileModal';
import { Tags, Typography } from '../../../components/Typography/Typography';
import { Annotation } from '../../../components/Annotation/Annotation';
import styles from './Panel.module.scss';
import {
  Button,
  ButtonType,
  IconButton
} from '../../../components/Button/Button';
import { IconType } from '../../../components/Icon/Icon';

const usePanelState = () => {
  const [bookmarkOpt, setBookmarkOpt] = useState(false);
  const [annotationOpt, setAnnotationOpt] = useState(false);
  const [viewOpt, setViewOpt] = useState(false);
  const [isAnnotationEditMode, setIsAnnotationEditMode] = useState(false);

  const toggleBookmark = () => {
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

export const MobilePanel: React.FC = () => {
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
  return (
    <>
      {annotationOpt && (
        <MobileModal isOpened={annotationOpt} setIsOpened={setAnnotationOpt}>
          <Typography styleVariant="h3" tag={Tags.h1}>
            Add annotation
          </Typography>
          <hr />
          <div className={styles.annotationWrapper}>
            <Annotation
              editMode={isAnnotationEditMode}
              setEditMode={setIsAnnotationEditMode}
            />
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
            <Annotation
              editMode={isAnnotationEditMode}
              setEditMode={setIsAnnotationEditMode}
              viewMode={true}
            />
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

export const DesktopPanel: React.FC = () => {
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
            <Annotation
              editMode={isAnnotationEditMode}
              setEditMode={setIsAnnotationEditMode}
            />
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
        <div className={styles.annotationWrapper}>
          <Annotation
            editMode={isAnnotationEditMode}
            setEditMode={setIsAnnotationEditMode}
            viewMode={true}
          />
        </div>
      )}
      <hr />
    </div>
  );
};
