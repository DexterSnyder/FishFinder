const fs = require('fs')
const path = require('path')
const Papa = require('papaparse')
const puppeteer = require('puppeteer')
const _ = require('lodash')

const db = require('./models')

;(async () => {
	const stockingFolder = './stocking_data'
	const files = await fs.promises.readdir(stockingFolder)

	// Drop before we reload
	// await db.sequelize.sync({ force: true })
	await db.locations.sync({ force: true })
	await db.stockedEvents.sync({ force: true })

	const locationsMap = new Map()

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
			if (!locationsMap.has(event['Water name'])) {
				locationsMap.set(event['Water name'], {
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

	// get 2020 data. Hopefully we can move this to a csv (gag) at some point
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto('https://dwrapps.utah.gov/fishstocking/Fish?y=2020')
	await getTableData(page, locationsMap, stockedEvents)
	await browser.close()

	// Now the fun stuff, get the current data
	// const currentBrowser = await puppeteer.launch()
	// const currentPage = await currentBrowser.newPage()
	// await currentPage.goto('https://dwrapps.utah.gov/fishstocking/Fish')
	// await getTableData(currentPage, locationsMap, stockedEvents)
	// await currentBrowser.close()

	const idMap = new Map()

	// Write to the database
	const promises = []
	locationsMap.forEach(value => {
		if (!value.waterName) {
			console.log('Missing water name')
			console.log(value)
			return
		}
		if (!value.county) {
			console.log('Missing County')
			console.log(value)
			return
		}

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

async function getTableData(page, locationsMap, stockedEvents) {
	console.log('looking for selector')
	await page.waitForSelector('#fishTable')
	console.log('found')

	const headers = await page.evaluate(() => {
		// eslint-disable-next-line no-undef
		const ths = Array.from(document.querySelectorAll('#fishTable tr th'))
		return ths.map(th => th.innerText)
	})

	let data = await page.evaluate(() => {
		// eslint-disable-next-line no-undef
		const tds = Array.from(document.querySelectorAll('#fishTable tr td'))
		return tds.map(td => td.innerText)
	})

	data = _.chunk(data, headers.length)

	console.log(locationsMap)

	data.forEach(row => {
		const record = {}
		row.forEach((cell, index) => {
			switch (headers[index]) {
				case 'Water name':
					if (!locationsMap.has(cell)) {
						locationsMap.set(cell, {
							waterName: cell,
							county: row[headers.findIndex(x => x === 'County')], // figure out which index county is
						})
					}
					record.waterName = cell
					break
				case 'County':
					record.county = cell
					break
				case 'Species':
					record.species
					break
				case 'Quantity':
					record.quantity = cell
					break
				case 'Average length':
					record.avgLength = cell
					break
				case 'Date stocked':
					record.data = cell
					break
				default:
					throw new Error('Key not found when parsing table')
			}
		})

		stockedEvents.push(record)
	})
}
