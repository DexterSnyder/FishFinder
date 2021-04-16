const fs = require('fs')
const path = require('path')
const Papa = require('papaparse')
const StockedEvent = require('./models/stockedEvent')

const { sequelize } = require('./models/stockedEvent')
;(async () => {
	const stockingFolder = `${process.cwd()}/stocking_data`
	const files = await fs.promises.readdir(stockingFolder)

	// Drop before we reload
	await StockedEvent.sync({ force: true })

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

		const promises = []
		// Load the contents
		events.forEach(event => {
			promises.push(
				StockedEvent.create({
					waterName: event['Water name'],
					county: event.County,
					species: event.Species,
					quantity: parseInt(event.Quantity),
					avgLength: parseFloat(event['Average length']),
					date: event['Date stocked'],
				})
			)
		})

		console.log(`Waiting to write events for ${files[i]}`)
		await Promise.all(promises)
	}

	await sequelize.close()

	console.log('Records have been created in the database')
})()
