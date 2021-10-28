const {id_generator, db} = require('./persistencia.json')
const fs = require('fs')


function Task (nomTasca, usuari, estat, dataInici, dataFinal){
  this.nomTasca = nomTasca,
  this.usuari = usuari,
  this.estat = estat,
  this.dataInici = dataInici,
  this.dataFinal = dataFinal
  this.Id = id_generator.length
}


const save = (newData)=>{
  const formatedData = JSON.stringify(newData)
  fs.writeFile('./persistencia.json', formatedData, err => {
    if(err) throw err;
  })
  return true
}

const createTask = (task) => {
  const newTask =  new Task(
    task.nomTasca, 
    task.usuari, 
    task.estat, 
    task.dataInici, 
    task.dataFinal
    )
  id_generator.push('task')
  db.push(newTask)
  const allDB = {
    id_generator:id_generator,
    db:db
  }
  const success = save(allDB)
  if(success){
    console.log('New task added')
  }
}
// createTask({nomTasca:'limpiar', usuari:'alvar', estat:'sinhacer', dataInici:'hoy', dataFinal:'mañana'})

const listTasks = () => {
  console.table(db)
}

const listOne = (id) =>{
  const task = db.find(task => task.Id == id)
  console.table(task)
}

const updateTaskState = (id,newState) =>{
  
  db.forEach(task => {
    if(task.Id==id){
      task.estat = newState
    }
  })
  const allDB = {
    id_generator:id_generator,
    db:db
  }
  const success = save(allDB)
  if(success){
    console.log('Task updated')
  }
}
// updateTaskState(5,'acabada')

const deleteTask = (id) =>{
  const newDB = db.filter(task => task.Id != id)
  const allDB = {
    id_generator:id_generator,
    db:newDB
  }
  const success = save(allDB)
  if(success){
    console.log('Task deleted')
  }
}


module.exports = {
  createTask,
  listTasks,
  listOne,
  updateTaskState,
  deleteTask
}