//import express
var express = require('express');
//import exporess router fnc
var router = express.Router();
//import a mock node-json-db 
var JsonDB = require('node-json-db');
path = require('path');
//create new object and define path
var db = new JsonDB( path.join(__dirname,"../db/myDataBase.json"), true, true);

//get all data
router.get('/student', function(req, res){

    // res.send(path.join(__dirname,"../db/myDataBase.json"));
  //get all data from student json object
   var studentData = db.getData('/student');
 //studentData not true
   if(!studentData){
       res.send('Not a student records');
   }
   //show all studentData as json format
   res.json(studentData);
});

//get all data
router.get('/student/:id', function(req, res){
    var studentData = db.getData('/student') || [];
    var studentId = req.params.id;

   var filterdata = studentData.filter(
       data => JSON.stringify(data.id) == studentId
    );
   res.json(filterdata);
 });

 // POST using insert a student data
 router.post('/student', function(req, res){
    var {id, student_name, address, mobile, email, courseId} = req.body;
    var newStudentData = {id, student_name,address,mobile, email, courseId };

    db.push('/student[]', {...newStudentData}, true);

    res.json(newStudentData);
 });

 // PUT using update inserted Student data
 router.put('/student/:id', function(req, res){
    var stdId = req.params.id;
    var updateRequireDatas = req.body;

    // var {id, student_name, address, mobile, email, courseId} = req.body;
    // var updateRequireDatas = {id, student_name,address,mobile, email, courseId };
    

    var studentData = db.getData('/student') || [];

    var filterdataid = studentData.findIndex(StdindexData =>
        StdindexData.id == stdId
    );     
    db.push('/student['+ filterdataid +']', updateRequireDatas, false);
    res.sendStatus(200);
 });

//delete Student Record using id
 router.delete('/student/:id', function(req, res){
    var deleteReqParamId = req.params.id;
    var studentData = db.getData('/student') || [];
    
    var id = studentData.findIndex(d => d.id == deleteReqParamId);
    db.delete('/student['+ id +']',true);
    res.sendStatus(200);

 });

module.exports = router;