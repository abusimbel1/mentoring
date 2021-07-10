import express, { Application, Request, Response, NextFunction } from 'express';
import * as tasks from './DB/tasks.json';
import * as achievements from './DB/achievements.json';
import { startNewChallenge } from './functions/startNewChallenge';
import { getTaskForToday } from './functions/getTaskForToday';
import { getActualAchievements } from './functions/getActualAchievements';
import { getTaskArchive } from './functions/getTaskArchive';

const config = require('config');
const mongoose = require('mongoose');

const app: Application = express();
const PORT = config.get('port') || 3333;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (e) {
    console.log('Server error:', e.message);
    process.exit(1);
  }
}

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

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
