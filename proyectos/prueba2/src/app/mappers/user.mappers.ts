import { Usuario } from "../models/user.model";

export function toUser(data:any):Usuario{
    let usuario= new Usuario()
    usuario.apellidos = data.apellidos
    usuario.edad = data.edad
    usuario.nombre = data.nombre
    usuario.email = data.email
    usuario.id = data.id
    return usuario;
}