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
  total: number;
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
    this.desc=0;
    this.total=0;
    this.visitas=1;
    this.contador=0;
    //Parte para mostrar datos
    this.mostrar=[''];

  }

  ingresar(){
    if(this.visitas<2){
      this.desc=0;
      //this.total=this.desc;
    }
    else if(this.visitas==2){
      this.desc = (this.costo*0.05);
      //this.total=this.desc;
    }
    else if(this.visitas==3){
      this.desc=0;
    }
    else if(this.visitas>=4){
      this.desc = (this.costo*0.1);
      //this.total= this.desc;
    }

    this.paciente={"id":this.id,"nombre":this.nombre,"dui":this.dui,"mascota":this.mascota,"tratamiento":this.tratamiento,"medicamento":this.medicamento,"costo":this.costo,desc:this.desc,visitas:this.visitas++/*"visitas":this.visitas*/};
    this.registro.push(this.paciente);
    this.contador++;
   // this.visitas++;
    for(let control of this.paciente){
      if(control.id==this.paciente.id){
        // this.paciente={"id":this.id,"nombre":this.nombre,"dui":this.dui,"mascota":this.mascota,"tratamiento":this.tratamiento,"medicamento":this.medicamento,"costo":this.costo,desc:this.desc,visitas:this.visitas/*"visitas":this.visitas*/};
        // this.registro.push(this.paciente);

      }
      else{
        // this.paciente={"id":this.id,"nombre":this.nombre,"dui":this.dui,"mascota":this.mascota,"tratamiento":this.tratamiento,"medicamento":this.medicamento,"costo":this.costo,"":this.desc,"visitas":this.visitas};
        // this.registro.push(this.paciente);
        // this.contador++;
      }
    }
    // this.paciente={"nombre":this.nombre};
    // this.registro.push(this.paciente);

  }

  mostrarDatos(){
    this.valor= <HTMLAudioElement>document.getElementById("this.valor");
    this.paciente={"id":this.id,"nombre":this.nombre,"dui":this.dui,"medicamento":this.medicamento,"costo":this.costo,"":this.desc,"visitas":this.visitas};
    this.registro.push(this.paciente);

  }

  descuento(){
    this.desc=this.costo;
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
