const Sequelize = require('sequelize');

const sequelize = require('../bd/dbc');

const Tarea = sequelize.define('Tarea', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tarea: Sequelize.STRING,
        usuario: Sequelize.STRING,
        estado: Sequelize.STRING,       
    })


module.exports = Tarea;