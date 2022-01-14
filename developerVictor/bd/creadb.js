const mysql = require('mysql2');
const Sequelize = require('sequelize');

//const sequelize = require('./dbc');
const config = require('../config.json');

const { host, user, password, database } = config.database;
const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

module.exports = sequelize;




