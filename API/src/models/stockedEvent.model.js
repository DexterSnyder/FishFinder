// const { Sequelize, DataTypes } = require('sequelize')
// const sequelize = new Sequelize({
// 	dialect: 'sqlite',
// 	storage: `${process.cwd()}/db/database.sqlite`,
// })

// // const Location = require('./location')

// const StockedEvent = sequelize.define('StockedEvent', {
// 	id: {
// 		type: DataTypes.UUID,
// 		defaultValue: Sequelize.UUIDV4,
// 		primaryKey: true,
// 		unique: true,
// 	},
// 	waterName: {
// 		type: DataTypes.STRING,
// 		// allowNull: false,
// 		//   references: {
// 		//       model: Location,
// 		//       key: waterName
// 		// }
// 	},
// 	county: {
// 		type: DataTypes.STRING,
// 		// allowNull: false,
// 	},
// 	species: {
// 		type: DataTypes.STRING,
// 		// allowNull: false,
// 	},
// 	quantity: {
// 		type: DataTypes.INTEGER,
// 		// allowNull: false,
// 	},
// 	avgLength: {
// 		type: DataTypes.DOUBLE,
// 		// allowNull: false,
// 	},
// 	date: {
// 		type: DataTypes.STRING,
// 		// allowNull: false,
// 	},
// })

// module.exports = StockedEvent

// module.exports = (sequelize, DataTypes) => {

// 	return StockedEvent
// }