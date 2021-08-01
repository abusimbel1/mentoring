const { Router } = require('express');
import { Request, Response, NextFunction } from 'express';
import { getTaskForToday } from '../functions/getTaskForToday';
import { startNewChallenge } from '../functions/startNewChallenge';
const Challenge = require('../models/Challenge');
const Task = require('../models/Task');
const Achievement = require('../models/Achievement');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth.middleware');
const router = Router();

//api/challenge
router.get('/', auth, async (req: any, res: Response) => {
  try {
    const challenge = await Challenge.findOne({
      owner: req.user.userId,
      state: 'In Progress',
    });

    if (!challenge) {
      return res.status(400).json({ data: null });
    }
    res.json({ data: challenge.id });
  } catch (e) {
    res.status(500).json({ message: 'Error. Try again' });
  }
});

//api/challenge/newChallenge
router.post(
  '/newChallenge',
  auth,
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const defaultDuration: number = 30;
      const { duration = 30, numOfAchievements = Number(defaultDuration / 6) } =
        req.query;
      const tasks = await Task.find({});
      const achievements = await Achievement.find({});

      const newChallenge = startNewChallenge(
        [...tasks],
        [...achievements],
        Number(duration),
        Number(numOfAchievements)
      );

      const challengeToCreate = new Challenge({
        ...newChallenge,
        owner: req.user.userId,
      });

      await challengeToCreate.save();

      res.status(201).json({ data: challengeToCreate });
    } catch (e) {
      console.log(e.message);
      
      res.status(500).json({ message: 'Error. Try again' });
    }
  }
);

//api/challenge/taskForToday
router.get('/taskForToday', auth, async (req: any, res: Response) => {
  try {
    const challenge = await Challenge.findOne({
      owner: req.user.userId,
      state: 'In Progress',
    });

    if(!challenge) {
      return res.status(400).json({message: 'No challenge found'});
    }
    let one_day = 1000*60*60*24;
    const currentDate = new Date();
    const days = Math.ceil( (currentDate.getTime() - challenge.startDate.getTime() ) / one_day);
    const taskIdForToday = challenge.tasksOrder[days === 0 ? 0 : days - 1];    
    const taskForToday = challenge.tasksStatus.find((challenge: any) => challenge.id == taskIdForToday);

    res.json({data: taskForToday});

  } catch (e) {
    console.log(e.message);
    
    res.status(500).json({ message: 'Error. Try again' });
  }
});

//api/challenge
router.get('/getActualAchievements', auth, async (req: any, res: Response) => {
  try {
    const challenge = await Challenge.findOne({
      owner: req.user.userId,
      state: 'In Progress',
    });

    if (!challenge) {
      return res.status(400).json({ data: null });
    }
    res.json({ data: challenge.achievementsStatus });
  } catch (e) {
    res.status(500).json({ message: 'Error. Try again' });
  }
});

//api/challenge
router.get('/getTaskArchive', auth, async (req: any, res: Response) => {
  try {

    const { id } = req.query;
    
    const challenge = await Challenge.findOne({
      owner: req.user.userId,
      _id: id,
    });
    
    if (!challenge) {
      return res.status(400).json({ data: null });
    }

    res.json({ data: challenge.tasksStatus });
  } catch (e) {
    res.status(500).json({ message: 'Error. Try again' });
  }
});

module.exports = router;
