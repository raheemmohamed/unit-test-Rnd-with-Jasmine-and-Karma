var JsonDB = require('node-json-db');
var db = new JsonDB("myDataBase", true, false);
var {Scheme} = JsonDB;

var studentModel = new Scheme({
    id:  {type:Number} ,
    student_name: {type:String},
    address: {type:String} ,
    mobile: {type:String} ,
    email:  {type:String},
    courseId: {type:Number}
});

module.exports = db.studentModel('student');