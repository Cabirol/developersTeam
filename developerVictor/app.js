const menuMysql = require('./menumysql');

const creaBd = require('./bd/creanewdb')

async function mainMySQL(){

    await creaBd();
    //console.clear();
    menuMysql();

};





module.exports = mainMySQL