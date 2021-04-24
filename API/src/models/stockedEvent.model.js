const { Sequelize, DataTypes } = require('sequelize')

const getSockingEvenModel = sequelize => {
	return sequelize.define('StockedEvent', {
		id: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		species: {
			type: DataTypes.STRING,
		},
		quantity: {
			type: DataTypes.INTEGER,
		},
		avgLength: {
			type: DataTypes.DOUBLE,
		},
		date: {
			type: DataTypes.DATEONLY,
		},
	})
}

module.exports = getSockingEvenModel
