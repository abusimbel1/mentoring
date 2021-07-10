import express, { Application, Request, Response, NextFunction } from 'express';
// import io from 'socket.io';
// import {http} from 'http'
// import server from 'http';
import * as tasks from './DB/tasks.json';
import * as achievements from './DB/achievements.json';
import { startNewChallenge } from './functions/startNewChallenge';
import { getTaskForToday } from './functions/getTaskForToday';
import { getActualAchievements } from './functions/getActualAchievements';
import { getTaskArchive } from './functions/getTaskArchive';
import { Task } from './interfaces/task';
import { compleateTaskForToday } from './functions/compleateTaskForToday';
import { sheduleProcess } from './sheduler';

const app: Application = express();
const server = require('http').createServer(app);

const PORT = 3333;
// server.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
  },
});
// io(server, {cors: {origin: '*'}})

// eslint-disable-next-line no-console
const sayHello = () => console.log('Hello');

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send(tasks.tasks);
});

app.post('/newChallenge', (req: Request, res: Response, next: NextFunction) => {
  const defaultDuration: number = 30;
  const { duration = 30, numOfAchievements = Number(defaultDuration / 6) } =
    req.query;
  const newChallenge = startNewChallenge(
    tasks.tasks,
    achievements.achievements,
    Number(duration),
    Number(numOfAchievements)
  );

  return res.json(newChallenge);
});

app.get('/today', (req: Request, res: Response, next: NextFunction) => {
  const challengeId: any = req.query?.challengeId;
  const taskForToday = getTaskForToday(challengeId?.toString());

  return res.json(taskForToday);
});

app.get('/achievements', (req: Request, res: Response, next: NextFunction) => {
  const challengeId: any = req.query?.challengeId;
  const actualAchievement = getActualAchievements(challengeId?.toString());

  return res.json(actualAchievement);
});

app.get('/archive', (req: Request, res: Response, next: NextFunction) => {
  const challengeId: any = req.query?.challengeId;
  const taskArchieve = getTaskArchive(challengeId?.toString());

  return res.json(taskArchieve);
});

io.on('connection', (socked: any) => {
  console.log('User connected', socked.id);

  socked.on('taskCompleated', (challengeId: string) => {
    // compleateTaskForToday(challengeId);
    // getActualAchievements(challengeId); //TODO recalculate status of achievements
    const data = 'achievements statuses...';
    io.emit('achieventsStatuses', data);
  })
});

sheduleProcess();


// eslint-disable-next-line no-console
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
