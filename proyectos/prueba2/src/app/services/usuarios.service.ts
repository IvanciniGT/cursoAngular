import { Observable } from "rxjs";
import { Usuario } from "../models/user.model";
import { Injectable } from "@angular/core";

@Injectable()
export abstract class ServicioUsuarios {

    abstract getUsuario(id:number):Observable<Usuario>;
    //getUsuario(id:number):Promise<Usuario>;
    //getUsuario(id:number, callback:(usuario:Usuario) => void):void;

}