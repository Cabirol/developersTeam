const menuMysql = require('./menumysql');

const creaBd = require('./bd/creadb')

async function main(){
    await creaBd;
    //console.clear();
    menuMysql();

};

main();




