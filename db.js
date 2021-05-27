const Sequelize = require('sequelize');
const { DataTypes:{STRING, INTEGER, UUID, UUIDV4} } = Sequelize;

const conn = new Sequelize('postgres://localhost/school_db' );

const data = {
  schools: ['IONA', 'NYU', 'Mount Saint Mary', 'Boston College'],
  lectures: ['Programming', 'Finance', 'Bio', 'Life'], 
  students: ['Heinnssin', 'James', 'Denise', 'Janine']
}


const School = conn.define('school', {
  id: {
    primaryKey: true, 
    type: UUID,
    defaultValue: UUIDV4 
  },   
  name: {  
    type: STRING,   
    allowNull: false, 
  },
})

const Lecture = conn.define('lecture', {
  id: {
    primaryKey: true, 
    type: UUID,
    defaultValue: UUIDV4 
  }, 
  name: {
    type: STRING, 
    allowNull: false
  }
})

const Student = conn.define('student', {
  id: {
    primaryKey: true, 
    type: UUID,
    defaultValue: UUIDV4 
  }, 
  name: {
    type: STRING, 
    allowNull: false
  }
})

Lecture.belongsTo(School)
Lecture.belongsTo(Student)
// Lecture.belongsTo(Lecture, {as: 'segue'})

Student.hasMany(Lecture)
School.hasMany(Lecture)




const syncAndSeed = async() => {
  try {
    await conn.sync( {force: true}),
    data.schools.map( school => School.create({name: school}))
    data.lectures.map( lecture => Lecture.create({name: lecture}))
    data.students.map( student => Student.create({name: student}))
  //const results  = await Promise.all([schools, teachers, students])
  } catch (ex){
    console.log(ex)
  }
  
}


module.exports = {
  conn, 
  syncAndSeed, 
  models: {
    School, 
    Lecture, 
    Student
  }
}