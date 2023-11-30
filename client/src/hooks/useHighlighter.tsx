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
      const selection = window.getSelection();
      const anchorNode = selection?.anchorNode;
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
    };

    document.addEventListener('focusin', saveSelection);
    return () => {
      document.removeEventListener('focusin', saveSelection);
    };
  }, []);

  return highlightedData;
};

/* UTILS */

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
