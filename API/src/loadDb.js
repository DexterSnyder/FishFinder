const fs = require('fs')
const path = require('path')
const Papa = require('papaparse')

const db = require('./models')

;(async () => {
	const stockingFolder = './stocking_data'
	const files = await fs.promises.readdir(stockingFolder)

	// Drop before we reload
	await db.sequelize.sync({ force: true })

	const map = new Map()

	const stockedEvents = []
	// C style loop so that we can await
	for (let i = 0; i < files.length; i += 1) {
		const filePath = path.join(stockingFolder, files[i])
		let events = []

		// Pass the string contents to PapaParse, and then save the json to contents
		Papa.parse(
			await fs.promises.readFile(filePath, {
				encoding: 'UTF8',
			}),
			{
				complete: results => {
					events = results.data
				},
				header: true,
				skipEmptyLines: true,
			}
		)

		// Load the contents
		events.forEach(event => {
			if (!map.has(event['Water name'])) {
				map.set(event['Water name'], {
					waterName: event['Water name'],
					county: event.County,
				})
			}

			stockedEvents.push({
				waterName: event['Water name'],
				county: event.County,
				species: event.Species,
				quantity: parseInt(event.Quantity),
				avgLength: parseFloat(event['Average length']),
				date: event['Date stocked'],
			})
		})
	}

	const idMap = new Map()

	const promises = []
	map.forEach(value => {
		promises.push(
			db.locations.create({
				...value,
			})
		)
	})
	const resolvedArray = await Promise.all(promises)
	resolvedArray.forEach(({ dataValues }) => {
		idMap.set(dataValues.waterName, dataValues.id)
	})

	for (let i = 0; i < stockedEvents.length; i++) {
		await db.stockedEvents.create({
			LocationId: idMap.get(stockedEvents[i].waterName),
			...stockedEvents[i],
		})

		if (i % 10 === 0) {
			console.log('******************')
		}
	}

	await db.sequelize.close()

	console.log('Records have been created in the database')
})()
