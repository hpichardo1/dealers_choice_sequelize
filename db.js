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
Lecture.belongsTo(Lecture, {as: 'segue'})

Student.hasMany(Lecture)
School.hasMany(Lecture)

// const data = {
//   schools: ['IONA', 'NYU', 'Mount Saint Mary', 'Boston College'],
//   lectures: ['Programming', 'Finance', 'Bio', 'Life'], 
//   students: ['Heinnssin', 'James', 'Denise', 'Janine']
// }



const syncAndSeed = async() => {
  try {
    await conn.sync( {force: true})
    const [schools, lectures, students] = await Promise.all([
       Promise.all(data.schools.map( school =>  School.create({name: school}))),
       Promise.all(data.lectures.map( lecture =>  Lecture.create({name: lecture}))),
       Promise.all(data.students.map( student =>  Student.create({name: student})))
    ])
    lectures[0].schoolId = schools[0].id
    lectures[0].studentId = students[0].id
    lectures[0].segueId = lectures[1].id
    await lectures[0].save()

    lectures[1].schoolId = schools[1].id
    lectures[1].studentId = students[1].id
    lectures[1].segueId = lectures[2].id
    await lectures[1].save()

    lectures[2].schoolId = schools[3].id
    lectures[2].studentId = students[3].id
    lectures[2].segueId = lectures[3].id
    await lectures[2].save()

    lectures[3].schoolId = schools[1].id
    lectures[3].studentId = students[1].id
    lectures[3].segueId = lectures[0].id
    await lectures[3].save()


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