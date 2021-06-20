import * as tasks from '../DB/tasks.json';
import * as achievements from '../DB/achievements.json'
import { State } from '../interfaces';
import { Achievement } from '../interfaces/achievement';
import { Challenge } from '../interfaces/challenge';
import { Task } from '../interfaces/task';
import { shuffle } from '../features';
import { checkSevenDaysInARow, checkCompleteFiveBeforeEight, checkCompleateFirstTask, checkCompleteHalf, checkCompleteAll } from './checkAchievements';

const allCheckCompleteFuncs: any = {
  sevenDaysInARow: checkSevenDaysInARow,
  completeFiveBeforeEight: checkCompleteFiveBeforeEight,
  compleateFirstTask: checkCompleateFirstTask,
  completeHalf: checkCompleteHalf,
  completeAll: checkCompleteAll
}

const getShuffledAchievements = (achievements: Achievement[], numberOfAchievements: number) => {
  if (numberOfAchievements > 5 || numberOfAchievements < 2) return achievements; //TODO refactor in a future
  const achievementsToShuffle = achievements.slice(0, achievements.length-2);
  const shuffledAchievements = shuffle(achievementsToShuffle);
  const allShuffledAchievements = shuffledAchievements.slice(0, numberOfAchievements-2).concat(achievements.slice(-2));
  return allShuffledAchievements.map((achievement: any) => {
    achievement.checkComplete = allCheckCompleteFuncs[achievement.type];
    achievement.status = {state: State.InProgress, updated: new Date().toISOString()};  //TODO mb it no needed
    return achievement;
  });
}


export const startNewChallenge = (tasks: Task[], achievements: Achievement[], duration: number = 30, numOfAchievements: number = parseInt((duration/6).toString())): Challenge => {
  const date: string = new Date().toISOString();
  const tasksOrder: Task[] = shuffle(tasks).slice(-duration);
  const achievementsStatus: Achievement[] = getShuffledAchievements(achievements, numOfAchievements);
  const tasksStatus: any = tasksOrder.map((task: any) => {
    task.status = {state: State.InProgress, updated: new Date().toISOString()};
    return task;
  })

  return {
    id: '123', //TODO refactor after node part
    state: State.InProgress,
    tasksOrder,
    date,
    achievementsStatus,
    tasksStatus
  } as Challenge
};
