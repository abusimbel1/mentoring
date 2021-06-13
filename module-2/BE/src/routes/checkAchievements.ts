import { Challenge, State, Status } from "../interfaces";

export const checkAchivementsStatus = (id:string, challenge: Challenge) => {
  switch (id) {
    case '1':
      checkFirstAchievement(challenge)
      break;
    case '2':
      checkSecondAchievement(challenge)
      break;
    case '3':
      checkThirdAchievement(challenge)
      break;
    case '4':
      checkFourthAchievement(challenge)
      break;
    case '5':
      checkFifthAchievement(challenge)
      break;
  
    default:
      break;
  }
}

const checkFirstAchievement = (challenge: any): Status => {
  const state = challenge.achievementsStatus.reduce((acc: number, item: any) => item.status.state === State.Success ? acc+=1 : 0,0)
  const restOfTime = parseInt((new Date().getTime() - challenge.date).toString())
  return {
    updated: new Date(),
    state: state.length > 6 ? State.Success : restOfTime > 6 ? State.InProgress : State.Failure
  }
}

const checkSecondAchievement = (challenge: any): Status => {
  const state = challenge.achievementsStatus.reduce((acc: number, item: any) => {
    if (item.status.state === State.Success && item.status.updated.getHours() < 8) {
      return acc+=1
    }
    return acc
  },0)
  const restOfTime = parseInt((new Date().getTime() - challenge.date).toString())
  return {
    updated: new Date(),
    state: state.length > 4 ? State.Success : restOfTime > 4 ? State.InProgress : State.Failure
  }
}

const checkThirdAchievement = (challenge: any): Status => {
  const state = challenge.achievementsStatus[0]
  return {
    updated: new Date(),
    state: state
  }
}

const checkFourthAchievement = (challenge: any): Status => {
  const state = challenge.achievementsStatus.reduce((acc: number, item: any) => item.status.state === State.Success ? acc+=1 : acc,0)
  const restOfTime = parseInt((new Date().getTime() - challenge.date).toString())
  return {
    updated: new Date(),
    state: state.length > parseInt((challenge.achievementsStatus.length/2).toString()) ? State.Success : restOfTime + state.length > parseInt((challenge.achievementsStatus.length/2).toString()) ? State.InProgress : State.Failure
  }
}

const checkFifthAchievement = (challenge: any): Status => {
  const state = challenge.achievementsStatus.reduce((acc: number, item: any) => item.status.state === State.Success ? acc+=1 : 0,0)
  const restOfTime = parseInt((new Date().getTime() - challenge.date).toString())
  return {
    updated: new Date(),
    state: state.length === challenge.achievementsStatus.length ? State.Success : restOfTime + state.length == challenge.achievementsStatus.length ? State.InProgress : State.Failure
  }
}