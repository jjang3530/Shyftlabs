const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(bodyparser.json());

//DB Connection - MySQL
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'jay2736',
    database:'shyftlabs',
    port:3306
});

// check database connection
db.connect(err=>{
    if (err) {console.log(err, 'db err');}
    console.log('databse connected ...;')
});

//get all Students
app.get('/students',(req,res)=>{
    let qr = `select * from students`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        if(result.length>0){
            res.send({
                message: 'All students data',
                data:result
            });
        }
    });
});

//create a student data
app.post('/students',(req,res)=>{
    let firstname = req.body.firstName;
    let familyname = req.body.familyName;
    let dob = req.body.dateOfBirth;
    let qr = `insert into students(firstName, familyName, dateOfBirth) values('${firstname}','${familyname}','${dob}')`;
    db.query(qr,(err,result)=> {
        if(err){
            console.log(err);
        }
        res.send({
            message: 'student created'
        })
    });
});

//get all Courses
app.get('/courses',(req,res)=>{
    let qr = `select * from courses`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        if(result.length>0){
            res.send({
                message: 'All courses data',
                data:result
            });
        }
    });
});

//create a course data
app.post('/courses',(req,res)=>{
    let courseName = req.body.courseName;
    let qr = `insert into courses(courseName) values('${courseName}')`;
    db.query(qr,(err,result)=> {
        if(err){
            console.log(err);
        }
        res.send({
            message: 'Course created'
        })
    });
});

//get all Results data
app.get('/results',(req,res)=>{
    let qr = `select * from results`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        if(result.length>0){
            res.send({
                message: 'All results data',
                data:result
            });
        }
    });
});

//create a result data
app.post('/results',(req,res)=>{
    let course = req.body.course;
    let student = req.body.student;
    let score = req.body.score;
    let qr = `insert into results(course, student, score) values('${course}','${student}','${score}')`;
    db.query(qr,(err,result)=> {
        if(err){
            console.log(err);
        }
        res.send({
            message: 'results created'
        })
    });
});

app.listen(3000, () => {
    console.log('server running...');
})