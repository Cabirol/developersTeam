const {
    obrirMongo,
    tancarMongo,
    novaTascaMongo,
    tasquesMongo,
    tascaMongo,
    esborrarTascaMongo,
    actualitzarEstatMongo
} = require('./controllersMongoDB');
// const menuInit = require('../developerAlvaro/developerAlvaro');
 
const inquirer = require('inquirer');

async function initMongo(){

    await obrirMongo();
    mongoMenu();
}

async function mongoMenu() {

    let choicesMongo = {
        "Crear una nova tasca": ()=> crearNovaTasca(),
        "Llistar totes les tasques": ()=> mostrarTasques(),
        "Llistar una tasca": ()=> llistarTasca(),
        "Actualitzar l'estat d'una tasca": ()=> actualitzarTasca(),
        "Esborrar una tasca": async ()=> esborrarTasca(),
        "Tornar al menú principal": async () =>
        {
            await tancarMongo();
            return require('../developerAlvaro/developerAlvaro');
        }
    }

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

async function mostrarTasques() {

    console.table(await tasquesMongo());
    whatNow();
}

async function llistarTasca() {

    let nomTasques = await tasquesMongo();
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
    .then(answer => tascaMongo(answer.escullTasca))
    .then(tasca => console.log(tasca))
    .then(() => whatNow());
}

async function esborrarTasca() {
    
    let nomTasques = await tasquesMongo();
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
    .then(async (answers) => {
        if(!answers.segur) {
            console.log("No s'ha esborrat la tasca.");
            return whatNow();
        }
        let tascaEsborrada = await esborrarTascaMongo(answers.llistaTasca);
        console.log("Tasca esborrada:", tascaEsborrada);
        whatNow();
    });
}

async function actualitzarTasca() {

    let nomTasques = await tasquesMongo();
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
    .then(answer => actualitzarEstatMongo(answer.llistaTasca, answer.estat))
    .then(tasca => console.log(`Document abans de actualitzar:\n`, tasca))//Document actualitzat???
    .then(() => whatNow());
}

async function whatNow() {
    inquirer.prompt(
        {
            type: 'list',
            name: 'araque',
            message: `\nQuè vols fer ara?\n`,
            choices: ['Tornar al menú', 'Sortir']
        }
    ).then( async (answer) => {
        console.log();
        if (answer.araque === 'Tornar al menú') {
            mongoMenu();
        }
        if (answer.araque === 'Sortir') {
            await tancarMongo();
            console.log('Adéu!');
        }
    });
}
module.exports = {initMongo}
