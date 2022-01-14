const inquirer = require('inquirer');
const sequelize = require('./bd/creadb');

const Tareas = require('./models/crud');
inquirer.registerPrompt("date", require("inquirer-date-prompt"));

const choicesJson = {
  "crear una nueva tarea": () => inTarea(),
  "listar todas las tareas": () => findTareas(),
  "listar una tarea": () => findTarea(),
  "actualizar una tarea": () => updateTarea(),
  "eliminar una tarea": () => deleteTarea(),
  "volver al menu principal": () => whatNow(),
  "salir": () => sequelize.close()
}

/****************************** */
const mysqlMenu = () => {
  console.clear();
  inquirer.prompt({
    type: 'list',
    name: 'answer',
    message: `\n elige una opcion:\n\n`,
    choices: Object.keys(choicesJson)
  })
    .then(({ answer }) => {
      choicesJson[answer]()
    })
}

/****************************** */
const whatNow = () => {
  inquirer
    .prompt({
      type:'list',
      name:'response',
      message: `\n que desea hacer? \n`,
      choices: ['volver al menu','salir']
    })
    .then(({response})=>{
      console.clear()
      if( (response) === 'volver al menu'){
        mysqlMenu()
      }
      if( (response) === 'salir'){
        sequelize.close();
      }
    })
}


const questionsInTask = [
  {
    name: 'tarea',
    message: 'Ingrese tarea'
  },
  {
    name: 'usuario',
    message: 'Ingrese usuario',
  },
  {
    type: 'list',
    name: 'estado',
    message: 'Estado de la tarea?',
    choices: ['pendiente', 'ejecucion', 'finalizada'],
    dafault: 'pendiente'
  },
  {
    type: 'date',
    name: 'dataInici',
    message: 'Fecha de inicio',
  },
  {
    
    type: 'date',
    name: 'dataFinal',
    message: 'Fecha finalizacion',  
  },
]

const questionUpdate = [
  {
    name: 'id',
    message: 'Ingrese Id tarea'
  },
  {
    type: 'list',
    name: 'estado',
    message: 'Estado de la tarea?',
    choices: ['pendiente', 'ejecucion', 'finalizada'],
    default: 'finalizada'
  },
]

const questionId = [
  {
    name: 'id',
    message: 'Ingrese Id tarea'
  }
]

/****************************** */
const inTarea = async() => {
  const tarea = await inquirer.prompt(questionsInTask);
  await Tareas.creat(tarea);
  whatNow();
}

/****************************** */
const findTareas = async() => {
  await Tareas.findAll();
  whatNow();
}

/****************************** */
const findTarea = async() => {
  const { id } = await inquirer.prompt(questionId);
  await Tareas.findOne(id);
  whatNow();
}

/****************************** */
const updateTarea = async() => {
  const tarea  = await inquirer.prompt(questionUpdate);
  await Tareas.upDat(tarea);
  whatNow();
}

/****************************** */
const deleteTarea = async() => {
  const { id } = await inquirer.prompt(questionId);
  await Tareas.delet(id);
  whatNow();
}

module.exports = mysqlMenu


