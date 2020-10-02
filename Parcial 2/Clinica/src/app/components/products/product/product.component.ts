import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

//Service
import { ProductService } from '../../../services/product.service';

//Class
import { Product } from '../../../models/product';

import { ToastrService } from 'ngx-toastr';
import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { messaging } from 'firebase';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 
  medicinas =[];
  desc: number = 0;
  total: number = 0;
  contador: number = 0;
  constructor(
    public productService: ProductService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
    this.medicinas = ['','Parecetamol','Acetaminofén','Pastillas'];
    this.productService.getProducts();
  }

  onSubmit(productForm: NgForm)
  {
    try
    {
      if(productForm.value.$key == null){
        this.productService.insertProduct(productForm.value);
        this.toastr.success('Operación exitosa','Paciente agregado');
        // this.productService.selectedProduct.contador ++;
      }
      else{
        // this.productService.selectedProduct.descuento();
        this.productService.updateProduct(productForm.value);
        this.toastr.success('Operación exitosa','Registro modificado')
      }
      this.resetForm(productForm);
    }
    catch(e){
      alert(e);
    }
    
  }

  resetForm(productForm?: NgForm){
    if(productForm != null){
      productForm.reset();
      this.productService.selectedProduct = new Product();
    }
  }

}
