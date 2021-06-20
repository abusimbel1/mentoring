import {getTaskForToday} from './getTaskForToday'
import {startNewChallenge} from './startNewChallenge'
import {getActualAchievements} from './getActualAchievements'
import {getTaskArchive} from './getTaskArchive'
import tasks from '../DB/tasks.json';
import achievements from '../DB/achievements.json';
import { State } from '../interfaces';

let dateNowSpy;

beforeAll(() => {
  dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1487076708000);
});

describe('getTaskForToday', () => {
  const challengeId = '1';
  const expectedResult = {
    id: '1', 
    description: 'Go to bed before 11:00 PM',
    status: {
      state: 'Pending',
      updated: new Date().toISOString(),
    }
  }
  test('should return task for today', () => {
    expect(getTaskForToday(challengeId)).toEqual(expectedResult);
  })
})

describe('startNewChallenge', () => {
  const duration = 30;
  const numOfAchievements = parseInt((duration/6).toString());
  const achievementsWithStatuses = achievements.map(achievement => achievement.status = State.InProgress);
  const tasksWithStatuses = tasks.map(task => task.status = State.InProgress);
  const expectedResult = {
    id: '1',
    state: 'In Progress',
    tasksOrder: tasks,
    tasksStatus: tasksWithStatuses,
    achievementsStatus: achievementsWithStatuses,
    startDate: new Date().toISOString()
  }
  test('should start new Challenge', () => {
    expect(startNewChallenge(tasks, achievements, duration, numOfAchievements)).toEqual(expectedResult);
  })
})

describe('getActualAchievement', () => {
  const challengeId = '1';
  const expectedResult = {
    achievements: [
      {'id': 1, 'description': 'Complete each task 7 days in a row ', 'icon': 'undefined',status: { state: 'Pending', updated: new Date().toISOString()}},
      {'id': 2, 'description': 'Complete five tasks before 8:00 AM', 'icon': 'undefined',status: { state: 'Pending', updated: new Date().toISOString()}},
      {'id': 3, 'description': 'Complete 4 Monday\'s tasks', 'icon': 'undefined', status: {state: 'Pending', updated: new Date().toISOString()}},
      {'id': 4, 'description': 'Complete half of the tasks', 'icon': 'undefined', status: {state: 'Pending', updated: new Date().toISOString()}},
      {'id': 5, 'description': 'Complete all tasks', 'icon': 'undefined',status: { state: 'Pending', updated: new Date().toISOString()}}
    ],
  }
  test('should return actual achievements', () => {
    expect(getActualAchievements(challengeId)).toEqual(expectedResult);
  })
})

describe('getTaskArchive', () => {
  const challengeId = '1'
  const expectedResult = {
    tasks: [
      {id: 1, description: 'Go to bed before 11:00 PM ',status: { state: 'Success', updated: new Date().toISOString()}},
      {id: 2, description: 'Take a picture of a sunset ', status: {state: 'Success', updated: new Date().toISOString()}},
    ]
  }
  test('should return tasks archive', () => {
    expect(getTaskArchive(challengeId)).toEqual(expectedResult);
  })
})

describe('should return achievements status', () => {
  const challengeId = '1';
  const expectedResult = {
    achievements: [
      {'id': 1, 'description': 'Complete each task 7 days in a row ', 'icon': 'undefined',status: { state: 'Pending', updated: ''}},
      {'id': 2, 'description': 'Complete five tasks before 8:00 AM', 'icon': 'undefined',status: { state: 'Pending', updated: ''}},
      {'id': 3, 'description': 'Complete 4 Monday\'s tasks', 'icon': 'undefined',status: { state: 'Pending', updated: ''}},
      {'id': 4, 'description': 'Complete half of the tasks', 'icon': 'undefined',status: { state: 'Pending', updated: ''}},
      {'id': 5, 'description': 'Complete all tasks', 'icon': 'undefined', status: {state: 'Pending', updated: ''}}
    ]
  }
  test('calculateAchievementsStatus', () => {
    expect(calculateAchievementsStatus(challengeId)).toEqual(expectedResult);
  })
})