let {id_generator, db} = require('./persistencia.json')
const fs = require('fs')


function Task (nomTasca, usuari, dataInici, dataFinal){
  this.nomTasca = nomTasca,
  this.usuari = usuari,
  this.estat = 'pendiente',
  this.dataInici = dataInici,
  this.dataFinal = dataFinal
  this.Id = id_generator.length
}


const save = async (newData)=>{
  const formatedData = JSON.stringify(newData)
  await fs.writeFile(`${__dirname}/persistencia.json`, formatedData, err => {
    if(err) throw err;
  })
  return true
}

const createTask = ({nomTasca, usuari, dataInici, dataFinal}) => {


  const newTask =  new Task(
    nomTasca, 
    usuari, 
    dataInici, 
    dataFinal
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

const listTasks = () => {
  console.table(db)
}

const listOne = ({id}) =>{
  const task = db.find(task => task.Id == id)
  console.table(task)
}

const updateTaskState = ({id,newState}) =>{
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
    listOne({id})
  }
}

const deleteTask = ({id}) =>{
  const newDB = db.filter(task => task.Id != id)
  db = [...newDB]
  const allDB = {
    id_generator:id_generator,
    db:newDB
  }
  const success = save(allDB)
  if(success){
    console.log('Task deleted')
    console.table(db)
  }
}






module.exports = {
  createTask,
  listTasks,
  listOne,
  updateTaskState,
  deleteTask
}