import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  registro=[]; 
  paciente: any;
  nombre: string;
  dui: number;
  mascota: string;
  tratamiento: string;
  medicamento: string;
  costo: number;
  desc: number;
  visitas: number;
  contador: number;


  constructor() { }

  ngOnInit(): void {
    this.registro[''];
    this.nombre = "";
    this.dui=0;
    this.mascota="";
    this.tratamiento ="";
    this.medicamento="";
    this.costo=0;
    this.desc=0;
    this.visitas=0;
    this.contador=0;
  }

  ingresar(){
    // this.descuento();
    this.paciente={"nombre":this.nombre,"dui":this.dui,"costo":this.costo,"descuento":this.desc,"visitas":this.visitas};
    this.registro.push(this.paciente);
    this.contador++;
  }

  descuento(){
    if(this.visitas==2){
      this.desc = this.costo-(this.costo*0.05);
    }
    else if(this.visitas>=4){
      this.desc = this.costo-(this.costo*0.1);
    }
  }

}
