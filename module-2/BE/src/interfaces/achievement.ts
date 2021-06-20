import { Status } from "../interfaces";

export interface Achievement {
  id: string;
  description: string;
  icon: string;
  checkComplete?: (taskStatus: Status) => boolean;
}