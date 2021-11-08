import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../../model/product.model";
import {ActionEvent, ProductActionType} from "../../../../State/products.state";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
@Input() product?:Product;
@Output() eventEmitter:EventEmitter<ActionEvent>=new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  Onselect(product: Product) {
  this.eventEmitter.emit({type:ProductActionType.SELECT_PRODUCT,payload:product});
  }

  onDelete(product: Product) {
    this.eventEmitter.emit({type:ProductActionType.DELETE_PRODUCT,payload:product});
  }

  onEdit(product: Product) {
    this.eventEmitter.emit({type:ProductActionType.EDIT_PRODUCT,payload:product});
  }
}
