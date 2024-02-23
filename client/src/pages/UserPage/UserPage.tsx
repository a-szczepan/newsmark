import { useWidthChecker } from '../../hooks/useWidthChecker'
import { Header } from '../../components/Header/Header'
import { Layout } from '../../components/Layout/Layout'
import styles from './UserPage.module.scss'
import { Button, ButtonType, IconButton } from '../../components/Button/Button'
import { Icon, IconSize, IconType } from '../../components/Icon/Icon'
import { useEffect, useState } from 'react'
import { EditAnnotation, ReadAnnotation } from '../../components/Annotation/Annotation'
import { Accordion } from '../../components/Accordion/Accordion'
import { useLazyGetAllAnnotationsQuery, useLazyGetAllBookmarksQuery } from '../../store/api/userApi'

import { SearchInput } from '../../components/Input/Input'
import { Tags, Typography } from '../../components/Typography/Typography'
import { Loader } from '../../components/Loader/Loader'
import { Footer } from '../../components/Footer/Footer'
import { AllUserAnnotationsAPI, AllUserBookmarksAPI } from '../../types/userNotes'
import { useGetUser } from '../../hooks/useGetUser'
import { useDispatch } from 'react-redux'
import { toggleAccordion } from '../../store/slices/accordionSlice'
import { useNavigate } from 'react-router-dom'

export const useGetUserPageContent = () => {
  const [annotations, setAnnotations] = useState<AllUserAnnotationsAPI[] | []>([])
  const [bookmarks, setBookmarks] = useState<AllUserBookmarksAPI[] | []>([])
  const [fetchAnnotations, { data: annotationsData, error: annotationsError }] =
    useLazyGetAllAnnotationsQuery()
  const [fetchBookmarks, { data: bookmarksData, error: bookmarkError }] =
    useLazyGetAllBookmarksQuery({})

  useEffect(() => {
    fetchAnnotations({}).then(() => fetchBookmarks({}))
  }, [])

  useEffect(() => {
    setAnnotations(annotationsData ? annotationsData : [])
    setBookmarks(bookmarksData ? bookmarksData : [])
  }, [annotationsData, bookmarksData])

  useEffect(() => {
    if (annotationsError) setAnnotations([])
    if (bookmarkError) setBookmarks([])
  }, [annotationsError, bookmarkError])

  const triggerRefetchAnnotations = () => {
    fetchAnnotations({})
    setAnnotations(annotationsData ? annotationsData : [])
  }

  const searchNotes = (phrase: string) => {
    fetchAnnotations({ phrase }).then(() => fetchBookmarks({ phrase }))
  }

  return {
    annotations,
    bookmarks,
    triggerRefetchAnnotations,
    searchNotes
  }
}

export const UserPage: React.FC = () => {
  const isMobile = useWidthChecker() <= 768 ? true : false
  const { annotations, bookmarks, triggerRefetchAnnotations, searchNotes } = useGetUserPageContent()
  const [activeView, setActiveView] = useState<'bookmarks' | 'annotations'>(
    annotations ? 'annotations' : 'bookmarks'
  )
  const navigate = useNavigate()

  useGetUser()

  const AnnotationSection: React.FC = () => {
    const [editModeAnnotationId, setEditModeAnnotationId] = useState<number | null>(null)
    const dispatch = useDispatch()

    return (
      <div className={styles.annotationSection}>
        {!annotations && <Loader />}
        {annotations &&
          annotations.map((article, index) => (
            <>
              <Accordion
                key={index}
                id={`userpage-accordion-${index}`}
                header={article.articleTitle}
                boldHeader>
                <Button
                  variant={ButtonType.link}
                  buttonAction={() => navigate(`/article?url=${article.articleUrl}`)}
                  icon={IconType.arrowRight}
                  iconVariant="end"
                  iconStyle={{ size: IconSize.small, color: 'dark' }}>
                  Go to article
                </Button>
                {article.annotations.map((annotation, i) => (
                  <div className={styles.accordionWrapper}>
                    <Accordion
                      header={annotation.title}
                      key={i}
                      id={`userpage-accordion-${index}-${i}`}>
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
                          cancel={() => {
                            dispatch(toggleAccordion(`userpage-accordion-${index}-${i}`))
                          }}
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
                  </div>
                ))}
              </Accordion>
              <hr />
            </>
          ))}
      </div>
    )
  }

  const BookmarkSection: React.FC = () => {
    return (
      <div className={styles.bookmarkSection}>
        {!bookmarks && <Loader />}
        {bookmarks &&
          bookmarks.map((bookmark, index) => (
            <>
              <a
                href={`/article?url=${bookmark.articleUrl}`}
                key={`bookmark=${index}`}
                className={styles.bookmark}>
                {bookmark.imageURL ? (
                  <div className={styles.articleImg}>
                    <img src={bookmark.imageURL} />
                  </div>
                ) : (
                  <div className={styles.imgPlaceholder} />
                )}
                <div className={styles.bookmarkText}>
                  <Typography styleVariant="body" bold classes={[styles.header]}>
                    {bookmark.articleTitle}
                  </Typography>
                  <Typography styleVariant="body" classes={[styles.text]}>
                    {bookmark.articleSummary}
                  </Typography>
                </div>
              </a>
              <hr key={`bookmark-divider-${index}`} />
            </>
          ))}
      </div>
    )
  }

  const DesktopLayout: React.FC = () => {
    return (
      <Layout>
        <div className={styles.desktopLayout}>
          <div className={styles.sectionWrapper}>
            <div className={styles.sectionHeader}>
              <Icon icon={IconType.eye} size={IconSize.large} />
              <Typography styleVariant="h4" bold>
                Annotations
              </Typography>
            </div>
            <AnnotationSection />
          </div>
          <hr />
          <div className={styles.sectionWrapper}>
            <div className={styles.sectionHeader}>
              <Icon icon={IconType.bookmark} size={IconSize.large} />
              <Typography styleVariant="h4" bold>
                Bookmarks
              </Typography>
            </div>
            <BookmarkSection />
          </div>
        </div>
      </Layout>
    )
  }

  const MobileLayout: React.FC = ({}) => {
    return (
      <div>
        {activeView === 'bookmarks' && (
          <Layout>
            <BookmarkSection />
          </Layout>
        )}
        {activeView === 'bookmarks' && !bookmarks && <Loader />}
        {activeView === 'annotations' && (
          <Layout>
            <AnnotationSection />
          </Layout>
        )}
        {activeView === 'annotations' && !annotations && <Loader />}
        <div className={styles.mobilePanel}>
          <IconButton
            icon={IconType.bookmark}
            buttonAction={() => {
              setActiveView('bookmarks')
            }}
            lightVariant
            classes={
              activeView === 'bookmarks'
                ? [styles.bookmarkClicked, styles.actionBtn]
                : [styles.actionBtn]
            }>
            Bookmarks
          </IconButton>
          <IconButton
            icon={IconType.annotation}
            buttonAction={() => {
              setActiveView('annotations')
            }}
            lightVariant
            classes={
              activeView === 'annotations'
                ? [styles.annotationClicked, styles.actionBtn]
                : [styles.actionBtn]
            }>
            Annotations
          </IconButton>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.userPage}>
      <Header />
      <div className={styles.contentWrapper}>
        <Layout>
          <Button
            buttonAction={() => {
              navigate('/articles')
            }}
            variant={ButtonType.link}
            icon={IconType.chevronsLeft}
            iconVariant="start"
            iconStyle={{ size: IconSize.small, color: 'dark' }}>
            Articles
          </Button>
          <div className={styles.searchSectionWrapper}>
            <Typography styleVariant="h4" tag={Tags.h1}>
              Browse your notes
            </Typography>
            <div className={styles.searchWrapper}>
              <SearchInput onSubmitAction={searchNotes} classes={[styles.search]} />
            </div>
          </div>
        </Layout>
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
        {!isMobile && <Footer />}
      </div>
    </div>
  )
}
