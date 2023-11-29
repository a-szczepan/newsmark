import { useSearchParams } from 'react-router-dom';
import { useGetArticleQuery } from '../../store/api/articleApi';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
import { Layout } from '../../components/Layout/Layout';
import { useWidthChecker } from '../../hooks/useWidthChecker';
import styles from './ArticlePage.module.scss';
import { Tags, Typography } from '../../components/Typography/Typography';
import { ArticlePageDoc } from '../../types/articles';
import { DesktopPanel, MobilePanel } from './Panel/Panel';
import { useHighlighter } from '../../hooks/useHighlighter';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { openViewModal } from '../../store/slices/viewModalSlice';
import { toggleAccordion } from '../../store/slices/accordionSlice';
import { useGetAnnotations } from '../../hooks/useGetAnnotations';

export const ArticlePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url');
  const isMobile = useWidthChecker() <= 768 ? true : false;
  const { data: article, isSuccess: gotArticle } = useGetArticleQuery({
    url
  });
  const [articleData, setArticleData] = useState<ArticlePageDoc>();
  const { annotations, getAnnotations } = useGetAnnotations();
  const highlighted = useHighlighter();
  const dispatch = useDispatch();
  const [viewOption, setViewOption] = useState(false);

  function addSpansToSelections(paragraphId: number, toHighlight: any) {
    const paragraph = document.getElementById(
      `article-paragraph-${paragraphId}`
    );
    const paragraphClasses = paragraph?.getAttribute('class');
    const newParagraph = document.createElement('p');
    newParagraph.setAttribute('id', `article-paragraph-${paragraphId}`);
    newParagraph.setAttribute('class', paragraphClasses as string);

    const paragraphText = paragraph ? paragraph.textContent : '';
    // console.log(toHighlight, "tohiglight")
    function checkIndex(index) {
      return toHighlight.find((item) => item?.start === index);
    }

    let textTemp = '';

    for (let i = 0; i < paragraphText!.length; i++) {
      const present = checkIndex(i);

      if (!present) {
        textTemp += paragraphText![i];
      }

      if (present) {
        const newText = document.createTextNode(textTemp);
        newParagraph.appendChild(newText);
        textTemp = '';
        const newSpan = document.createElement('span');
        newSpan.setAttribute(
          'class',
          `${classnames(styles.color, styles[present.color])}`
        );
        const newContent = document.createTextNode(
          paragraphText?.slice(present.start, present.end)!
        );
        newSpan.appendChild(newContent);
        newSpan.addEventListener('click', (e) => {
          e.stopImmediatePropagation();
          setViewOption(true);
          dispatch(openViewModal());
          dispatch(toggleAccordion(present.id));
        });
        newParagraph.appendChild(newSpan);
        i = present.end - 1;
      }
      if (i === paragraphText!.length - 1) {
        const newText = document.createTextNode(textTemp);
        newParagraph.appendChild(newText);
      }
    }
    paragraph?.replaceWith(newParagraph);
  }

  useEffect(() => {
    if (gotArticle) {
      setArticleData(article);
      getAnnotations({ url });
    }
  }, [article, annotations]);

  useEffect(() => {
    if (annotations && article) {
      const groupedHighlights = annotations.reduce((result, annotation) => {
        const { id, paragraphNumber, selectedText, substringPosition, color } =
          annotation;
        if (!result[paragraphNumber]) {
          result[paragraphNumber] = {
            paragraph: paragraphNumber,
            toHighlight: []
          };
        }

        result[paragraphNumber].toHighlight.push({
          id: id,
          substring: selectedText,
          start: substringPosition.start,
          end: substringPosition.end,
          color: color
        });

        result[paragraphNumber].toHighlight.sort((a, b) => a.start - b.start);
        return result;
      }, {});

      type HighlightElement = {
        paragraph: number;
        toHighlight: {
          id: number;
          substring: string;
          start: number;
          end: number;
          color: string;
        }[];
      };
      const highlightsList = Object.values(
        groupedHighlights
      ) as HighlightElement[];
      highlightsList.forEach((element) =>
        addSpansToSelections(element.paragraph, element.toHighlight)
      );
    }
  }, [articleData, annotations]);

  const articleSection = (
    <article>
      <Typography styleVariant="h3" tag={Tags.h1}>
        {articleData?.header}
      </Typography>
      <Typography
        id={'summary'}
        styleVariant="body"
        classes={[styles.unselectable]}
      >
        {articleData?.summary}
      </Typography>
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
            <Typography
              id={`article-paragraph-${i}`}
              styleVariant="body"
              key={i}
            >
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
          <div className={styles.articleSectionWrapper}>
            {articleData && articleSection}
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
    </>
  );
};
