const express = require('express')
const router = new express.Router()

const checkJwt = require('../middleware/auth')
// const { Sequelize } = require('sequelize')

// For loading the Db -----------
// const fs = require('fs')
// const path = require('path')
// const Papa = require('papaparse')
// const StockedEvent = require('../models/stockedEvent')
// //-------------------------------

// const sequelize = new Sequelize({
// 	dialect: 'sqlite',
// 	storage: '../db/database.sqlite',
// })

router.get('/stocked', async (req, res) => {
	res.send({ message: 'This is where stocked info will live' })
})

router.get('/securedStocking', checkJwt, async (req, res) => {
	res.send({ message: 'Coming from behind the firewall' })
})

// router.post('/createDb', async (req, res) => {
// 	const stockingFolder = `${process.cwd()}/stocking_data`
// 	const files = await fs.promises.readdir(stockingFolder)

// 	// Drop before we reload
// 	await StockedEvent.sync({ force: true })

// 	// C style loop so that we can await
// 	for (let i = 0; i < files.length; i += 1) {
// 		const filePath = path.join(stockingFolder, files[i])
// 		let events = []

// 		// Pass the string contents to PapaParse, and then save the json to contents
// 		Papa.parse(
// 			await fs.promises.readFile(filePath, {
// 				encoding: 'UTF8',
// 			}),
// 			{
// 				complete: results => {
// 					events = results.data
// 				},
// 				header: true,
// 				skipEmptyLines: true,
// 			}
// 		)

// 		// Load the contents
// 		events.forEach(event => {
// 			const stockEvent = StockedEvent.create({
// 				waterName: event['Water name'],
// 				county: event.County,
// 				species: event.Species,
// 				quantity: parseInt(event.Quantity),
// 				avgLength: parseFloat(event['Average length']),
// 				date: event['Date stocked'],
// 			})
// 		})

// 		// console.log(contents)
// 	}

// 	console.log('Records have been created in the database')

// 	res.send({ message: 'not implemented yet' })
// })

module.exports = router
