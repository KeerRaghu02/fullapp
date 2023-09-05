const express=require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { mongoose } = require('./db.js');
var employeeController=require('./controllers/employeeController.js');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.listen(3000,()=>console.log('listening on port:3000'));
app.use('/employees',employeeController);