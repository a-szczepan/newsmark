import { useEffect, useState } from 'react';

export const useHighlighter = () => {
  const [highlightedData, setHighlightedData] = useState<{
    text: string;
    paragraphNumber: number | null;
    substringPosition: {
      start: number;
      end: number;
    };
  } | null>(null);

  useEffect(() => {
    const saveSelection = () => {
      let selection = window.getSelection();

      const anchorNode = selection?.anchorNode;
      const focusNode = selection?.focusNode;

      const multiparagraph = isMultipleParagraphsSelection(
        anchorNode!,
        focusNode!
      );

      if (multiparagraph && selection) {
        const anchorParentNode = anchorNode?.parentNode!;
        const focusParentNode = focusNode?.parentNode!;
        const selectedText = selection.toString();

        //  uncomment!!!! do not remove
        // if (selectedText && selectedParagraphNumber !== null) {
        //   setHighlightedData({
        //     text: selectedText,
        //     paragraphNumber: selectedParagraphNumber,
        //     substringPosition: findStartAndEnd(
        //       selectedText,
        //       anchorParentNode,
        //       focusParentNode
        //     )
        //   });
        // }
      } else {
        const parentNode = anchorNode?.parentNode;
        if (selection && parentNode) {
          const selectedText = selection.toString();
          const selectedParagraphNumber = findParagraphNumber(parentNode);
          const offsetDifference = getSubstringPosition(
            parentNode.textContent,
            selection?.anchorNode?.textContent
          );

          const start = isBackwards()
            ? selection.focusOffset + offsetDifference
            : selection.anchorOffset + offsetDifference;
          const end = isBackwards()
            ? selection.anchorOffset + offsetDifference
            : selection.focusOffset + offsetDifference;

          if (selectedText && selectedParagraphNumber !== null && end) {
            setHighlightedData({
              text: selectedText,
              paragraphNumber: selectedParagraphNumber,
              substringPosition: {
                start,
                end
              }
            });
          }
        }
      }
    };

    document.addEventListener('focusin', saveSelection);
    return () => {
      document.removeEventListener('focusin', saveSelection);
    };
  }, []);

  return highlightedData;
};

/* UTILS */
function isMultipleParagraphsSelection(anchorNode: Node, focusNode: Node) {
  return anchorNode?.textContent !== focusNode?.textContent;
}

function findStartAndEnd(selectedText, anchorParent, focusParent) {
  const text = isBackwards()
    ? focusParent?.textContent
    : anchorParent?.textContent;
  let subtext = selectedText.substring(0, selectedText.indexOf('\n'));
  const start = text.indexOf(subtext);
  const end = selectedText.split('').reverse().indexOf('\n');

  return {
    start,
    end
  };
}

function findParagraphs(anchorNode: Node, focusNode: Node) {
  if (
    anchorNode.nodeType === Node.ELEMENT_NODE &&
    focusNode.nodeType === Node.ELEMENT_NODE
  ) {
    const anchorElement = anchorNode as Element;
    const anchorParagraphNumber = Number(
      anchorElement.id?.replace('article-paragraph-', '')
    );
    const focusElement = focusNode as Element;
    const focusParagraphNumber = Number(
      focusElement.id?.replace('article-paragraph-', '')
    );

    const start = Math.min(anchorParagraphNumber, focusParagraphNumber);
    const end = Math.max(anchorParagraphNumber, focusParagraphNumber);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  } else {
    return null;
  }
}

function findParagraphNumber(node: Node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as Element;
    const paragraphNumber = element.id.replace('article-paragraph-', '');
    const tagName = element.nodeName.toLowerCase();
    return tagName === 'p' ? Number(paragraphNumber) : null;
  } else {
    return null;
  }
}

function getSubstringPosition(text, subText) {
  console.log(text, 'text', subText, 'subText');
  const position = text.indexOf(subText);
  return position;
}

function isBackwards() {
  const selection = window.getSelection();
  let range = document.createRange();
  range.setStart(selection?.anchorNode!, selection?.anchorOffset!);
  range.setEnd(selection?.focusNode!, selection?.focusOffset!);

  let backwards = range.collapsed;
  range.detach();
  return backwards;
}
