const {
    obrirMongo,
    tancarMongo,
    novaTascaMongo,
    tasquesMongo,
    tascaMongo,
    esborrarTascaMongo,
    actualitzarEstatMongo
} = require('./controllersMongoDB');

const inquirer = require('inquirer');



const choicesMongo = {
    "Crear una nova tasca": ()=> crearNovaTasca(),
    "Llistar totes les tasques": ()=> mostrarTasques(),
    "Llistar una tasca": ()=> llistarTasca(),
    "Actualitzar l'estat d'una tasca": ()=> actualitzarTasca(),
    "Esborrar una tasca": async ()=> esborrarTasca()
    //"Tornar al menú principal": ()=>menuInit()
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
            message: `\nEscriu la data d'inici de la tasca\n` //Dates per defecte
          },
          {
            type: 'input',
            name: 'dataFinal',
            message: `\nEscriu la data de finalització de la tasca\n`
          }
    ];

    inquirer.prompt(preguntesNovaTasca)
    .then(answers => novaTascaMongo(answers.nomUsuari, answers.nomNovaTasca, answers.dataInici, answers.dataFinal))
    .then(tasca => console.log("Creada nova tasca:\n", tasca))
    .then(whatNow);
}
//actualitzat fins aquí
async function mostrarTasques() {

    let tasques = await Task.find();
    tasques = tasques.map(x => x.toObject());
    console.log(tasques);
    let noms = tasques.map(x => x.nom);
    console.log(noms);
    whatNow();
}

async function llistarTasca() {

    let nomTasques = await Task.find();
    nomTasques = nomTasques.map(x => x.nom);
    if (nomTasques.lenght == 0){
        console.log('No hi ha tasques');
        return whatNow();
    }

    inquirer.prompt({
        type: 'list',
        name: 'escullTasca',
        message: 'Quina tasca vols veure amb detall?',
        choices: nomTasques
    })
    .then(answer => Task.findOne({nom:answer.escullTasca},{_id:0, __v:0}))
    .then(tasca => console.log(tasca))
    .then(() => whatNow());
}

async function esborrarTasca() {
    
    let nomTasques = await Task.find();
    nomTasques = nomTasques.map(x => x.nom);
    if (nomTasques.lenght == 0){
        return console.log('No hi ha tasques');
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
            name: 'segur',
            message: 'estàs segur de voler esborrar la tasca?',
            default: false
        }
    ];

    inquirer.prompt(preguntesEsborrar)
    .then(answers => {
        if(!answers.segur) {
            console.log("No s'ha esborrat la tasca.");
            return whatNow();
        }
        let tascaEsborrada = Task.findOneAndDelete({nom:answers.llistaTasca});
        console.log("Tasca esborrada:", tascaEsborrada);
        whatNow();
    });
}

async function actualitzarTasca() {

    let nomTasques = await Task.find();
    nomTasques = nomTasques.map(x => x.nom);
    if (nomTasques.lenght == 0){
        console.log('No hi ha tasques');
        return whatNow();
    }

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
    .then(answer => Task.findOneAndUpdate({nom:answer.llistaTasca}, {estat:answer.estat}))
    .then(tasca => console.log(`Document abans de actualitzar:\n`, tasca))//Document actualitzat???
    .then(() => whatNow());
}

async function whatNow() {
    inquirer.prompt(
        {
            type: 'list',
            name: 'response',
            message: `\nQuè vols fer ara?\n`,
            choices: ['Tornar al menú', 'Sortir']
        }
    ).then(({ response }) => {
        console.log();
        if ((response) === 'Tornar al menú') {
            mongoMenu();
        }
        if ((response) === 'Sortir') {
            mongoose.disconnect('mongodb://localhost:27017/devteamadv');
            console.log('Adéu!');
        }
    });
}
obrirMongo();
mongoMenu();