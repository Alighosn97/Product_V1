import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventDriverService} from "../../services/event.driver.service";
import {ProductActionType} from "../../State/products.state";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId:number;
  productFormGroup ?: FormGroup;
  submitted:boolean=false;
  constructor(private eventDriverService : EventDriverService , private activatedRoute : ActivatedRoute,private productService : ProductsService
  ,private fb : FormBuilder) {
    this.productId=activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe(data=>{
      this.productFormGroup=this.fb.group({
        id:[data.id,Validators.required],
        name:[data.name,Validators.required],
        price:[data.price,Validators.required],
        quantity:[data.quantity,Validators.required],
        selected:[data.selected,Validators.required],
        available:[data.available,Validators.required]
      })

    })
  }

  onUpdateProduct() {
    this.submitted=true;

    this.productService.upDatProduct(this.productFormGroup?.value).subscribe(data=>{
      alert("success updating");
      this.eventDriverService.publishEvent({type:ProductActionType.PRODUCT_EDIT});
    })
  }
}
