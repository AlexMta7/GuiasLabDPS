import { DeclareVarStmt } from '@angular/compiler';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
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

  getProducts(){
    return this.productList = this.firebase.list('products');
  }

  insertProduct(product: Product,desc:number,tot:number){
    // Necesitan pasar todos los datos, si hay un dato en el push que no se esta pasando por medio de
    // ngModel no lo va a insertar porque no reconoce el dato (según lo que me ha ocurrido)

  
    //CREO QUE AQUÍ SE DEBERÍA DE PONER EL CODIGO 
    this.productList.push({
      nombre: product.nombre,
      dui: product.dui,
      mascota: product.mascota,
      tratamiento: product.tratamiento,
      medicamento: product.medicamento,
      costo: product.costo,
      visitas: product.visitas,
      descuento: desc,
      total: tot
      // costo: product.costo,
      // desc: product.desc,
      // total: product.total
      // contador: product.contador
    })
  }

  updateProduct(product: Product,desc:number,tot:number){
    this.productList.update(product.$key, {
      nombre: product.nombre,
      dui: product.dui,
      mascota: product.mascota,
      tratamiento: product.tratamiento,
      medicamento: product.medicamento,
      costo: product.costo,
      visitas: product.visitas,
      descuento: desc,
      total: tot
      // desc: product.desc
    })
  }

  deleteProduct($key:string){
    this.productList.remove($key);
  }
}
