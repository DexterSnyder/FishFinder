const db = require('../models')
const User = db.users

const createUser = user => {
	// db.sequelize.sync({ alter: true })
	return User.create({
		...user,
	})
}

const findUserById = userId => {
	return User.findByPk(userId)
}

const findUserByName = username => {
	console.log(username)
}

const deleteUserByUsername = async ({ username }) => {
	return new Promise((resolve, reject) => {
		User.findOne({
			where: { username: username },
		})
			.then(foundUser => {
				resolve(foundUser.destroy())
			})
			.catch(err => reject(err))
	})
}

module.exports = {
	createUser,
	findUserById,
	findUserByName,
	deleteUserByUsername,
}
