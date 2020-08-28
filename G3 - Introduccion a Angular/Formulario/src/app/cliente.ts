export class Cliente {
    constructor(
        public id: number,
        public nombre: string,
        public nacionalidad: string,
        public edad?: number, //Uso de la variable es opcional 
    ){
        
    }
}
