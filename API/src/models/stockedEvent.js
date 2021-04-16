const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const Location = require('./location')

const StockedEvent = sequelize.define("StockedEvent", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  waterName: {
    type: DataTypes.STRING,
      allowNull: false,
      references: {
          model: Location,
          key: waterName
    }
  },
  county: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  species: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  avgLength: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = StockedEvent
