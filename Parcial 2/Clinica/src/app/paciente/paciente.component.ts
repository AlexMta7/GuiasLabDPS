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

  }

  ingresar(){
    if(this.visitas<2){
      this.desc=0;
      this.total=this.costo - this.desc;
    }
    else if(this.visitas==2){
      this.desc = (this.costo*0.05);
      this.total=this.costo - this.desc;
    }
    else if(this.visitas==3){
      this.desc=0;
      this.total=this.costo - this.desc;
    }
    else if(this.visitas>=4){
      this.desc = (this.costo*0.1);
      this.total=this.costo - this.desc;
    }

    this.paciente={"id":this.id,"nombre":this.nombre,"dui":this.dui,"mascota":this.mascota,"tratamiento":this.tratamiento,"medicamento":this.medicamento,"costo":this.costo,desc:this.desc,total:this.total,"visitas":this.visitas}/*"visitas":this.visitas++ de esta forma se autoincrementa*/
    this.registro.push(this.paciente);
    
    this.contador++;
  }

  mostrarDatos(){
   alert("Próximamente");

  }

  // descuento(){
  //   this.desc=this.costo;
  //   if(this.visitas<2){
  //     this.desc=this.costo;
  //   }
  //   else if(this.visitas==2){
  //     this.desc = this.costo-(this.costo*0.05);
  //   }
  //   else if(this.visitas>=4){
  //     this.desc = this.costo-(this.costo*0.1);
  //   }
  //   return this.desc;
  // }

  // this.visitas++;
    
      // if(this.visitas==0){
      //   this.paciente={"id":this.id,"nombre":this.nombre,"dui":this.dui,"mascota":this.mascota,"tratamiento":this.tratamiento,"medicamento":this.medicamento,"costo":this.costo,desc:this.desc,total:this.total,visitas:this.visitas/*"visitas":this.visitas*/};
      //   this.registro.push(this.paciente);
      //   // this.paciente={"id":this.id,"nombre":this.nombre,"dui":this.dui,"mascota":this.mascota,"tratamiento":this.tratamiento,"medicamento":this.medicamento,"costo":this.costo,desc:this.desc,visitas:this.visitas/*"visitas":this.visitas*/};
      //   // this.registro.push(this.paciente);

      // }
      // else{
      //   for(let control of this.registro){
      //     control.visitas=0;
      //   }
      //   // this.paciente={"id":this.id,"nombre":this.nombre,"dui":this.dui,"mascota":this.mascota,"tratamiento":this.tratamiento,"medicamento":this.medicamento,"costo":this.costo,"":this.desc,"visitas":this.visitas};
      //   // this.registro.push(this.paciente);
      //   // this.contador++;
      // }
    
    // this.paciente={"nombre":this.nombre};
    // this.registro.push(this.paciente);

}
