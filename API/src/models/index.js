const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: `${process.cwd()}/db/database.sqlite`,
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.stockedEvents = sequelize.define('StockedEvent', {
	id: {
		type: DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
		unique: true,
	},
	species: {
		type: DataTypes.STRING,
		// allowNull: false,
	},
	quantity: {
		type: DataTypes.INTEGER,
		// allowNull: false,
	},
	avgLength: {
		type: DataTypes.DOUBLE,
		// allowNull: false,
	},
	date: {
		type: DataTypes.STRING,
		// allowNull: false,
	},
})

db.locations = sequelize.define('Location', {
	id: {
		type: DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	waterName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	county: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

db.locations.hasMany(db.stockedEvents)
db.stockedEvents.belongsTo(db.locations)

module.exports = db
