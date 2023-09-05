const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/crud')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

module.exports = mongoose;
