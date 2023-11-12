module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define(
    "article",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      url: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      header: {
        type: Sequelize.STRING,
      },
      summary: {
        type: Sequelize.STRING,
      },
      imageURL: {
        type: Sequelize.STRING,
      },
      figcaption: {
        type: Sequelize.STRING,
      },
      paragraphs: {
        type: Sequelize.JSON,
      }
    },
    { timestamps: true }
  );

  return Article;
};
