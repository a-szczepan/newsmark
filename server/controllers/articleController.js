const db = require("../database/db");
const Article = require("../models/articleModel")(db.sequelize, db.Sequelize);
const axios = require("axios");
const { parseHTML } = require("../utils/parseHTML.utils");

const findArticle = async (query) => await Article.findOne(query);

exports.getArticle = async (req, res) => {
  const url = req.query.url.replace(/[%]/g, "/");

  const article = await findArticle({
    where: { url },
  });

  if (article) {
    const articleData = { ...article };
    delete articleData.html; // remove the html property
    return res.status(200).send(articleData);
  }

  try {
    const response = await axios.get(
      `${process.env.EXTRACTOR_URL}/?apikey=${process.env.EXTRACTOR_KEY}&url=${url}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const values = (({ url, title, html }) => ({
      url,
      title,
      html,
    }))(response.data);

    const parsed = parseHTML(values.html);

    const articleData = {
      url: values.url,
      title: values.title,
      html: values.html,
      ...parsed,
    };

    const newArticle = await Article.create(articleData);

    delete newArticle.html;

    return res.status(200).send(newArticle);
  } catch (error) {
    console.error("Fetching article failed", error);
  }
};
