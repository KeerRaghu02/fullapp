var express = require('express');
const cors = require('cors');
const app = express();
var router = express.Router();
var { Employee } = require('../models/employee');
var ObjectId = require('mongoose').Types.ObjectId;
app.use(cors());
router.get('/', (req, res) => {
  Employee.find()
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.log('Error in retrieving:' + JSON.stringify(err, undefined, 2));
      res.status(500).json({ error: 'Error in retrieving data' });
    });
});

router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id)) 
    return res.status(400).send('No record exists for ID: ' + req.params.id);

  Employee.findById(req.params.id)
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.send(doc);
    })
    .catch((err) => {
      console.log('Error in retrieving:' + JSON.stringify(err, undefined, 2));
      res.status(500).json({ error: 'Error in retrieving data' });
    });
});

router.post('/', (req, res) => {
  var emp = new Employee({
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
  });

  emp.save()
    .then((doc) => {
      res.json(doc); // Send the saved document as a JSON response
    })
    .catch((err) => {
      console.log('Error: ' + JSON.stringify(err, undefined, 2));
      res.status(500).json({ error: 'Error while saving data' }); // Set an appropriate error status and send an error response
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) 
        return res.status(400).send('No record exists for ID: ' + req.params.id);
    var emp ={
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true })
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.json(doc);
    })
    .catch((err) => {
      console.log('Error: ' + JSON.stringify(err, undefined, 2));
      res.status(500).json({ error: 'Error while updating data' });
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) 
      return res.status(400).send('No record exists for ID: ' + req.params.id);
      
    Employee.findByIdAndRemove(req.params.id)
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({ error: 'Employee not found' });
        }
        res.send(doc);
      })
      .catch((err) => {
        console.log('Error in employee: ' + JSON.stringify(err, undefined, 2));
        res.status(500).json({ error: 'Error while deleting data' });
      });
  });
  


module.exports = router;
