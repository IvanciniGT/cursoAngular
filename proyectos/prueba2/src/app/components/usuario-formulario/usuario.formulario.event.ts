import { Usuario } from "src/app/models/user.model";

export class UsuarioGuardadoEvent{
    readonly usuario: Usuario
    constructor(usuario: Usuario){
        this.usuario=usuario;
    }
}