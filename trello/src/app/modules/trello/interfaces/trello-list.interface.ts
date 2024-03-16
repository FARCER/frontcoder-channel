import { Task } from './task.interface';

export interface TrelloList {
  assignedForMe: Task[];
  assignedFromMe: Task[];
}
