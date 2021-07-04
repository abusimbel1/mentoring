import { State, Status } from '../interfaces';

const inProgress = {state: State.InProgress, updated: new Date().toISOString()};
const success = {state: State.Success, updated: new Date().toISOString()};
const failure = {state: State.Failure, updated: new Date().toISOString()};

export const checkSevenDaysInARow = (tasksStatus: any): Status => {

  const numOfDoneInARow = tasksStatus.reduce((acc: number, task: any) => task.status.state === State.Success ? acc+1 : 0, 0);

  if (numOfDoneInARow > 6) {
    return success;
  }

  return inProgress;
};

export const checkCompleteFiveBeforeEight = (tasksStatus: any): Status => {
  const numOfCompleated = tasksStatus.reduce((acc: number, task: any) => task.status.state === State.Success && task.status.updated < 8 ? acc+1 : acc,0);
  
  if (numOfCompleated > 4) return success;

  return inProgress;
};

export const checkCompleateFirstTask = (tasksStatus: any): Status => {
  const isFirstTaskCompleated = tasksStatus[0].status.state === State.Success;

  return isFirstTaskCompleated ? success : failure;
};

export const checkCompleteHalf = (tasksStatus: any): Status => {
  const numOfCompleated = tasksStatus.reduce((acc: number, task: any) => task.status.state === State.Success ? acc+1 : acc, 0)

  if (numOfCompleated > Number(tasksStatus.length / 2)) return success;

  return failure;
};

export const checkCompleteAll = (tasksStatus: any): Status => {
  const isSomeNotDone = tasksStatus.find((task: any) => task.status.state !== State.Success);

  if (isSomeNotDone) return failure;

  return success;
};
