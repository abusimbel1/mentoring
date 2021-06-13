import sayHello from './generalFunctions';
import {getTaskForToday}  from './generalFunctions'
import {startNewChallenge} from './generalFunctions'
import {getActualAchievements} from './generalFunctions'
import {getTaskArchive} from './generalFunctions'
import {calculateAchievementsStatus} from './generalFunctions'
import tasks from '../DB/tasks.json';
import achievements from '../DB/achievements.json';

describe('should return task for today', () => {
  const challengeId = 1;
  const expectedResult = {
    id: 1, 
    description: "Go to bed before 11:00 PM",
    state: 'Pending',
    updated: false,
  }
  test('getTaskForToday', () => {
    expect(getTaskForToday(challengeId)).toBe(expectedResult);
  })
})

describe('should start new challenge', () => {
  const challengeId = 1;
  const duration = 30;
  const numOfAchievements = parseInt((duration/6).toString());
  const expectedResult = {
    id: 1,
    state: 'In Progress',
    tasksOrder: tasks.tasks,
    tasksStatus: tasks.tasks,
    achievementsStatus: achievements,
    startDate: new Date().toString()
  }
  test('startNewChallenge', () => {
    expect(startNewChallenge(tasks, achievements, duration, numOfAchievements)).toBe(expectedResult);
  })
})

describe('should return actual achievements', () => {
  const challengeId = 1;
  const expectedResult = {
    achievements: [
      {"id": 1, "description": "Complete each task 7 days in a row ", "icon": "undefined", state: 'Pending', updated: ''},
      {"id": 2, "description": "Complete five tasks before 8:00 AM", "icon": "undefined", state: 'Pending', updated: ''},
      {"id": 3, "description": "Complete 4 Monday's tasks", "icon": "undefined", state: 'Pending', updated: ''},
      {"id": 4, "description": "Complete half of the tasks", "icon": "undefined", state: 'Pending', updated: ''},
      {"id": 5, "description": "Complete all tasks", "icon": "undefined", state: 'Pending', updated: ''}
    ],
  }
  test('getActualAchievements', () => {
    expect(getActualAchievements(challengeId)).toBe(expectedResult);
  })
})

describe('should return tasks archive', () => {
  const challengeId = 1
  const expectedResult = {
    tasks: [
      {id: 1, description: "Go to bed before 11:00 PM ", state: 'Success', updated: ''},
      {id: 2, description: "Take a picture of a sunset ", state: 'Success', updated: ''},
    ]
  }
  test('getTaskArchive', () => {
    expect(getTaskArchive(challengeId)).toBe(expectedResult);
  })
})

describe('should return achievements status', () => {
  const challengeId = 1
  const expectedResult = {
    achievements: [
      {"id": 1, "description": "Complete each task 7 days in a row ", "icon": "undefined", state: 'Pending', updated: ''},
      {"id": 2, "description": "Complete five tasks before 8:00 AM", "icon": "undefined", state: 'Pending', updated: ''},
      {"id": 3, "description": "Complete 4 Monday's tasks", "icon": "undefined", state: 'Pending', updated: ''},
      {"id": 4, "description": "Complete half of the tasks", "icon": "undefined", state: 'Pending', updated: ''},
      {"id": 5, "description": "Complete all tasks", "icon": "undefined", state: 'Pending', updated: ''}
    ]
  }
  test('calculateAchievementsStatus', () => {
    expect(calculateAchievementsStatus(challengeId)).toBe(expectedResult);
  })
})