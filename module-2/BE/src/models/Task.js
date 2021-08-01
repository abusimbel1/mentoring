const {Schema, model } = require('mongoose');

const schema = new Schema({
  description: { type: String, required: true, unique: true },
})

module.exports = model('Task', schema);