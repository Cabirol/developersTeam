/*const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
*/
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

/*
kittySchema.methods.speak = function speak() {
    const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
    console.log(greeting);
};
*/

const Task = mongoose.model('Task', taskSchema);

const silence = new Task({ nom: 'Silence' });
console.log(silence.nom); // 'Silence'
silence.save();

/*
const fluffy = new Kitten({ name: 'fluffy' });
fluffy.save();
fluffy.speak(); // "Meow name is fluffy"
*/

const CrearNovaTasca = () => {
    inquirer.prompt({
        name:'input',
        message:'Escriu el nom de la Tasca',
        default: null
    })
        .then(answer => {
            var _nom = answer.input;
    });
/*
    inquirer.prompt({
        name:'input',
        message:'Escriu usuari de la Tasca',
        default: null
    })
        .then(answer => {
            let _usuari = answer.input;
    });

    let NovaTasca = new Task({
        nom: _nom,
        usuari: _usuari,
        estat: 'pendent',
        dataInici: 'dataInici',
        dataFinal: 'dataFinal'
    });
    */
    NovaTasca.save();
}

CrearNovaTasca();