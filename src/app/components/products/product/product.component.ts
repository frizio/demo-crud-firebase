
import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../../services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts();
    this.onReset();
  }

  onSubmit(form: NgForm) {
    console.log("Sottomissione del form al server");

    if (form.value.$key == null) {
      console.log("Inserimento");
      this.productService.insertProduct(form.value);
    }
    else {
      console.log("Cancellazione");
      this.productService.updateProduct(form.value);
    }
    this.onReset(form);
  }
  
  onReset(form?: NgForm) {
    console.log("Reset del form programmaticamente");    
    if (form != null) {
      form.reset();
      this.productService.selectedProduct = new Product();
    }
  }

}
