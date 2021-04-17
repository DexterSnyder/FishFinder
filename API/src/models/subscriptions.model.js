const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('sqlite::memory:')

const Subscriptions = sequelize.define('Subscription', {
	id: {
		type: DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
		unique: true,
	},
	userId: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	locationId: {
		type: DataTypes.UUID,
		allowNull: false,
	},
})

module.exports = Subscriptions
