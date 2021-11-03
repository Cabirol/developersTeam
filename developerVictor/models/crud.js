const Sequelize = require('sequelize');
const sequelize = require('../bd/creadb');

const Tarea = require('./tarea');

/****************************** */
async function creat(tarea){
    try{
        console.log('Crear tarea...', tarea);
        await Tarea.create(tarea);
        console.log('Tarea creada'); 
        //sequelize.close();
    }catch(err){ console.log(err)}    
}

/****************************** */
async function findAll(){
    try{
        console.log('Buscando tareas...');
        let tareasArray = [];
        const tareas = await Tarea.findAll();
        if(tareas.length == 0){    
            console.log('No hay tareas');
        } else{
            tareas.forEach(tarea => { tareasArray.push(tarea.dataValues)});
            console.table(tareasArray);
        }        
        //sequelize.close();
    }catch(err){ console.log(err)}
}

/****************************** */
async function findOne(id){
    try{
        console.log('Buscando tarea...');
        const tareasArray = [];
        const tarea = await Tarea.findByPk(id); 
        if(tarea){      
            tareasArray.push(tarea.dataValues);  
            console.table(tareasArray);            
        } else {
            console.log('Tarea no encontrada');
        }  
        //sequelize.close();
    }catch(err){ console.log(err)}  
}

/****************************** */
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
       //sequelize.close();       
    }catch(err){ console.log(err)}
}

/****************************** */
async function delet(id){
    try{
        const tarea  = await Tarea.findByPk(id);
        if(tarea){
            await Tarea.destroy({ where: { id: id}})
            console.log('Tarea eliminada');
        } else {
            console.log('Tarea no existe');
        }          
        //sequelize.close();
    }catch(err){ console.log(err)}    
}

module.exports = { findAll, findOne, creat, delet, upDat }


