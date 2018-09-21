import { Product } from './../../../models/product';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[];

  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit() {
    this.productService.getProducts().snapshotChanges().subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.productList.push(x as Product);
      });
    });
  }

  onEdit(product: Product) {
    console.log("Aggiornamento prodotto " + product.name);
    this.productService.selectedProduct = Object.assign({}, product);
  }

  onDelete($key: string) {
    console.log("Cancellazione prodotto con chiave " + $key);
    this.productService.deleteProduct($key);
    this.toastr.success('Successful operation', 'Product deleted');
  }

}
