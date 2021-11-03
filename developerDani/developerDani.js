const inquirer = require('inquirer');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/devteamadv');

const taskSchema = new mongoose.Schema({
    nom: String,
    usuari: String,
    estat: String,
    dataInici: String, //format data!!!
    dataFinal: String  
});

const Task = mongoose.model('Task', taskSchema);
//taskSchema.on('pre', funcion)

const choicesMongo = {
    "crear una nueva tarea": ()=> crearNovaTasca(),
    "listar todas las tareas": ()=>
    {
      mostrarTasques();
      //whatNow()
    },
    "listar una tarea": ()=> llistarTasca(),
    "actualizar el estado de una tarea": ()=> actualitzarTasca(),
    "borrar una tarea": ()=>esborrarTasca()/*,
    "volver al menu principal": ()=>menuInit()*/
}

function mongoMenu() {
    inquirer.prompt({
        type: 'list',
        name: 'answer',
        message: `\nEscull una opció:\n\n`,
        choices: Object.keys(choicesMongo)
    })
        .then(({answer}) => {
            choicesMongo[answer]();
        });
}

async function crearNovaTasca() {

    let preguntesNovaTasca = [
        {
            type: 'input',
            name: 'nomUsuari',
            message: "\nEscriu el nom d'usuari de la tasca\n",
        },
        {
            type: 'input',
            name: 'nomNovaTasca',
            message: '\nEscriu el nom de la nova tasca\n',
        },
        {
            type: 'input',
            name: 'dataInici',
            message: `\nEscriu la data d'inici de la tasca\n`
          },
          {
            type: 'input',
            name: 'dataFinal',
            message: `\nEscriu la data de finalització de la tasca\n`
          }
    ];

    inquirer.prompt(preguntesNovaTasca).then(answers => {
        let novaTasca = new Task({
            nom: answers.nomNovaTasca,
            usuari: answers.nomUsuari,
            estat: 'pendent',
            dataInici: answers.dataInici,
            dataFinal: answers.dataFinal
        });
        console.log('\nCreada una nova Tasca:');
        console.log(novaTasca);
        novaTasca.save();
    });

}

async function mostrarTasques() {

    let tasques = await Task.find();
    tasques = tasques.map(x => x.toObject());
    console.table(tasques);
}

async function llistarTasca() {

    let nomTasques = await Task.find();
    nomTasques = nomTasques.map(x => x.nom);
    inquirer.prompt({
        type: 'list',
        name: 'escullTasca',
        message: 'Quina tasca vols veure amb detall?',
        choices: nomTasques
    })
        .then(answer => Task.findOne({nom:answer.escullTasca},{_id:0, __v:0}))
        .then(tasca => console.log(tasca));

}

async function esborrarTasca() {
    //si no hi ha tasques avisar d'això
    let nomTasques = await Task.find();
    nomTasques = nomTasques.map(x => x.nom);
    if (nomTasques.lenght == 0){
        console.log('No hi ha tasques');

    }
    let preguntesEsborrar = [
        {
            type: 'list',
            name: 'llistaTasca',
            message: 'Quina tasca vols esborrar?',
            choices: nomTasques
        },
        {
            type: 'confirm',
            name: 'confirmar',
            message: 'estàs segur de voler esborrar la tasca?',
            default: false
        }
    ];

    inquirer.prompt(preguntesEsborrar)
    .then(answers => {
        if(!answers.confirmar) {
            return console.log("No s'ha esborrat la tasca.");
        }
        Task.findOneAndDelete({nom:answers.llistaTasca}, function(err, tasca){
            if (err) console.log(err);
            else console.log("Tasca esborrada: ", tasca);
        });
    });
}

async function actualitzarTasca() {
    let nomTasques = await Task.find();
    nomTasques = nomTasques.map(x => x.nom);
    let preguntesActualitzar = [
        {
            type: 'list',
            name: 'llistaTasca',
            message: 'Quina tasca vols actualitzar?',
            choices: nomTasques
        },
        {
            type: 'list',
            name: 'estat',
            message: 'En quin estat està la tasca?',
            choices: ['pendent', 'en execució', 'acabat']
        }
    ];
    inquirer.prompt(preguntesActualitzar)
    .then(answer => Task.updateOne({nom:answer.llistaTasca}, {estat:answer.estat}))
    .then(tasca => console.log(tasca));
}

mongoMenu();