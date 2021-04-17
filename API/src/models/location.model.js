const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require('.')

const getLocationModel = sequelize => {
	return sequelize.define('Location', {
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
}

module.exports = getLocationModel
