const db = require('../models')
const jwt = require('jsonwebtoken')

// Aliased here to make the code a little more intuitive
const User = db.users
const Token = db.tokens

const createUser = async user => {
	db.sequelize.sync({ alter: true })
	console.log(process.env.JWT_SECRET)

	return new Promise((resolve, reject) => {
		User.create({
			// create the user
			...user,
		})
			.then(dbUser => {
				// create the token
				Token.create({
					userId: dbUser.id,
					token: jwt.sign({ _id: dbUser.id }, process.env.JWT_SECRET),
				})
					.then(token => {
						resolve({
							id: dbUser.id,
							username: dbUser.username,
							token: token.token,
						})
					})
					.catch(err => {
						reject(err)
					})
			})
			.catch(err => {
				reject(err)
			})
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
