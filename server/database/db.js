const fs = require('fs')
const mysql = require('mysql2/promise')
const path = require('path')
const basename = path.basename(__filename)
const modelsDir = path.resolve() + '/models'
const { Sequelize } = require('sequelize')
const db = {}

const sequelize = new Sequelize('railway', process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false //free db deploy tier
    }
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect db: ', error)
  })

fs.readdirSync(modelsDir)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  })
  .forEach((file) => {
    const model = require(path.join(modelsDir, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
    console.log(db[modelName], 'associated', db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
