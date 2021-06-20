import { findById } from '../features'
import * as challenges from '../DB/challenges.json'
import { State } from '../interfaces'

export const getTaskArchive = (challengeId: string) => {
  const challenge:any = findById(challenges.challenges, challengeId)
  return challenge.tasksOrder.filter(task => task.status.state !== State.InProgress)
}