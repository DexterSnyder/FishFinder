const { Sequelize } = require('sequelize')
const getLocationModel = require('./location.model')
const getSockingEvenModel = require('./stockedEvent.model')
const getUserModel = require('./user.model')
const getTokenModel = require('./token.model')

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: `${process.cwd()}/db/database.sqlite`,
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// define the stocking event
db.stockedEvents = getSockingEvenModel(sequelize)
// define the locations
db.locations = getLocationModel(sequelize)
// define user model
db.users = getUserModel(sequelize)
//define the jwt model
db.tokens = getTokenModel(sequelize)

// Stocking and location relationship
db.locations.hasMany(db.stockedEvents)
db.stockedEvents.belongsTo(db.locations)

// Token and user relationships
db.users.hasMany(db.tokens)
db.tokens.belongsTo(db.users)

module.exports = db
