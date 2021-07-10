import { State } from '../interfaces';
import { Achievement } from './achievement';
import { Task } from './task';

export interface Challenge {
  id: string;
  state: State;
  tasksOrder: Task[];
  date: string;
  achievementsStatus: Achievement[];
}
