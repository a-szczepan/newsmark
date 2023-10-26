/*DEV NOTE: PlanetScale doesn't support FOREIGN KEY constraints. */

module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define(
    "session",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      valid: {
        type: Sequelize.BOOLEAN,
      },
      userAgent: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: true }
  );

  return Session;
};
