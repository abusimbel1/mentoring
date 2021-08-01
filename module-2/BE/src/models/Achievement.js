const {Schema, model, Types} = require('mongoose');


const schema = new Schema({
  description: { type: String, required: true, unique: true },
  icon: { type: String },
  checkComplete: { type: Object },
})

module.exports = model('Achievement', schema);