const express = require('express')
const router = new express.Router()

router.post('/add', async (req, res) => {
	res.send({ message: 'This is how to add a user' })
})

router.post('/delete', async (req, res) => {
	res.send({ message: 'This is how to delete a user' })
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
