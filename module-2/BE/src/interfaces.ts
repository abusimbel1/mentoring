export interface Task {
  id: string;
  description: string;
}

export interface Achievement {
  id: string;
  description: string;
  icon: string;
  checkComplete(taskStatus: Status): boolean;
}

export interface Status {
  state: State;
  updated: Date;
}

export interface Challenge {
  id: string;
  state: State,
  tasksOrder: Task[],
  date: Date,
  achievementsStatus: Achievement[]
}

export interface ArchiveItem extends Task {
  status: Status
}

export type TaskForToday = ArchiveItem

export interface ActualAchievement extends ArchiveItem {
  image?: string;
}


export enum State {
  InProgress = 'In Progress',
  Success = 'Success',
  Failure = 'Failure'
}