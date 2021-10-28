const dbJson = require('./persistencia.json')
const fs = require('fs')

const {id_generator, db} = dbJson


function Task (nomTasca, usuari, estat, dataInici, dataFinal){
  this.Id = id_generator.length
  this.nomTasca = nomTasca,
  this.usuari = usuari,
  this.estat = estat,
  this.dataInici = dataInici,
  this.dataFinal = dataFinal
}

let obj = {task:"newtask"}


db.push(obj)
id_generator.push('task')

const allJsonData = {
  id_generator: id_generator,
  db: db
}
console.log(typeof dbJson)

const newData = JSON.stringify(allJsonData)
console.log(newData)
fs.writeFile('./developerAlvaro/persistencia.json', newData, err => {
  if(err) throw err;
  console.log("New data added");
});  

const createTask = (nom) => {

}

const listTasks = () => {

}

const listOne = () =>{

}

const updateTask = () =>{

}

const deleteTask = () =>{

}

