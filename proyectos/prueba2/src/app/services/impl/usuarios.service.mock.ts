import { Observable, of } from "rxjs";
import { Usuario } from "../../models/user.model";
import { ServicioUsuarios } from "../usuarios.service";
import { Injectable } from "@angular/core";

@Injectable()
// Al poner este decorador, angular va a suministrar una instancia de este objeto cuando 
// alguien pida un: ServicioUsuariosImpl o un: ServicioUsuarios
// Quien genera la instancia de esta clase? YO? 
// new ServicioUsuariosImpl() esto lo tiene que escribir alguien... quien ?
// Angular... y de hecho Angular SOLO va a crear una única instancia
// de esta clase... que será la que inyecte a todos los que pidan un ServicioUsuarios:
// Conclusiones:
// 1º Esta clase tiene un comportamiento tipo: Singleton
// 2º Como angular va a ser quien cree esta clase.... en su constructor (1) podré_
//    Solicitar más inyecciones de dependencias para esta clase


export class ServicioUsuariosMock implements ServicioUsuarios{

    listadoUsuarios: Array<Usuario> = [];

    constructor(){ // (1)
        this.listadoUsuarios.push(this.crearUsuario(1, "Pepe", "Perez", 23, "pepe@pepe.com"));
        this.listadoUsuarios.push(this.crearUsuario(2, "Juan", "Garcia", 33, "juan@garcia.com"));
        this.listadoUsuarios.push(this.crearUsuario(3, "Luis", "Lopez", 43, "luis@lopez.com"));
    }

    crearUsuario(id:number, nombre:string, apellidos:string, edad:number, email:string):Usuario{
        const usuario = new Usuario();
        usuario.id = id;
        usuario.nombre = nombre;
        usuario.apellidos = apellidos
        usuario.edad = edad;
        usuario.email = email;
        return usuario;
    }
    getUsuarios():Observable<Array<Usuario>>{
        console.log(this.listadoUsuarios)
        return new Observable( (suscriptor) => {
            setTimeout( ()=>suscriptor.next(this.listadoUsuarios), 400 )
            setTimeout( ()=>suscriptor.complete(), 800 )
        });    
    }

    getUsuario(id:number):Observable<Usuario>{
       if (id<= this.listadoUsuarios.length) {
        return new Observable( (suscriptor) => {
                setTimeout( ()=>suscriptor.next(this.listadoUsuarios[id-1]), 400 )
                setTimeout( ()=>suscriptor.complete(), 800 )
            });
        } else {
            return new Observable( (suscriptor) => {
                setTimeout( ()=>suscriptor.error("Datos no conseguidos."), 1000 )
            });
        }
        // Un observer podrá llamar a next todas las veces que quiera...
        // Para acabar con un .complete() o un .error()
        /// Una vez llamas a cualquiera de esas funciones, el observer no podrá recibir ninguna notificacion adicional.
    }
}