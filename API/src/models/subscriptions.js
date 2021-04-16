const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const Subscriptions = sequelize.define("StockedEvent", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  locationId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Subscriptions;
