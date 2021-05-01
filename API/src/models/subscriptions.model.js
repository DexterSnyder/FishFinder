const { Sequelize, DataTypes } = require('sequelize')

const getSubscriptionModel = sequelize => {
	const Subscription = sequelize.define('Subscription', {
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

	return Subscription
}

module.exports = getSubscriptionModel
