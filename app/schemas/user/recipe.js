var mongoose = require('mongoose');

var Schema = mongoose.Schema({
  name:{
    required: true,
    index: true,
    type: String,
  },

  description: {
    type: String,
  },

  ingredients:[{
    type: String,
  }],

  tags:[{
    type: String,
  }],

  creation: {
    type: Date,
    default: new Date(),
    required: true,
  }
});

module.exports = Schema;
