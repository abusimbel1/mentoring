import { findById } from '../features';
import * as challenges from '../DB/challenges.json'
import { ActualAchievement } from '../interfaces';

export const getActualAchievements = (challengeId: string): ActualAchievement[] => {
  const challenge:any = findById(challenges.challenges, challengeId);
  return challenge.achievementsStatus; // TODO refactor due to the future structure
}