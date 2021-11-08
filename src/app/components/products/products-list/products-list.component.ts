import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionType} from "../../../State/products.state";
import {Product} from "../../../model/product.model";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() productsInput$: Observable<AppDataState<Product[]>>|null=null;
  @Output() productsEventEmit : EventEmitter<ActionEvent> = new EventEmitter();
  readonly DataStateEnum = DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }

  Onselect(p: Product) {
  this.productsEventEmit.emit({type:ProductActionType.SELECT_PRODUCT,payload:p});
  }

  onDelete(p: Product) {
    this.productsEventEmit.emit({type:ProductActionType.DELETE_PRODUCT,payload:p});
  }

  onEdit(p: Product) {
    this.productsEventEmit.emit({type:ProductActionType.EDIT_PRODUCT,payload:p});

  }

  onActionEvent($event: ActionEvent) {
    this.productsEventEmit.emit($event);
  }
}
