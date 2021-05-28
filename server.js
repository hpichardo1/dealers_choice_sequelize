const express = require('express')
const app = express();

const {
  conn,
  syncAndSeed,
  models: {School, Lecture, Student},
} = require("./db");

app.get('/lectures', async(req, res, next) => {
  try {
    const lectures = await Lecture.findAll({
      include: {
        all: true
      }
    })
    //PRACTICE PRINTING LIST
    // const html  = 
    // `
    // <h1>Lectures</h1>
    // <ul> 
    // ${lectures.map(lecture => `<li> ${lecture.name} </li> `).join('')}
    
    // </ul>
    
    // `
     res.send(lectures)
   }
   catch(ex){
     next(ex)
   }
 }
)



app.get('/schools', async(req, res, next) => {
  try {
    const schools = await School.findAll({
      include: {
        all: true
      }
    })
     res.send(schools)
   }
   catch(ex){
     next(ex)
   }
 }
)

app.get('/students', async(req, res, next) => {
  try {
    const students = await Student.findAll({
      include: {
        all: true
      }
    })
     res.send(students)
   }
   catch(ex){
     next(ex)
   }
 }
)

app.get("/", async (req, res, next) => {
  try {
   const lectures = await Lecture.findAll({
     include: {
       all: true
     }
   })
    res.send(lectures)
  }
  catch(ex){
    next(ex)
  }
}
)



const init = async() => {
  try {
    await conn.sync({force: true});
    await syncAndSeed();
    const port = 3000
    await app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  }
  catch(ex){
    console.log(ex)
  }
}


init();