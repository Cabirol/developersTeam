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

    inquirer.prompt(preguntesNovaTasca).then((answers) => {
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

const mostrarTasques = () => {
    let query = Task.find();
    query.exec(function(err,task){
        if(err) return handleError(err);
        console.log(task.map(x => x.nom));
    });
}