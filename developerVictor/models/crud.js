const Sequelize = require('sequelize');

const Tarea = require('./tarea');

async function creat(tarea){
    try{
        console.log('Crear tarea...');
        await Tarea.create(tarea);
        console.log('Tarea creada'); 
    }catch(err){ console.log(err)}    
}

async function findAll(){
    try{
        console.log('Buscando tareas...');
        const tareas = await Tarea.findAll();
        console.log('Listado de  tareas: ', tareas);
    }catch(err){ console.log(err)}
}

async function findOne(id){
    try{
        console.log('Buscando tarea...');
        const tarea = await Tarea.findByPk(id);
        if(tarea){
            console.log(tarea);
        } else {
            console.log('Tarea no existe');
        }  
    }catch(err){ console.log(err)}  
}
async function upDat(tarea){
    try{
        console.log('Buscando tarea...', tarea);
        const tareaId  = await Tarea.findByPk(tarea.id);
        if(tareaId){
            console.log('Tarea actualizada');
        } else {
            console.log('Tarea no existe');
        }    
    }catch(err){ console.log(err)}
}


async function delet(id){
    try{
        const tarea  = await Tarea.findByPk(id);
        if(tarea.id){
            await Tarea.update(tarea)
            console.log('Tarea actualizada');
        } else {
            console.log('Tarea no existe');
        }    
    }catch(err){ console.log(err)}
    console.log('Buscando tarea...');
}

module.exports = { findAll, findOne, creat, delet, upDat }


