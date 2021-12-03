import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../model/product.model";
import {Observable, of} from "rxjs";
import {catchError, map, startWith} from "rxjs/operators";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionType} from "../../State/products.state";
import {Router} from "@angular/router";
import {EventDriverService} from "../../services/event.driver.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>>|null=null;
  readonly DataStateEnum = DataStateEnum;
  constructor(private productService : ProductsService,private router:Router
  ,private eventDriverService : EventDriverService) { }

  ngOnInit(): void {
    this.eventDriverService.subjectEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      this.onActionEvent(actionEvent);
    });
  }

  onGetAllProduct() {
    this.products$ =
      this.productService.getAllProducts()
        .pipe(map(data=>({dataState:DataStateEnum.LOADED,data:data})),
         startWith({dataState:DataStateEnum.LOADING}),
          catchError(err => of({dataState:DataStateEnum.EROOR,errorMessage:err.message}))

      );
  }

  onGetSelectedProducts() {
    this.products$ =
      this.productService.getSelectedProducts()
        .pipe(map(data=>({dataState:DataStateEnum.LOADED,data:data})),
          startWith({dataState:DataStateEnum.LOADING}),
          catchError(err => of({dataState:DataStateEnum.EROOR,errorMessage:err.message}))

        );
  }
  onGetAvailableProducts(){
    this.products$ =
      this.productService.getAvailableProducts()
        .pipe(map(data=>({dataState:DataStateEnum.LOADED,data:data})),
          startWith({dataState:DataStateEnum.LOADING}),
          catchError(err => of({dataState:DataStateEnum.EROOR,errorMessage:err.message}))

        );
  }

  onShearch(dataForm: any) {
    this.products$ =
      this.productService.searchProducts(dataForm.keyword)
        .pipe(map(data=>({dataState:DataStateEnum.LOADED,data:data})),
          startWith({dataState:DataStateEnum.LOADING}),
          catchError(err => of({dataState:DataStateEnum.EROOR,errorMessage:err.message}))

        );

  }

  Onselect(p:Product) {
  this.productService.select(p).subscribe(data=>{
    p.selected=data.selected;
  })

  }

  onDelete(p: Product) {
    let v = confirm("etes vous sure?");
    if(v==true){
      this.productService.delete(p).subscribe(data=>{
      this.onGetAllProduct();
    });}

  }

  onNewProduct() {
this.router.navigateByUrl("/newProduct");
  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id);

  }

  onActionEvent($event: ActionEvent) {
   switch ($event.type){
     case ProductActionType.GET_ALL_PRODUCTS: this.onGetAllProduct() ; break ;
     case ProductActionType.GET_AVAILABLE_PRODUCTS:this.onGetAvailableProducts();break;
     case ProductActionType.GET_SELECTED_PRODUCTS:this.onGetSelectedProducts();break;
     case ProductActionType.SEARCH_PRODUCTS:this.onShearch($event.payload);break;
     case ProductActionType.NEW_PRODUCT:this.onNewProduct();break;
     case ProductActionType.SELECT_PRODUCT:this.Onselect($event.payload);break;
     case ProductActionType.DELETE_PRODUCT:this.onDelete($event.payload);break;
     case ProductActionType.EDIT_PRODUCT:this.onEdit($event.payload);break;
   }

  }
}
