import { Component, OnInit } from '@angular/core';

//Class Product
import { Product } from 'src/app/models/product';

//Class Reports
import { ReportsComponent } from '../../../components/products/reports/reports.component';

//Service
import { ProductService } from '../../../services/product.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[];

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts()
    .snapshotChanges()
    .subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.productList.push(x as Product);
      })
    })
  }

  onEdit(product: Product){
    this.productService.selectedProduct = Object.assign({},product); //Se hace una copia del elemento seleccionado para no tenes el doble data binding
  }


  onDelete($key: string){
    if(confirm("¿Desea eliminar registro?")){
      this.productService.deleteProduct($key);
      this.toastr.success('Operación exitosa','Eliminado correctamente');
    }
  }

}
