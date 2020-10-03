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
  // desc: number;
  // total: number;
  // contador: number;
  constructor(
    public productService: ProductService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
    this.medicinas = ['','Parecetamol','Acetaminofén','Pastillas'];
    this.productService.getProducts();
    // this.productService.selectedProduct.costo = 0;
    // this.productService.selectedProduct.descuento = 0;
    // this.productService.selectedProduct.total = 0;

  }

  onSubmit(productForm: NgForm)
  {
    try
    {
      if(productForm.value.$key == null){
        this.descuento(productForm);
        this.productService.insertProduct(productForm.value,this.productService.selectedProduct.descuento,this.productService.selectedProduct.total);
        this.toastr.success('Operación exitosa','Paciente agregado');
        // this.productService.selectedProduct.contador ++;
      }
      else{
        this.descuento(productForm);
        this.productService.updateProduct(productForm.value,this.productService.selectedProduct.descuento,this.productService.selectedProduct.total);
        this.toastr.success('Operación exitosa','Registro modificado')
      }
      this.resetForm(productForm);
    }
    catch(e){
      // alert(e);
      this.toastr.warning(e,'No puede dejar vacía las casillas costo o visita');
    }

  }

  resetForm(productForm?: NgForm){
    if(productForm != null){
      productForm.reset();
      this.productService.selectedProduct = new Product();
    }
  }

  descuento(productForm: NgForm){
    try {
      if(this.productService.selectedProduct.visitas<2){
        this.toastr.warning("Sin descuento");
        this.productService.selectedProduct.descuento=0;
        this.productService.selectedProduct.total=this.productService.selectedProduct.costo - this.productService.selectedProduct.descuento;
      }
      else if(this.productService.selectedProduct.visitas==2){
        this.toastr.warning("Descuento del 5%");
        this.productService.selectedProduct.descuento = (this.productService.selectedProduct.costo*0.05);
        this.productService.selectedProduct.total=this.productService.selectedProduct.costo - this.productService.selectedProduct.descuento;
      }
      else if(this.productService.selectedProduct.visitas>=3 && this.productService.selectedProduct.visitas<=5){
        this.toastr.warning("Sin descuento");
        this.productService.selectedProduct.descuento=0;
        this.productService.selectedProduct.total=this.productService.selectedProduct.costo - this.productService.selectedProduct.descuento;
      }
      else if(this.productService.selectedProduct.visitas>5){
        this.toastr.warning("Descuento del 8%");
        this.productService.selectedProduct.descuento = (this.productService.selectedProduct.costo*0.08);
        this.productService.selectedProduct.total = this.productService.selectedProduct.costo - this.productService.selectedProduct.descuento;
            } 
    } catch (error) {
      this.toastr.error(error);
    }
  }

}
