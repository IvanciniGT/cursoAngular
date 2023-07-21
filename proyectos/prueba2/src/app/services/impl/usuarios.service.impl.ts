import { Observable, catchError, map, of } from "rxjs";
import { Usuario } from "../../models/user.model";
import { ServicioUsuarios } from "../usuarios.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { toUser } from "src/app/mappers/user.mappers";

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


export class ServicioUsuariosImpl implements ServicioUsuarios{

    readonly urlBackEnd = "http://localhost:3000/usuarios/"

    constructor(private clienteHttp:HttpClient ){ // (1)
    }

    getUsuarios():Observable<Array<Usuario>>{
        return this.clienteHttp.get<Array<any>>(this.urlBackEnd)
        // Necesitamos convertir los json a objetos de tipo Usuario... Básicamente un Mapper
            .pipe( map( listaJson => listaJson.map( datosUsuariosEnJson => toUser(datosUsuariosEnJson))))
            .pipe( catchError( (error:HttpErrorResponse) => {
                // Dar trámite al error
                console.error(error);
                return of([new Usuario()])
            }))
    }

    getUsuario(id:number):Observable<Usuario>{
        return this.clienteHttp.get<Array<any>>(this.urlBackEnd+id)
        // Necesitamos convertir los json a objetos de tipo Usuario... Básicamente un Mapper
            .pipe( map( datos => toUser(datos)))
    }
}

// Service Worker: Es un programa JS que puedo instalar en el navegador y que se ejecuta de forma asíncrona a mi web
// Al JS que genera el HTML
// Componentes WEB -> Servicio -> ServiceWorker -> BEnd ( Si esta disponible o si le interesa)
//                                        v
//                                       Propia BBDD dentro del navegador
