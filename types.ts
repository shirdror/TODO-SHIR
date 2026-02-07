export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export enum FilterType {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}