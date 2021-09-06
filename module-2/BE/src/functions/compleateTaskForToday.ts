import { findById } from '../features';
import * as challenges from '../DB/challenges.json'
import { State, TaskForToday } from '../interfaces';
import { Challenge } from '../interfaces/challenge';

export const compleateTaskForToday = (challengeId: string): TaskForToday | null => {
  const challenge: Challenge = findById(challenges.challenges, challengeId)
  if (!challenge) return null;
  // const currentDay = parseInt(challenge.date.substring(5,7))  //TODO
  const currentDay = 1;
  const task:any = challenge.tasksOrder[currentDay]
  return {
    ...task,
    status: {
      state: State.Success,
      updated: new Date().toISOString(),
    }
  };
};