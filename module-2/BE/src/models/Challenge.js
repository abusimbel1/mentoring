const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  state: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  tasksOrder: [{type: Object,}],
  tasksStatus: [{type: Object}],
  achievementsStatus: [{type: Object}],
  owner: {type: Types.ObjectId, ref: 'User'} 
})

module.exports = model('Challenge', schema);