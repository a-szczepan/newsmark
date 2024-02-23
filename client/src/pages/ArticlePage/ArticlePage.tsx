import { useNavigate, useSearchParams } from 'react-router-dom'
import { useGetArticleQuery } from '../../store/api/articleApi'
import { useEffect, useState } from 'react'
import { Header } from '../../components/Header/Header'
import { Layout } from '../../components/Layout/Layout'
import { useWidthChecker } from '../../hooks/useWidthChecker'
import styles from './ArticlePage.module.scss'
import { Tags, Typography } from '../../components/Typography/Typography'
import { ArticlePageDoc } from '../../types/articles'
import { DesktopPanel, MobilePanel } from './Panel/Panel'
import { useHighlighter } from '../../hooks/useHighlighter'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { openViewModal } from '../../store/slices/viewModalSlice'
import { toggleAccordion } from '../../store/slices/accordionSlice'
import { useGetAnnotations } from '../../hooks/useGetAnnotations'
import { Loader } from '../../components/Loader/Loader'
import { Footer } from '../../components/Footer/Footer'
import { addSpansToMultilineParagraph } from '../../utils/documentConversion'
import { useGetUser } from '../../hooks/useGetUser'
import { Button, ButtonType } from '../../components/Button/Button'
import { IconSize, IconType } from '../../components/Icon/Icon'

export const ArticlePage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const url = searchParams.get('url')
  const isMobile = useWidthChecker() <= 768 ? true : false
  const {
    data: article,
    isSuccess: gotArticle,
    isError: articleError
  } = useGetArticleQuery({
    url
  })
  const [articleNotFound, setArticleNotFound] = useState(false)
  const [articleData, setArticleData] = useState<ArticlePageDoc>()
  const { annotations, getAnnotations } = useGetAnnotations()
  const highlighted = useHighlighter()
  const dispatch = useDispatch()
  const [viewOption, setViewOption] = useState(false)
  useGetUser()
  const navigate = useNavigate()


  useEffect(() => {
    if (articleError) setArticleNotFound(true)
  }, [articleError])

  function addSpansToSelections(paragraphId: number, toHighlight: any) {
    const paragraph = document.getElementById(`article-paragraph-${paragraphId}`)
    const paragraphClasses = paragraph?.getAttribute('class')
    const newParagraph = document.createElement('p')
    newParagraph.setAttribute('id', `article-paragraph-${paragraphId}`)
    newParagraph.setAttribute('class', paragraphClasses as string)

    const paragraphText = paragraph ? paragraph.textContent : ''
    function checkIndex(index) {
      return toHighlight.find((item) => item?.start === index)
    }

    let textTemp = ''

    for (let i = 0; i < paragraphText!.length; i++) {
      const present = checkIndex(i)

      if (!present) {
        textTemp += paragraphText![i]
      }

      if (present) {
        const newText = document.createTextNode(textTemp)
        newParagraph.appendChild(newText)
        textTemp = ''
        const newSpan = document.createElement('span')
        newSpan.setAttribute('class', `${classnames(styles.color, styles[present.color])}`)
        const newContent = document.createTextNode(
          paragraphText?.slice(present.start, present.end)!
        )
        newSpan.appendChild(newContent)
        newSpan.addEventListener('click', (e) => {
          e.stopImmediatePropagation()
          setViewOption(true)
          dispatch(openViewModal())
          dispatch(toggleAccordion(present.id))
        })
        newParagraph.appendChild(newSpan)
        i = present.end - 1
      }
      if (i === paragraphText!.length - 1) {
        const newText = document.createTextNode(textTemp)
        newParagraph.appendChild(newText)
      }
    }
    paragraph?.replaceWith(newParagraph)
  }

  function addMultiParagraphSpans(paragraphsList: number[], toHighlight) {
    for (let i = 0; i < paragraphsList.length; i++) {
      const currentParagraph: HTMLElement = document.getElementById(
        `article-paragraph-${paragraphsList[i]}`
      )!
      const paragraphClasses = currentParagraph?.getAttribute('class')

      const newSpan = document.createElement('span')
      newSpan.setAttribute('class', `${classnames(styles.color, styles[toHighlight.color])}`)
      newSpan.addEventListener('click', (e) => {
        e.stopImmediatePropagation()
        setViewOption(true)
        dispatch(openViewModal())
        dispatch(toggleAccordion(toHighlight.id))
      })

      if (currentParagraph) {
        if (i === 0 || i == paragraphsList.length - 1) {
          const paragraph = i === 0 ? 'first' : 'last'
          const index = paragraph === 'first' ? toHighlight.start : toHighlight.end
          newSpan.appendChild(
            document.createTextNode(
              paragraph === 'first'
                ? currentParagraph?.innerText!.slice(index)
                : currentParagraph?.innerText!.slice(0, index)
            )
          )
          const newParagraph: HTMLParagraphElement | null = addSpansToMultilineParagraph(
            paragraph,
            Array.from(currentParagraph.childNodes),
            newSpan,
            index
          )
          newParagraph?.setAttribute('id', `article-paragraph-${paragraphsList[i]}`)
          newParagraph?.setAttribute('class', paragraphClasses as string)
          if (newParagraph) currentParagraph.replaceWith(newParagraph)
        } else {
          const newContent = document.createTextNode(currentParagraph?.innerText!)
          newSpan.appendChild(newContent)
          currentParagraph.innerHTML = ''
          currentParagraph?.appendChild(newSpan)
        }
      }
    }
  }

  useEffect(() => {
    if (gotArticle) {
      setArticleData(article)
      getAnnotations({ url }, false)
    }
  }, [article, annotations])

  useEffect(() => {
    if (annotations && article) {
      const groupedSingleParagraphHighlights = annotations.reduce((result, annotation) => {
        const { id, paragraphs, selectedText, substringPosition, color } = annotation
        if (annotation.paragraphs.length > 1) return result
        if (!result[paragraphs[0]]) {
          result[paragraphs[0]] = {
            paragraph: paragraphs[0],
            toHighlight: []
          }
        }

        result[paragraphs[0]].toHighlight.push({
          id: id,
          substring: selectedText,
          start: substringPosition.start,
          end: substringPosition.end,
          color: color
        })

        result[paragraphs[0]].toHighlight.sort((a, b) => a.start - b.start)
        return result
      }, {})

      type HighlightElement = {
        paragraph: number
        toHighlight: {
          id: number
          substring: string
          start: number
          end: number
          color: string
        }[]
      }
      const highlightsList = Object.values(groupedSingleParagraphHighlights) as HighlightElement[]
      highlightsList.forEach((element) =>
        addSpansToSelections(element.paragraph, element.toHighlight)
      )

      annotations.forEach((annotation) => {
        if (annotation.paragraphs.length > 1) {
          addMultiParagraphSpans(annotation.paragraphs.map(Number), {
            id: annotation.id,
            start: annotation.substringPosition.start,
            end: annotation.substringPosition.end,
            color: annotation.color
          })
        }
      })
    }
  }, [articleData, annotations])

  const articleSection = (
    <article>
      <Typography styleVariant="h3" tag={Tags.h1}>
        {articleData?.header}
      </Typography>
      <Typography id={'summary'} styleVariant="body" classes={[styles.unselectable]}>
        {articleData?.summary}
      </Typography>
      {articleData?.imageURL && (
        <figure>
          <picture>
            <img src={articleData.imageURL} />
          </picture>
          {articleData?.figcaption && (
            <figcaption>
              <Typography styleVariant="caption">
                {articleData?.figcaption.replace('Credit...', ' ')}
              </Typography>
            </figcaption>
          )}
        </figure>
      )}
      {article?.paragraphs && (
        <div>
          {articleData?.paragraphs.map((paragraph, i) => (
            <Typography id={`article-paragraph-${i}`} styleVariant="body" key={i}>
              {paragraph}
            </Typography>
          ))}
        </div>
      )}
    </article>
  )

  return (
    <>
      <Header />
      <div className={styles.articlePage}>
        <Layout>
          <Button
            buttonAction={() => {navigate('/articles')}}
            variant={ButtonType.link}
            icon={IconType.chevronsLeft}
            iconVariant="start"
            iconStyle={{size: IconSize.medium, color: 'dark'}}>
            Articles
          </Button>

          <div className={styles.articleSectionWrapper}>
            {articleData && articleSection}
            {!articleData && !articleNotFound && (
              <div className={styles.loaderWrapper}>
                {!articleNotFound && (
                  <>
                    <Loader />
                    <Typography styleVariant="label">Article is loading</Typography>
                  </>
                )}
              </div>
            )}
            {articleNotFound && (
              <div className={styles.loaderWrapper}>
                <Typography styleVariant="label">Article is not avaliable.</Typography>
              </div>
            )}
            <hr />
            {!isMobile && (
              <DesktopPanel
                highlighted={highlighted}
                triggerAnnotationView={{ viewOption, setViewOption }}
              />
            )}
          </div>
        </Layout>
        {isMobile && <MobilePanel highlighted={highlighted} />}
      </div>
      {!isMobile && <Footer />}
    </>
  )
}
