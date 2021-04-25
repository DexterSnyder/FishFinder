const express = require('express')
const router = new express.Router()

const userController = require('../controllers/user.controller')

// const User = require('../models/user.model')

router.post('/add', async (req, res) => {
	try {
		const result = await userController.createUser({
			username: req.body.username,
			password: req.body.password,
		})

		res.send({ result })
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
})

router.post('/delete', async (req, res) => {
	try {
		const result = await userController.deleteUserByUsername({
			username: req.body.username,
		})
		console.log(result)
		res.status(200).send()
	} catch (err) {
		console.log(err)
		res.status(400).send()
	}
})

router.post('/login', async (req, res) => {
	res.send({ message: 'This is how to login a user' })
})

router.post('/logout', async (req, res) => {
	res.send({ message: 'This is how to logout a user' })
})

router.patch('/update', async (req, res) => {
	res.send({ message: 'This is how to update a user' })
})

module.exports = router
