import { Component, OnInit } from '@angular/core';

//Class Product
import { Product } from '../../../models/product';

//Service
import { ProductService } from '../../../services/product.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  productList: Product[];

  constructor(
    private productService:ProductService,
    private toastr:ToastrService
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

}
