import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/user.model';
//import { ServicioUsuariosImpl } from 'src/app/services/impl/usuarios.service.impl';
import { ServicioUsuarios } from 'src/app/services/usuarios.service';

@Component({
    selector: 'usuario',                 // Nombre de la etiqueta HTML que estamos generando
    templateUrl: './usuario.component.html',  // La representación gráfica del componente
    styleUrls: ['./usuario.component.css']    // Estilos propios para este componente
})
export class UsuarioComponent implements OnInit {

    errorMessage: string | undefined = undefined;
    datosUsuario!: Usuario;
    //servicioUsuarios!: ServicioUsuarios; (1)

    @Input() // Este dato, sácalo de un atributo de la marca HTML <usuario id="121212"/>
    id!: number;

    @Input() 
    editable: boolean = false;

    @Input() 
    borrable: boolean = false;

    constructor(private servicioUsuarios: ServicioUsuarios) { // Solicito la Inyección de dependencias
        // El private os evita tener que declarar la propiedad arribita(1) y hacer aqui abajo la asignación (2)

        // Habitualmente no es aquí donde vamos a hacer ese tipo de cosas ...
        // por ejemplo el pedir los datos del usuario...
        // this.servicioUsuarios = new ServicioUsuariosImpl();
        // YA la hemos liado.... Estamos metiendo una dependencia a la implementación de una interfaz
        // RUINA !!!!!
        //this.servicioUsuarios=servicioUsuarios; (2)
    }

    // Angular va a llamar a esta función cuando el componente WEB sea pinchado en el DOM
    ngOnInit(): void {
        // Este si es un buen sitio donde hacer ese tipo de cosas, como el pedir los datos del usuario
        const miUsuario: Observable<Usuario> = this.servicioUsuarios.getUsuario(this.id);
        //miUsuario.subscribe( (nuevoUsuario:Usuario) => this.datosUsuario = nuevoUsuario);
        miUsuario.subscribe(
            {
                next: (usuario: Usuario) => this.datosUsuario = usuario,
                error: (error: string) => this.errorMessage = error,
                complete: () => {
                    console.log("Se ha completado la petición de datos del usuario");
                    if (!this.datosUsuario) {
                        this.errorMessage = "No se pudo conseguir los datos del usuario";
                    }
                }
            })
    }

    log(mensaje:string) : void{
        alert(mensaje)
    }

}
