const Sequelize = require('sequelize');

const sequelize = require('../bd/creadb');

const Tarea = sequelize.define('Tarea', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tarea: {
            type: Sequelize.STRING,
            //allowNull: false,
        }, 
        usuario: {
            type: Sequelize.STRING, 
            //allowNull: false
        }, 
        estado: Sequelize.STRING,  
        dataInici: Sequelize.DATE,   
        dataFinal: Sequelize.DATE  
    }, {
        timestamps: false,
      })


module.exports = Tarea;