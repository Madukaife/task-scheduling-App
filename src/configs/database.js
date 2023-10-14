const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config()

const sequelize = new Sequelize(process.env.URI);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('connected sussesfully');
  } catch (error) {
    console.error('unable to connect:', error);
  }
};

module.exports = { sq: sequelize, connectDB };