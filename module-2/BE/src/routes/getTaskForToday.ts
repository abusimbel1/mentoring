import { findById } from "../features";
import * as challenges from '../DB/challenges.json'
import { State, TaskForToday } from "../interfaces";
import { Challenge } from "../interfaces/challenge";

export const getTaskForToday = (challengeId: string): TaskForToday => {
  const challenge: Challenge = findById(challenges.challenges, challengeId)
  const currentDay = parseInt(challenge.date.substring(5,7))  //TODO
  const task:any = challenge.tasksOrder[currentDay]
  return {
    ...task,
    status: {
      state: State.InProgress,
      updated: new Date().toISOString()
    }
  }
};