import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto001';
  nombre = 'Alex Mata';
  edad = 23;
  email = 'alexrobertomata@hotmail.com';
  sueldos =[1700,1600,1900];
  activo = true;
  sitio = "https//:www.google.com.sv"

  contador = 1;

  esActivo(){
    if(this.activo){
      return 'Trabajador Activo';
    }else{
      return 'Trabajador Inactivo';
    }
  }

  ultimos3sueldos(){
    let suma = 0;
    for(let x=0;x<this.sueldos.length;x++){
      suma += this.sueldos[x];
    }
    return suma;
  }

  incrementar(){
    this.contador++;
  }

  decrementar(){
    this.contador--;
  }
}
