const db = require('../models')

// Aliased here to make the code a little more intuitive
const User = db.users

const createUser = async user => {
	// db.sequelize.sync({ force: true })

	return User.create({
		...user,
	})
}

const findUserById = userId => {
	return User.findByPk(userId)
}

const findUserByEmail = email => {
	console.log(email)
}

const deleteUserByEmail = async ({ email }) => {
	return new Promise((resolve, reject) => {
		User.findOne({
			where: { email: email },
		})
			.then(foundUser => {
				foundUser
					.destroy()
					.then(() => {
						resolve(foundUser)
					})
					.catch(err => reject(err))
			})
			.catch(err => reject(err))
	})
}

module.exports = {
	createUser,
	findUserById,
	findUserByName: findUserByEmail,
	deleteUserByUsername: deleteUserByEmail,
}
