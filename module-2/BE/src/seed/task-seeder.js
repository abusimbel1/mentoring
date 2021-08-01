const fs = require('fs');
const Task = require('../models/Task');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PORT = 3333;
async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://oleksandr:123123!!!@cluster0.7szbu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );

    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (e) {
    console.log('Server error:', e.message);
    process.exit(1);
  }
}
start();


const data = JSON.parse(fs.readFileSync('../DB/tasks.json', 'utf-8'));

const importData = async () => {
  try {
    await Task.create(data.tasks);
    console.log('Imported');
  } catch (e) {
    console.log('err', e.message)
  }
};
const deleteData = async () => {
  try {
    await Task.deleteMany();
    console.log('Deleted');
  } catch(e) {
    console.log('err', e.message)
  }
}

if(process.argv[2] == '-i') {
  importData();
} else if(process.argv[2] == '-d') {
  deleteData();
}