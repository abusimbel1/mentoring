import { findById } from "../features"
import * as challenges from '../DB/challenges.json'

export const getTaskArchive = (challengeId: string) => {
  const challenge:any = findById(challenges.challenges as [], challengeId)
  return challenge.tasksOrder
}