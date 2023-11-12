const jsdom = require("jsdom");
const { JSDOM } = jsdom;

exports.parseHTML = (document) => {
  const dom = new JSDOM(document);
  const header = dom.window.document.querySelector("h1")?.textContent;
  const summary =
    dom.window.document.getElementById("article-summary")?.textContent;

  const imageContainer = dom.window.document.querySelector(
    'div[data-testid="photoviewer-wrapper"]'
  );
  const imageURL = imageContainer
    .querySelector("picture source")
    .getAttribute("srcset");
  const figcaption = imageContainer.querySelector("figcaption")?.textContent;

  const paragraphs = dom.window.document
    .querySelector('section[name="articleBody"]')
    .querySelectorAll("p");

  const paragraphsArray = Array.from(paragraphs).map(
    (paragraph) => paragraph?.textContent
  );

  return {
    header,
    summary,
    imageURL,
    figcaption,
    paragraphs: paragraphsArray,
  };
};
