const Sequelize = require('sequelize');

const Tarea = require('./tarea');

async function creat(tarea){
    try{
        console.log('Crear tarea...', tarea);
        await Tarea.create(tarea);
        console.log('Tarea creada'); 
    }catch(err){ console.log(err)}    
}

async function findAll(){
    try{
        console.log('Buscando tareas...');
        const tareas = await Tarea.findAll();
        if(tareas.length == 0){            
            console.log('No hay tareas');
        } else{
            tareas.forEach(tarea => {
                console.table(tarea.toJSON());            
            });
        }

    }catch(err){ console.log(err)}
}

async function findOne(id){
    try{
        console.log('Buscando tarea...');
        const tarea = await Tarea.findByPk(id);
        if(tarea){
           console.table(tarea.toJSON());
        } else {
            console.log('Tarea no encontrada');
        }  
    }catch(err){ console.log(err)}  
}

async function upDat(tarea){
    try{
        console.log('Buscando tarea...', tarea);
        const tareaId  = await Tarea.findByPk(tarea.id);  
        if(tareaId){
            await Tarea.update({estado: tarea.estado},{where:{id: tarea.id }})
            console.log('Tarea actualizada');
        } else {
            console.log('Tarea no existe');
       }
       
    }catch(err){ console.log(err)}
}

async function delet(id){
    try{
        const tarea  = await Tarea.findByPk(id);
        if(tarea){
            await Tarea.destroy({ where: { id: id}})
            console.log('Tarea eliminada');
        } else {
            console.log('Tarea no existe');
        }    
    }catch(err){ console.log(err)}    
}

module.exports = { findAll, findOne, creat, delet, upDat }


