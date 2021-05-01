const { Sequelize, DataTypes } = require('sequelize')

const getUserModel = sequelize => {
	const User = sequelize.define('User', {
		id: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	})

	return User
}

module.exports = getUserModel
