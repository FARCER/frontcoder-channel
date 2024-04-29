export interface Model<T> {
  state: ESTATE;
  data?: T;
}



export enum ESTATE {
  PENDING = 'PENDING',
  READY = 'READY',
  ERROR = 'ERROR'
}
