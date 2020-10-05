import { Component, OnInit } from '@angular/core';

//Class Product
import { Product } from '../../../models/product';

//Service
import { ProductService } from '../../../services/product.service';

import { ToastrService } from 'ngx-toastr';
import { ɵBlockUntilFirstOperator } from 'angularfire2';
import { convertToParamMap } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  productList: Product[];

  //Objetos para guardar ticket
  textToSave: any;
  // textToSave = Object.assign({},);
  textToSaveAsBlob: Blob;
  textToSaveAsURL:string;
  fileNameToSaveAs: string;
  downloadLink = document.createElement("a");
  i:number;

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

  
  saveFile(num:number){
    /*"visitas":this.visitas++ de esta forma se autoincrementa*/
    // for(let control of this.productList){
    //   control.$key;
    //   control.nombre;
    //   control.dui;
    //   control.mascota;
    //   control.tratamiento;
    //   control.medicamento;
    //   control.costo;
    //   control.descuento;
    //   control.total;
    //   control.visitas;

    //   // this.textToSave = {
    //   //   "ID: " : control.$key
    //   //   // "Nombre: ": control.nombre,
    //   //   // "Dui: ": control.dui,
    //   //   // "Mascota: " : control.mascota,
    //   //   // "Tratamiento" : control.tratamiento,
    //   //   // "Medicamento" : control.medicamento,
    //   //   // "Costo" : control.costo,
    //   //   // "Descuento" :control.descuento,
    //   //   // "Total" : control.total,
    //   //   // "Visitas" : control.visitas
    //   // };
    //   this.textToSave = "ID: "+ control.$key + `<br>`
    //   + "Nombre:" + control.nombre + console.log("\n");
    // }

    for(this.i = 0;this.i<num;this.i++){
      // let sd = this.productList[this.i].$key;
      this.textToSave = this.productList[this.i].nombre;
    }

    this.textToSaveAsBlob = new Blob([this.textToSave], {type:"text/plain"});
    this.textToSaveAsURL = window.URL.createObjectURL(this.textToSaveAsBlob);
    this.fileNameToSaveAs = "NewText";

    this.downloadLink.download = this.fileNameToSaveAs;
    // this.downloadLink.innerHTML = "Download File";
    this.downloadLink.href = this.textToSaveAsURL;
    // this.downloadLink.onclick = destroyClickedElement() 
  
    document.body.appendChild(this.downloadLink);

    this.downloadLink.click();

    
  }

  //No estoy ocupando este evento
  // destroyClickedElement(event?){
  //   document.body.removeChild(event.target);
  // }
}
