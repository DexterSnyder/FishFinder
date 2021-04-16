const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");


const Location = sequelize.define("StockedEvent", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  waterName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  county: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Location;