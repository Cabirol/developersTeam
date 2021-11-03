/* const fs = require('fs')
const DBinit = {
  id_generator:[],
  db:[]
}
const dataToWrite = JSON.stringify(DBinit)

const initDB = () => {
fs.readdir(__dirname, (err, filenames)=>{
  if(!filenames.includes('persistencia.json')){
    fs.writeFileSync(`${__dirname}/persistencia.json`, dataToWrite)
  }
})
}

initDB() */