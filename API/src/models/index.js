const { Sequelize } = require('sequelize')
const getLocationModel = require('./location.model')
const getSockingEvenModel = require('./stockedEvent.model')

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: `${process.cwd()}/db/database.sqlite`,
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.stockedEvents = getSockingEvenModel(sequelize)
db.locations = getLocationModel(sequelize)

db.locations.hasMany(db.stockedEvents)
db.stockedEvents.belongsTo(db.locations)

module.exports = db
