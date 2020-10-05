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

  //Objetos para guardar ticket
  textToSave: any;
  // textToSaves: string;
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

  
  saveFile(indice:number){    
    for(this.i = 0;this.i<=indice;this.i++){
      // let sd = this.productList[this.i].$key;
      this.textToSave = 
      + "Nombre: " + this.productList[this.i].nombre 
      + "\nDui: " + this.productList[this.i].dui
      + "\nMascota: " + this.productList[this.i].mascota
      + "\nTratamiento: " + this.productList[this.i].tratamiento
      + "\nMedicamento: " + this.productList[this.i].medicamento
      + "\nCosto: " + this.productList[this.i].costo
      + "\nDescuento: " + this.productList[this.i].descuento
      + "\nTotal: " + this.productList[this.i].total
      + "\nVisitas: " + this.productList[this.i].visitas;
    }

    // this.textToSaves = document.getElementById("id").nodeValue; 
    this.textToSaveAsBlob = new Blob([this.textToSave], {type:"text/plain"});
    this.textToSaveAsURL = window.URL.createObjectURL(this.textToSaveAsBlob);
    this.fileNameToSaveAs = "Comprobante de compra";

    this.downloadLink.download = this.fileNameToSaveAs;
    // this.downloadLink.innerHTML = "Download File";
    this.downloadLink.href = this.textToSaveAsURL;
    // this.downloadLink.onclick = destroyClickedElement() 
  
    document.body.appendChild(this.downloadLink);

    this.downloadLink.click();  
    this.toastr.info("Ticket generado");
  }

  //No estoy ocupando este evento
  // destroyClickedElement(event?){
  //   document.body.removeChild(event.target);
  // }
}
