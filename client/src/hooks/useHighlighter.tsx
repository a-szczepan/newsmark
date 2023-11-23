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
      if (selection && selection.rangeCount >= 1) {
        const selectedText = selection.toString();

        const start = isBackwards()
          ? selection.focusOffset
          : selection.anchorOffset;
        const end = isBackwards()
          ? selection.anchorOffset
          : selection.focusOffset;

        const selectedParagraphNumber = findParagraphNumber(
          selection.anchorNode?.parentNode!
        );

        if (selectedText && selectedParagraphNumber && end)
          setHighlightedData({
            text: selectedText,
            paragraphNumber: selectedParagraphNumber,
            substringPosition: {
              start,
              end
            }
          });
      }
    };

    document.addEventListener('mouseup', saveSelection);

    return () => {
      document.removeEventListener('mouseup', saveSelection);
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

function isBackwards() {
  const selection = window.getSelection();
  let range = document.createRange();
  range.setStart(selection?.anchorNode!, selection?.anchorOffset!);
  range.setEnd(selection?.focusNode!, selection?.focusOffset!);

  let backwards = range.collapsed;
  range.detach();
  return backwards;
}
