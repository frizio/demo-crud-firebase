import { Product } from './../models/product';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: AngularFireList<any>;

  selectedProduct: Product = new Product();


  constructor(
    private db: AngularFireDatabase
  ) { }

  getProducts() {
    return this.productList = this.db.list('products');
  }

  insertProduct(product: Product) {
    this.productList.push({
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });
  }

  updateProduct(product: Product) {
    this.productList.update(
      product.$key,
      {
        name: product.name,
        category: product.category,
        location: product.location,
        price: product.price
      }
    );
  }

  deleteProduct($key: string) {
    this.productList.remove($key);
  }
}
