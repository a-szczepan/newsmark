/*DEV NOTE: PlanetScale doesn't support FOREIGN KEY constraints. */

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      sessionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      googleId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    { timestamps: true }
  );

  return User;
};
