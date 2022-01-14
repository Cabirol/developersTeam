const mysql = require('mysql2');
const sequelize = require('./creadb.js');
const config = require('../config.json');

const { host, user, password, database } = config.database;
async function creadb(){
    
    const conexion = await mysql.createConnection({ host, user, password });
    conexion.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`, function(err, result) {
        if(err) throw err;
        sequelize.sync()
        .then(console.log('\n Bd sincronizada'))
        .catch(function(err){ console.log(err)})       
    })  
    conexion.end();          
}

module.exports = creadb;