const express = require('express')
const router = new express.Router()

const subscriptionController = require('../controllers/subscription.controller')

router.post('/add', async (req, res) => {
	try {
		const subscription = await subscriptionController.addSubscription({
			locationId: req.body.locationId,
			email: req.body.email,
		})
		res.send({ subscription })
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
})

module.exports = router
