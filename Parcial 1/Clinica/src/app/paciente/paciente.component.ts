import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  nombre: string;
  dui: number;
  mascota: string;
  tratamiento: string;
  medicamento: string;
  costo: number;
  desc: number;
  visitas: number;


  constructor() { }

  ngOnInit(): void {
    this.nombre = "";
    this.dui=0;
    this.mascota="";
    this.tratamiento ="";
    this.medicamento="";
    this.costo=0;
    this.desc=0;
    this.visitas=0;
  }

  ingresar(){
    if(this.visitas==2){
      this.desc = this.costo-(this.costo*0.25);
    }
  }

  descuento(){

  }

}
