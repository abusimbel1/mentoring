import express, { Application, Request, Response, NextFunction } from 'express';
var cors = require("cors")
import * as tasks from './DB/tasks.json';
const Challenge = require('./models/Challenge');
const auth = require('../middleware/auth.middleware');
import * as achievements from './DB/achievements.json';
import { startNewChallenge } from './functions/startNewChallenge';
import { getTaskForToday } from './functions/getTaskForToday';
import { getActualAchievements } from './functions/getActualAchievements';
import { getTaskArchive } from './functions/getTaskArchive';
import { Task } from './interfaces/task';
import { compleateTaskForToday } from './functions/compleateTaskForToday';
import { sheduleProcess } from './sheduler';
const bodyParser = require('body-parser'); 

const config = require('config');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json())
app.use(cors())
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/challenge', require('./routes/challenge.routes'));
const server = require('http').createServer(app);
const PORT = config.get('port') || 3333;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (e) {
    console.log('Server error:', e.message);
    process.exit(1);
  }
}


const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
  },
});


// eslint-disable-next-line no-console
const sayHello = () => console.log('Hello');

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send(tasks.tasks);
});



// app.get('/today', (req: Request, res: Response, next: NextFunction) => {
//   const challengeId: any = req.query?.challengeId;
//   const taskForToday = getTaskForToday(challengeId?.toString());

//   return res.json(taskForToday);
// });

// app.get('/achievements', (req: Request, res: Response, next: NextFunction) => {
//   const challengeId: any = req.query?.challengeId;
//   const actualAchievement = getActualAchievements(challengeId?.toString());

//   return res.json(actualAchievement);
// });

// app.get('/archive', (req: Request, res: Response, next: NextFunction) => {
//   const challengeId: any = req.query?.challengeId;
//   const taskArchieve = getTaskArchive(challengeId?.toString());

//   return res.json(taskArchieve);
// });

io.on('connection', (socked: any) => {
  console.log('User connected', socked.id);

  socked.on('taskCompleated', async (challengeId: string, taskId: string) => {

    const challenge = await Challenge.findById(challengeId);
    const updatedTaskStatus = challenge.tasksStatus.map((item: any) => {
      if(item.id === taskId) {
        item.status = {state: 'Done', updated: new Date()}
      }
      return item;
    })
    
    await Challenge.findByIdAndUpdate(challengeId, {tasksStatus: updatedTaskStatus})
    const data = 'achievements statuses...';
    io.emit('achieventsStatuses', data);
  });
});

sheduleProcess();
start();

// eslint-disable-next-line no-console
