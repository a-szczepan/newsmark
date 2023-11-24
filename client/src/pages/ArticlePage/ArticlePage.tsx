import { useSearchParams } from 'react-router-dom';
import {
  useGetAnnotationsQuery,
  useGetArticleQuery
} from '../../store/api/articleApi';
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

export const ArticlePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url');
  const isMobile = useWidthChecker() <= 768 ? true : false;
  const { data: fetchedAnnotations, isSuccess: gotannotations } =
    useGetAnnotationsQuery({ url });
  const { data: article, isSuccess: gotArticle } = useGetArticleQuery({
    url
  });
  const [articleData, setArticleData] = useState<ArticlePageDoc>();
  const highlighted = useHighlighter();

  useEffect(() => {
    if (gotArticle) {
      setArticleData(article);
    }
  }, [article]);

  useEffect(() => {
    if (gotannotations && article) {
      const groupedHighlights = fetchedAnnotations.reduce(
        (result, annotation) => {
          const { paragraphNumber, selectedText, substringPosition, color } =
            annotation;

          if (!result[paragraphNumber]) {
            result[paragraphNumber] = {
              paragraph: paragraphNumber,
              toHighlight: []
            };
          }

          result[paragraphNumber].toHighlight.push({
            substring: selectedText,
            start: substringPosition.start,
            end: substringPosition.end,
            color: color
          });

          result[paragraphNumber].toHighlight.sort((a, b) => a.start - b.start);
          return result;
        },
        {}
      );

      type HighlightElement = {
        paragraph: number;
        toHighlight: {
          substring: string;
          start: number;
          end: number;
          color: string;
        }[];
      };

      const highlightsList = Object.values(
        groupedHighlights
      ) as HighlightElement[];
      highlightsList.forEach((element) => {
        addSpansToSelections(element.paragraph, element.toHighlight);
      });
    }
  }, [articleData]);

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
            {!isMobile && <DesktopPanel highlighted={highlighted} />}
          </div>
        </Layout>
        {isMobile && <MobilePanel highlighted={highlighted} />}
      </div>
    </>
  );
};

function addSpansToSelections(paragraphId: number, toHighlight: any) {
  const paragraph = document.getElementById(`article-paragraph-${paragraphId}`);

  const paragraphClasses = paragraph?.getAttribute('class');
  const newParagraph = document.createElement('p');
  newParagraph.setAttribute('id', `article-paragraph-${paragraphId}`);
  newParagraph.setAttribute('class', paragraphClasses as string);

  const paragraphText = paragraph ? paragraph.textContent : '';

  function checkIndex(index) {
    return toHighlight.find((item) => item?.start === index);
  }

  let textTemp = '';
  for (let i = 0; i < paragraphText!.length; i++) {
    textTemp += paragraphText![i];
    const present = checkIndex(i + 1);
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
        //TODO
        e.stopImmediatePropagation();
        document.getElementById('test-id')?.click();

        document.getElementById('annotation-read-12')?.click();

      });
      newParagraph.appendChild(newSpan);
      i = present.end;
    }
    if (i + 1 === paragraphText!.length) {
      const newText = document.createTextNode(textTemp);
      newParagraph.appendChild(newText);
    }
  }
  paragraph?.replaceWith(newParagraph);
}
