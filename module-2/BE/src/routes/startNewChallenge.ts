import * as tasks from '../DB/tasks.json';
import * as achievements from '../DB/achievements.json'
import { Achievement, Challenge, State, Task } from '../interfaces';
import { shuffle } from '../features';


export  function sayHello() {
  return 'Hello';
}

export const startNewChallenge = (tasks: Task[], achievements: Achievement[], duration: number = 30, numOfAchievements: number = parseInt((duration/6).toString())): Challenge => {
  const date: Date = new Date();
  const tasksOrder: Task[] = shuffle(tasks).slice(-duration);
  const achievementsStatus: Achievement[] = shuffle(achievements.slice(0, achievements.length-3)).slice(-numOfAchievements).concat(achievements.slice(-2))

  return {
    id: '', //TODO refactor after node part
    state: State.InProgress,
    tasksOrder,
    date,
    achievementsStatus
  } as Challenge
}
