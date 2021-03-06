export enum ProductActionType{
  GET_ALL_PRODUCTS="[Product] Get All products",
  GET_SELECTED_PRODUCTS="[Product] Get Selected products",
  GET_AVAILABLE_PRODUCTS="[Product] Get Available products",
  SEARCH_PRODUCTS="[Product] Search products",
  NEW_PRODUCT="[Product] New product",
  SELECT_PRODUCT="[Product] Select product",
  EDIT_PRODUCT="[Product] edit product",
  DELETE_PRODUCT="[Product] Delete product",
PRODUCT_ADDED="[Product] add new product",
PRODUCT_EDIT="[Product] edit new product"

}
export interface ActionEvent {
  type : ProductActionType,
  payload?:any
}
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
