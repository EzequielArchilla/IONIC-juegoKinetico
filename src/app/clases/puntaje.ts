import { Usuario } from "./usuario";

export class Puntaje {
    fecha:Date;
    puntaje:number;
    usuario:Usuario;

    constructor(){
        this.fecha = new Date();
        this.puntaje = 0;
        this.usuario = new Usuario();
    }
}
