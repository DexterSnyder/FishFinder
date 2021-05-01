const { Sequelize } = require('sequelize')
const getLocationModel = require('./location.model')
const getSockingEvenModel = require('./stockedEvent.model')
const getUserModel = require('./user.model')
const getSubscriptionModel = require('./stockedEvent.model')

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
// define the subscription model
db.subscriptions = getSubscriptionModel(sequelize)

// Stocking and location relationship
db.locations.hasMany(db.stockedEvents)
db.stockedEvents.belongsTo(db.locations)

// user subscription relationships
db.users.hasMany(db.subscriptions)
db.subscriptions.belongsTo(db.users)
db.locations.hasMany(db.subscriptions)
db.subscriptions.belongsTo(db.locations)

module.exports = db
