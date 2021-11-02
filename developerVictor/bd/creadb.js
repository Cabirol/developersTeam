const mysql = require('mysql2');
const sequelize = require('./dbc');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: '1234'
});

conexion.connect(error => {
    if (error) throw error;
    console.log('Conexion Ok...');
});
conexion.query('CREATE DATABASE IF NOT EXISTS dbmysql', (error) => {
    if (error) throw error;
    console.log('Dase de datos ok..');
});

sequelize.sync()
    .then(() => {
        console.log('Tablas ok...');
    })
    .catch(err => {
        console.log('error', err);
    })
conexion.end();




