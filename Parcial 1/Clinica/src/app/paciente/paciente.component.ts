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
  id: number;
  registro=[]; 
  paciente: any;
  dui: number;
  mascota: string;
  tratamiento: string;
  medicinas=[];
  medicamento: string;
  costo: number;
  desc: number;
  visitas: number;
  contador: number;
  opcion:number;
  valor=<HTMLAudioElement>document.getElementById("");
  mostrar=[];

  constructor() { }

  ngOnInit(): void {
    this.nombre="";
    this.id=1;
    this.registro[''];
    this.nombre ="";
    this.dui!=0;
    this.mascota="";
    this.tratamiento ="";
    this.medicinas=['','Parecetamol','Acetaminofén','Pastillas'];
    this.medicamento="";
    this.costo!=0;
    this.desc=this.costo;
    this.visitas=1;
    this.contador=0;
    //Parte para mostrar datos
    this.mostrar=[''];

  }

  ingresar(){
    this.descuento();
    this.paciente={"id":this.id,"nombre":this.nombre,"dui":this.dui,"mascota":this.mascota,"medicamento":this.medicamento,"costo":this.costo,"":this.desc,"visitas":this.visitas};
    this.registro.push(this.paciente);
    // this.paciente={"nombre":this.nombre};
    // this.registro.push(this.paciente);
    this.contador++;
  }

  mostrarDatos(){
    this.valor= <HTMLAudioElement>document.getElementById("this.valor");
    this.paciente={"id":this.id,"nombre":this.nombre,"dui":this.dui,"medicamento":this.medicamento,"costo":this.costo,"":this.desc,"visitas":this.visitas};
    this.registro.push(this.paciente);
    
    

    
  }

  descuento(){
    if(this.visitas<2){
      this.desc=this.costo;
    }
    else if(this.visitas==2){
      this.desc = this.costo-(this.costo*0.05);
    }
    else if(this.visitas>=4){
      this.desc = this.costo-(this.costo*0.1);
    }
    return this.desc;
  }
}
