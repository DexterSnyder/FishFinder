const db = require('../models')

// Aliased here to make the code a little more intuitive
const User = db.users
const Subscription = db.subscriptions

const addSubscription = async ({ email, locationId }) => {
	return new Promise((resolve, reject) => {
		User.findOne({ where: { email: email } })
			.then(user => {
				// console.log(user)
				console.log('**************')
				console.log(locationId)
				console.log(user.id)
				console.log('*********************')
				Subscription.create({
					LocationId: locationId,
					UserId: user.id,
				})
					.then(sub => {
						resolve(sub)
					})
					.catch(err => reject(err))
			})
			.catch(err => reject(err))
	})
}

const deleteSubscription = ({ email, locationId }) => {
	return new Promise((resolve, reject) => {
		Subscription.findOne({
			where: {
				email,
				locationId,
			},
		})
			.then(foundSubscription => {
				foundSubscription
					.destroy()
					.then(() => {
						resolve(foundSubscription)
					})
					.catch(err => reject(err))
			})
			.catch(err => reject(err))
	})
}

module.exports = {
	addSubscription,
	deleteSubscription,
}
