const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

const getUserModel = sequelize => {
	const User = sequelize.define('User', {
		id: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	})

	User.addHook('beforeSave', async user => {
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(user.password, salt)
		user.password = hash
	})

	return User
}

module.exports = getUserModel
