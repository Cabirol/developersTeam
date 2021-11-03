const inquirer = require('inquirer');

const Tareas = require('./models/crud');

const choicesJson = {
  "crear una nueva tarea": () => inpuTarea(),
  "listar todas las tareas": () => Tareas.findAll(),
  "listar una tarea": () => idTarea(),
  "actualizar una tarea": () => idUpdate(),
  "eliminar una tarea": () => idDelete(),
  "volver al menu principal": () => console.log('Volver menu principal')
}

const mysqlMenu = () => {
  
  inquirer.prompt({
    type: 'list',
    name: 'answer',
    message: `\nelige una opcion:\n\n`,
    choices: Object.keys(choicesJson)
  })
    .then(({ answer }) => {
      choicesJson[answer]()
    })
}


const questions = [
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
  },
  {
    name: 'dataInici',
    message: 'Fecha de inicio',
    default: new Date()
  },
  {
    name: 'dataFinal',
    message: 'Fecha finalizacion',
    default: new Date()    
  },
]

const inpuTarea = async () => {
  const tarea = await inquirer.prompt(questions);
  console.log(tarea);
  await Tareas.creat(tarea);
}

const question = [
  {
    name: 'id',
    message: 'Ingrese Id tarea'
  }
]
const idTarea = async () => {
  const { id } = await inquirer.prompt(question);
  console.log(id);
  await Tareas.findOne(id);
}

const question1 = [
  {
    name: 'id',
    message: 'Ingrese Id tarea'
  },
  {
    type: 'list',
    name: 'estado',
    message: 'Estado de la tarea?',
    choices: ['pendiente', 'ejecucion', 'finalizada'],
  },
]

const idUpdate = async () => {
  const tarea  = await inquirer.prompt(question1);
  await Tareas.upDat(tarea);
}

const idDelete = async () => {
  const { id } = await inquirer.prompt(question);
  console.log(id);
  await Tareas.delet(id);
}

module.exports = mysqlMenu
// mysqlMenu();

