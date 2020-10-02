export class Product {
    $key: string = "";
    nombre: string = "";
    dui: string = "";
    mascota: string = "";
    tratamiento: string = "";
    medicamento: string = "";
    costo: number;
    desc: number = 0;
    total: number = 0;
    visitas: number;
    // // contador: number = 0;

    // descuento(visitas:number,costo:number):number{
    //     if(visitas<2){
    //         this.desc=0;
    //         this.total=costo - this.desc;
    //     }
    //     else if(this.visitas==2){
    //         this.desc = (this.costo*0.05);
    //         this.total=this.costo - this.desc;
    //     }
    //     else if(visitas>=3 || visitas<=4){
    //         this.desc=0;
    //         this.total=this.costo - this.desc;
    //     }
    //     else if(this.visitas>=4){
    //         this.desc = (this.costo*0.1);
    //         this.total=this.costo - this.desc;
    //     }
    //     return this.total;
    // }
}
