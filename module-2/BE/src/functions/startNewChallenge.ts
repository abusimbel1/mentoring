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


export const startNewChallenge = (tasks: any, achievements: any, duration: number = 30, numOfAchievements: number = parseInt((duration/6).toString())): Challenge => {
  const tasksOrder: any = shuffle(tasks).slice(-duration);
  const achievementsStatus: any = getShuffledAchievements(achievements, numOfAchievements).map((item: any) => {
    return {
      id: item.id,
      description: item.description,
      status: {state: State.InProgress, updated: new Date()},
      checkComplete: () => true,
    }
  });
  const tasksStatus: any = tasksOrder.map((task: any) => {
    const newTask = {
      id:task.id,
      description: task.description,
      status: {state: State.InProgress, updated: new Date()}
    }
    return newTask;
  })
  const tasksOrderToSend = tasksOrder.map((item: any) => item.id)
  
  return {
    state: State.InProgress,
    tasksOrder: tasksOrderToSend,
    achievementsStatus,
    tasksStatus
  } as any
};
