const express = require('express')
const router = new express.Router()

const userController = require('../controllers/user.controller')

router.post('/add', async (req, res) => {
	try {
		const result = await userController.createUser({
			email: req.body.email,
		})
		res.send({ result })
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
})

router.post('/delete', async (req, res) => {
	try {
		await userController.deleteUserByEmail({
			email: req.body.email,
		})
		res.status(200).send('user deleted')
	} catch (err) {
		console.log(err)
		res.status(400).send()
	}
})

router.patch('/update', async (req, res) => {
	res.send({ message: 'This is how to update a user' })
})

module.exports = router
