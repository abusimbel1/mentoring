import { findById } from "../features";
import * as challenges from '../DB/challenges.json'
import { ActualAchievement } from "../interfaces";
import { checkAchivementsStatus } from "./checkAchievements";

export const getActualAchievements = (challengeId: string): ActualAchievement[] => {
  const challenge:any = findById(challenges.challenges as [], challengeId)
  return challenge.achievementsStatus.map((item:any) => checkAchivementsStatus(item.id, challenge)) //TODO refactor due to the future structure
}