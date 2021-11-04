export enum DataStateEnum{
  LOADING,
  LOADED,
  EROOR
}
export interface AppDataState<T>{
  dataState? : DataStateEnum,
  data?:T,
  errorMessage?:string
}
