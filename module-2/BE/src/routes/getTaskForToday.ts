import { findById } from "../features";
import * as challenges from '../DB/challenges.json'
import { State, TaskForToday } from "../interfaces";

export const getTaskForToday = (challengeId: string): TaskForToday => {
  const challenge: any = findById(challenges.challenges as [], challengeId)
  const task:any = challenge[(parseInt((new Date().getTime() - challenge.date).toString()))-1]
  return {
    ...task,
    status: State.InProgress,
    updated: new Date()
  } as TaskForToday
}