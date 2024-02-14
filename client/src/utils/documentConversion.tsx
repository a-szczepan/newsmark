export const addSpansToMultilineParagraph = (
  paragraph: 'first' | 'last',
  children: Node[],
  newSpan: Node,
  index: number
): HTMLParagraphElement | null => {
  const newParagraph = document.createElement('p');
  // if (
  //   children.length === 1 &&
  //   children[0].nodeType === Node.TEXT_NODE
  // ) {
  //   return null;
  // }
  if (children.length > 0) {
    if (paragraph === 'first') {
      let positionCounter = 0;

      children?.forEach((element: Node) => {
        const textLen: number = element?.textContent?.length!;
        if (positionCounter + textLen < index) {
          positionCounter += textLen;
          newParagraph.appendChild(element);
        } else {
          element.textContent = element?.textContent?.slice(
            0,
            index - positionCounter
          )!;
          newParagraph.append(element);
          newParagraph.appendChild(newSpan);
          positionCounter +=
            element.textContent.length + newSpan?.textContent?.length!;
        }
      });

      return newParagraph;
    }
    if (paragraph === 'last') {
      let sliceRange: number = index;
      newParagraph.appendChild(newSpan);
      children.forEach((element: Node) => {
        const textLen: number = element.textContent?.length!;
        if (sliceRange > 0)
          element.textContent = element.textContent?.slice(
            sliceRange,
            textLen - 1
          )!;
        newParagraph.append(element);
        sliceRange -= textLen;
      });
      return newParagraph;
    }
  }
  return null;
};
