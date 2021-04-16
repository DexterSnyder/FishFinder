const express = require('express')
const router = new express.Router()
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: '../db/database.sqlite'
})

router.get('/stocked', async (req, res) => {
	res.send({ message: 'This is where stocked info will live' })
})

router.post('/createDb', async (req, res) => {
	res.send({ message: 'not implemented yet' })
})

module.exports = router
