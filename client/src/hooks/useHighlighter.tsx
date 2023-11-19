import { useEffect, useState } from 'react';

export const useHighlighter = () => {
  const [highlightedText, setHighlightedText] = useState('');

  useEffect(() => {
    const saveSelection = () => {
      const selection = window.getSelection();
      if (selection) {
        const selectedText = selection.toString();
        setHighlightedText(selectedText);
      }
    };

    document.addEventListener('mouseup', saveSelection);

    return () => {
      document.removeEventListener('mouseup', saveSelection);
    };
  }, []);

  return highlightedText;
};
