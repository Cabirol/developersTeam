const initDB = require('./initDB')

const inquirer = require('inquirer')
const {
  createTask,
  listTasks,
  listOne,
  updateTaskState,
  deleteTask
} = require('./controllersJson')
const initMongo = require('../developerDani/appMongo')

const choicesDB = {
  "mongoDB": ()=> initMongo(),
  "mysql" : ()=> console.log('mysql'),
  "json" : ()=> jsonMenu()
}
const choicesJson={
  "crear una nueva tarea": ()=> createTaskMenu(),
  "listar todas las tareas": ()=>
  {
    listTasks()
    whatNow()
  },
  "listar una tarea": ()=> listOneMenu(),
  "actualizar el estado de una tarea": ()=> updateTaskMenu(),
  "borrar una tarea": ()=>deleteMenu(),
  "volver al menu principal": ()=>menuInit()
}

const createQuestions = [
  {
    type: 'input',
    name: 'usuari',
    message: `\n introduce tu nombre:\n`
  },
  {
    type: 'input',
    name: 'nomTasca',
    message: `\nintroduce el nombre de tu tarea:\n`
  },
  {
    type: 'input',
    name: 'dataInici',
    message: `\nintroduce la fecha de inicio de la tarea:\n`
  },
  {
    type: 'input',
    name: 'dataFinal',
    message: `\nintroduce la fecha en que se finalizara con la tarea:\n`
  }
]
const listOneMenu = () => {
  inquirer
    .prompt({
      type:'input',
      name:'id',
      message:`\nintroduce la id de la tarea:\n`
    })
    .then(answer=> listOne(answer))
    .then(()=>whatNow())
    
    /* .then(answer => console.log(answer)) */
}

const whatNow = () => {
  inquirer
    .prompt({
      type:'list',
      name:'response',
      message: `\nque desea hacer?\n`,
      choices:['volver al menu','salir']
    })
    .then(({response})=>{
      console.log()
      if( (response) === 'volver al menu'){
        jsonMenu()
      }
      if( (response) === 'salir'){
        exit()
      }
    })
}

const createTaskMenu = () => {
  inquirer
    .prompt(createQuestions)
    .then(answer => createTask(answer))
    .then(()=> whatNow())
}

const deleteMenu = () => {
  inquirer
    .prompt({
      type:'input',
      name:'id',
      message:`\nintroduce la id de la tarea para borrar:\n`
    })
  .then(answer=> deleteTask(answer))
  .then(()=>whatNow())
}

const updateTaskMenu = () => {
  inquirer
    .prompt([
      {
      type:'input',
      name:'id',
      message:`\nintroduce la id de la tarea:\n`
    },
    {
      type:'list',
      name:'newState',
      message: `\n elige el nuevo estado para la tarea:\n`,
      choices: [ 'en marcha','acabada']
    }
    ])
    .then(answer => updateTaskState(answer) )
    .then(()=>whatNow())
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

const exit = () => {
  console.log('Good Bye!!')
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

module.exports = menuInit