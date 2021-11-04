const mongoose = require('mongoose');
const Task = require('./modelMongoDB');

mongoose.connection.on('connected', ()=>console.log('Connectat a MongoDB'));
mongoose.connection.on('close', ()=>console.log('Desconnectat de MongoDB'));

async function obrirMongo(){
    
    await mongoose.connect('mongodb://localhost:27017/devteamadv');
}

async function tancarMongo(){

    await mongoose.disconnect('mongodb://localhost:27017/devteamadv');
}

async function novaTascaMongo(_usuari, _nom, _dataInici, _dataFinal){

    let novaTasca = await new Task({
        usuari: _usuari,
        nom: _nom,
        estat: 'pendent',
        dataInici: _dataInici,
        dataFinal: _dataFinal
    });
    novaTasca.save();
    return novaTasca;
}

async function tasquesMongo(){

    let tasques = await Task.find();
    return tasques.map(x => x.toObject());
}

async function tascaMongo(_nom){

    return await Task.findOne({nom:_nom},{_id:0, __v:0})
}

async function esborrarTascaMongo(_nom){

    return await Task.findOneAndDelete({nom:_nom});
}

async function actualitzarEstatMongo(_nom, _estat){

    return await Task.findOneAndUpdate({nom:_nom}, {estat:_estat})
}

module.exports = {
    obrirMongo,
    tancarMongo,
    novaTascaMongo,
    tasquesMongo,
    tascaMongo,
    esborrarTascaMongo,
    actualitzarEstatMongo
}