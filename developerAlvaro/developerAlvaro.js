const dbJson = require('./persistencia.json')
const inquirer = require('inquirer')
const {
  createTask,
  listTasks,
  listOne,
  updateTaskState,
  deleteTask
} = require('./controllersJson')

const choicesDB = {
  "mongoDB": ()=> console.log('mongodb'),
  "mysql" : ()=> console.log('mysql'),
  "json" : ()=> jsonMenu()
}
const choicesJson={
  "crear una nueva tarea": ()=>console.log('create'),
  "listar todas las tareas": ()=> console.log('read'),
  "listar una tarea": ()=> console.log('readOne'),
  "actualizar una tarea": ()=> console.log('update'),
  "dar por acabada y borrar una tarea": ()=>console.log('delete'),
  "volver al menu principal": ()=>menuInit()
}




const jsonMenu = () => {
  inquirer.prompt({
    type:'list',
    name:'answer',
    message:`\nelige una opcion:\n\n`,
    choices:Object.keys(choicesJson)
  })
    .then(({answer}) =>{
      choicesJson[answer]()
    })
}


const menuInit = () => {

inquirer.prompt({
  type:'list',
  name:'answer',
  message:`\nelige un metodo de persistencia de datos?\n\n`,
  choices: Object.keys(choicesDB)
})
  .then( ({answer}) =>{
    choicesDB[answer]()
  }
  )
}


menuInit()