import { Task } from "./interfaces/task";

export interface Status {
  state: State;
  updated: string;
}

export interface ArchiveItem extends Task {
  status: Status;
}

export type TaskForToday = ArchiveItem;

export interface ActualAchievement extends ArchiveItem {
  image?: string;
}

export enum State {
  InProgress = 'In Progress',
  Success = 'Success',
  Failure = 'Failure',
}
