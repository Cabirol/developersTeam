const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    usuari: String,
    nom: String,
    estat: String,
    dataInici: String, //format data!!!
    dataFinal: String  
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;