const express = require('express')
const app = express();
// const {conn, syncAndseed, models:{School, Lecture, Student}} = require("./db")
const {
  conn,
  syncAndSeed,
  models: {School, Lecture, Student},
} = require("./db");



// app.use(express.urlencoded({ extened: false }));

app.get("/", async (req, res, next) => {
  try {
    const schools = await School.findAll()
    const lectures = await Lecture.findAll()
    const students = await Student.findAll()
    res.send(schools)
  }
  catch(ex){
    next(ex)
  }
}
)

const port = 3000

const init = async() => {
  try {
    await conn.sync({force: true});
    await syncAndSeed();

    await app.listen(PORT, () => {
      console.log(`Listening on ${port}`)
    })
  }
  catch(ex){
    console.log(ex)
  }
}


init();