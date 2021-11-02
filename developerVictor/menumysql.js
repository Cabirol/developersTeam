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
    name: 'estado',
    message: 'Ingrese el estado',
    default: 'pendiente'
  },
]

const inpuTarea = async () => {
  //console.clear();
  console.log('==========================');
  console.log('  Crear Tarea  ');
  console.log('==========================\n');

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
  //console.clear();
  console.log('==========================');
  console.log('  Listar una Tarea  ');
  console.log('==========================\n');

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
    name: 'estado',
    message: 'Ingrese el estado',
    default: 'pendiente'
  }
]
const idUpdate = async () => {
  console.log('==========================');
  console.log('  Actualizar una Tarea  ');
  console.log('==========================\n');

  const tarea  = await inquirer.prompt(question1);
  await Tareas.upDat(tarea);
}

const idDelete = async () => {
  console.log('==========================');
  console.log('  Eliminar una Tarea  ');
  console.log('==========================\n');

  const { id } = await inquirer.prompt(question);
  console.log(id);
  await Tareas.delet(id);
}



module.exports = mysqlMenu


