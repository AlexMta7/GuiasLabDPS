import { Injectable } from '@angular/core';

//firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: AngularFireList<any>;
  selectedProduct: Product = new Product();

  constructor(private firebase: AngularFireDatabase) { }

  getProduct(){
    return this.productList = this.firebase.list('products');
  }

  insertProduct(product: Product){
    this.productList.push({
      nombre: product.nombre,
      dui: product.dui,
      mascota: product.mascota,
      tratamiento: product.tratamiento,
      medicamento: product.medicamento,
      costo: product.costo,
      visitas: product.visitas
    })
  }

  updateProduct(product: Product){
    this.productList.update(product.$key, {
      nombre: product.nombre,
      dui: product.dui,
      mascota: product.mascota,
      tratamiento: product.tratamiento,
      medicamento: product.medicamento,
      costo: product.costo,
      visitas: product.visitas
    })
  }

  deleteProduct($key:string){
    this.productList.remove($key);
  }
}
