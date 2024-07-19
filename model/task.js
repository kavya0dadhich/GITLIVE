const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/TIME_TODO",console.log("Data base is connect.."));
const TASK_MODUL =  new mongoose.Schema({
    task:String,
    time:String,
    sendMSG:Boolean,
})
module.exports = mongoose.model("task",TASK_MODUL);