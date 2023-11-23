module.exports = (sequelize, Sequelize) => {
  const Annotation = sequelize.define(
    "annotation",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      articleUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
      },
      selectedText: {
        type: Sequelize.STRING,
      },
      paragraphNumber: {
        type: Sequelize.INTEGER,
      },
      substringPosition: {
        type: Sequelize.JSON,
      },
      color: {
        type: Sequelize.STRING,
      },
      note: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: true }
  );

  return Annotation;
};
