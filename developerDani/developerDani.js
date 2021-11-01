const inquirer = require('inquirer');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/devteamadv');

const taskSchema = new mongoose.Schema({
    nom: String,
    usuari: String,
    estat: String,
    dataInici: String, //canviar després
    dataFinal: String  //canviar després
});

const Task = mongoose.model('Task', taskSchema);

const crearNovaTasca = () => {

    let preguntesNovaTasca = [
        {
            type: 'input',
            name: 'nomNovaTasca',
            message: 'Escriu el nom de la nova tasca',
            default: null
        },
        {
            type: 'input',
            name: 'nomUsuari',
            message: 'Escriu el nom de usuari de la tasca',
            default: null
        }
    ];

    inquirer.prompt(preguntesNovaTasca).then(answers => {
        let novaTasca = new Task({
            nom: answers.nomNovaTasca,
            usuari: answers.nomUsuari,
            estat: 'pendent',
            dataInici: 'dataInici', //canviar després
            dataFinal: 'dataFinal'  //canviar després
        });
        console.log('\nCreada una nova Tasca:');
        console.log(novaTasca);
        novaTasca.save();
    });

}

async function mostrarTasques() {

    let nomTasques = await Task.find();
    nomTasques = nomTasques.map(x => x.nom);
    console.log(nomTasques);
    //Possibilitat de preguntar si l'usuari vol veure alguna tasca amb més detall i cridar llistarTasca()
}

async function llistarTasca() {

    let nomTasques = await Task.find();
    nomTasques = nomTasques.map(x => x.nom);
    inquirer.prompt({
        type: 'list',
        name: 'llistaTasca',
        message: 'Quina tasca vols veure amb detall?',
        choices: nomTasques
    })
    .then(answer => Task.findOne({nom:answer.llistaTasca},{_id:0, __v:0}))//modificar, buscar per l'id de nomtasques enlloc de per nom
    .then(tasca => console.log(tasca));
}

async function esborrarTasca() {

    let nomTasques = await Task.find();
    nomTasques = nomTasques.map(x => x.nom);
    inquirer.prompt({
        type: 'list',
        name: 'llistaTasca',
        message: 'Quina tasca vols esborrar?',
        choices: nomTasques
    })
    .then(answer => Task.findOne({nom:answer.llistaTasca},{_id:0, __v:0}))
    .then(tasca => console.log(tasca));
}