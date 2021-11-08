import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, ProductActionType} from "../../../State/products.state";

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  @Output() productEventEmitter : EventEmitter<ActionEvent> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onGetAllProduct() {
    this.productEventEmitter.emit({type:ProductActionType.GET_ALL_PRODUCTS});
  }

  onGetSelectedProducts() {
this.productEventEmitter.emit({type:ProductActionType.GET_SELECTED_PRODUCTS});

  }

  onGetAvailableProducts() {
    this.productEventEmitter.emit({type:ProductActionType.GET_AVAILABLE_PRODUCTS});

  }

  onNewProduct() {
this.productEventEmitter.emit({type:ProductActionType.NEW_PRODUCT});
  }

  onShearch(dataForm: any) {
  this.productEventEmitter.emit({type:ProductActionType.SEARCH_PRODUCTS,payload:dataForm}
  )
  }
}
