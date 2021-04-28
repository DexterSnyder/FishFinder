const { Sequelize, DataTypes } = require('sequelize')

const getTokenModel = sequelize => {
	const Token = sequelize.define('Token', {
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
		token: {
			type: DataTypes.STRING,
		},
	})

	return Token
}

module.exports = getTokenModel
