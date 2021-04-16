const express = require('express')
const router = new express.Router()
const { Sequelize } = require('sequelize')

// For loading the Db -----------
const fs = require('fs')
const path = require('path')
const Papa = require('papaparse')
//-------------------------------

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: '../db/database.sqlite',
})

router.get('/stocked', async (req, res) => {
	res.send({ message: 'This is where stocked info will live' })
})

router.post('/createDb', async (req, res) => {
	const stockingFolder = `${process.cwd()}/stocking_data`
	const files = await fs.promises.readdir(stockingFolder)

	// C style loop so that we can await
	for (let i = 0; i < files.length; i += 1) {
		const filePath = path.join(stockingFolder, files[i])
		let contents

		// Pass the string contents to PapaParse, and then save the json to contents
		Papa.parse(
			await fs.promises.readFile(filePath, {
				encoding: 'UTF8',
			}),
			{
				complete: results => {
					contents = results.data
				},
				header: true,
			}
		)

		console.log(contents)
	}

	res.send({ message: 'not implemented yet' })
})

module.exports = router
