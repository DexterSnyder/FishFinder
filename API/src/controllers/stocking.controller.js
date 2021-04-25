const db = require('../models')
const Location = db.locations
const StockedEvent = db.stockedEvents

const createLocation = location => {
	return Location.create({
		...location,
	})
		.then(location => {
			console.log(`Created location: ${JSON.stringify(location)}`)
		})
		.catch(err => {
			console.log(`Error creating location: ${err}`)
		})
}

const createStockedEvent = (locationId, stockedEvent) => {
	return StockedEvent.create({
		locationId,
		...stockedEvent,
	})
		.then(stockedEvent => {
			console.log(
				`Created Stocked Event: ${JSON.stringify(stockedEvent)}`
			)
		})
		.catch(err => {
			console.log(`Error creating location: ${err}`)
		})
}

const findLocationByIdWithStocked = locationID => {
	return Location.findByPk(locationID, { include: ['stockedEvents'] })
		.then(location => {
			return location
		})
		.catch(err => {
			console.log('>> Error while finding tutorial: ', err)
		})
}

const findLocationById = locationID => {
	return Location.findByPk(locationID)
		.then(location => {
			return location
		})
		.catch(err => {
			console.log('>> Error while finding tutorial: ', err)
		})
}

const findStockEventById = id => {
	return StockedEvent.findByPk(id, { include: ['location'] })
		.then(stockedEvent => {
			return stockedEvent
		})
		.catch(err => {
			console.log('>> Error while finding comment: ', err)
		})
}

module.export = {
	createLocation,
	createStockedEvent,
	findLocationByIdWithStocked,
	findLocationById,
	findStockEventById,
}
