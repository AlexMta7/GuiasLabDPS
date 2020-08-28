export class Paciente {
    constructor(
        public nombre: string,
        public dui: number,
        public mascota: string,
        public tratamiento: string,
        public medicamento: string[],
        public costo: number
    ){}
}
