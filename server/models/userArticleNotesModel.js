/*DEV NOTE: PlanetScale doesn't support FOREIGN KEY constraints. */

module.exports = (sequelize, Sequelize) => {
  const UserArticleNotes = sequelize.define(
    "userArticleNotes",
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
      isBookmarked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      annotations: {
        type: Sequelize.JSON,
      },
    },
    { timestamps: true }
  );

  return UserArticleNotes;
};
