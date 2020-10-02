import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

//Service
import { ProductService } from '../../../services/product.service';

//Class
import { Product } from '../../../models/product';

import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 
  medicinas =[];
  constructor(
    public productService: ProductService) { }

  ngOnInit(): void {
    this.medicinas = ['','Parecetamol','Acetaminofén','Pastillas'];
    this.productService.getProducts();
    this.resetForm();
  }

  onSubmit(productForm: NgForm)
  {
    alert("accede");
    if(productForm.value.$key == null){
      this.productService.insertProduct(productForm.value);
    }
    else{
      this.productService.updateProduct(productForm.value);
    }
    this.resetForm(productForm);
    alert("Actualizado");
    
  }

  ingresar(){
    alert("Producto ingresado");

  }

  resetForm(productForm?: NgForm){
    if(productForm != null){
      productForm.reset();
      this.productService.selectedProduct = new Product();
    }
  }

}
