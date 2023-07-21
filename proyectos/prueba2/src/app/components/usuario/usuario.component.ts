import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/user.model';
//import { ServicioUsuariosImpl } from 'src/app/services/impl/usuarios.service.impl';
import { ServicioUsuarios } from 'src/app/services/usuarios.service';
import { AccionCanceladaEvent, AccionConfirmadaEvent, AccionSolicitadaEvent } from '../accion-confirmable/accion.confirmable.events';
import { UsuarioBorradoCanceladoEvent, UsuarioBorradoConfirmadoEvent, UsuarioBorradoSolicitadoEvent, UsuarioDeseleccionadoEvent, UsuarioModificacionCanceladaEvent, UsuarioModificacionConfirmadaEvent, UsuarioModificacionSolicitadaEvent, UsuarioSeleccionadoEvent } from './usuario.events';

enum EstadoDelComponente {
    NORMAL,
    EN_MODIFICACION,
    EN_BORRADO,
    SELECCIONADO
}

@Component({
    selector: 'usuario',                 // Nombre de la etiqueta HTML que estamos generando
    templateUrl: './usuario.component.html',  // La representación gráfica del componente
    styleUrls: ['./usuario.component.css']    // Estilos propios para este componente
})
export class UsuarioComponent implements OnInit, OnChanges {

    errorMessage: string | undefined = undefined;
    #estado:EstadoDelComponente = EstadoDelComponente.NORMAL;
    readonly Estados = EstadoDelComponente

    //servicioUsuarios!: ServicioUsuarios; (1)

    @Input() // Este dato, sácalo de un atributo de la marca HTML <usuario id="121212"/>
    id!: number;

    @Input()
    datosUsuario?: Usuario;

    @Input() 
    editable: boolean = false;

    @Input() 
    borrable: boolean = false;

    @Input() 
    seleccionable: boolean = false;

    @Input() 
    seleccionado: boolean = false;

    @Output()
    onModificacionSolicitada = new EventEmitter<UsuarioModificacionSolicitadaEvent>();

    @Output()
    onModificacionConfirmada = new EventEmitter<UsuarioModificacionConfirmadaEvent>();

    @Output()
    onModificacionCancelada = new EventEmitter<UsuarioModificacionCanceladaEvent>();

    @Output()
    onBorradoSolicitado = new EventEmitter<UsuarioBorradoSolicitadoEvent>();

    @Output()
    onBorradoConfirmado = new EventEmitter<UsuarioBorradoConfirmadoEvent>();

    @Output()
    onBorradoCancelado = new EventEmitter<UsuarioBorradoCanceladoEvent>();

    @Output()
    onSeleccionado = new EventEmitter<UsuarioSeleccionadoEvent>();

    @Output()
    onDeseleccionado = new EventEmitter<UsuarioDeseleccionadoEvent>();

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
        if(!this.datosUsuario){
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
        if(this.seleccionado){
            this.#estado = EstadoDelComponente.SELECCIONADO;
        }
    }
    // Esta función se dispara cuando un Input cambia en el tiempo
    // posterior a su carga inicial
    ngOnChanges(){
        if(this.#estado === EstadoDelComponente.SELECCIONADO ||
            this.#estado === EstadoDelComponente.NORMAL)
        this.#estado = this.seleccionado ? EstadoDelComponente.SELECCIONADO: EstadoDelComponente.NORMAL;
    }

    get estado():EstadoDelComponente{
        return this.#estado
    }

    // MAQUINA DE ESTADOS FINITOS
    cambiarEstado(event:any) : void{
        console.log(this.estado)
        switch(this.estado){
            case EstadoDelComponente.NORMAL:
                if (event instanceof AccionSolicitadaEvent){
                    if( event.actionId === "borrado" ){
                        this.#estado =EstadoDelComponente.EN_BORRADO
                        return this.onBorradoSolicitado.emit(new UsuarioBorradoSolicitadoEvent(this.datosUsuario!));
                    }else if( event.actionId === "edicion" ){
                        this.#estado =EstadoDelComponente.EN_MODIFICACION
                        return this.onModificacionSolicitada.emit(new UsuarioModificacionSolicitadaEvent(this.datosUsuario!));
                    }
                }else if (this.seleccionable && event instanceof PointerEvent){
                    this.#estado =EstadoDelComponente.SELECCIONADO
                    return this.onSeleccionado.emit(new UsuarioSeleccionadoEvent(this.datosUsuario!));
                }
                break
            case EstadoDelComponente.SELECCIONADO:
                if (event instanceof PointerEvent){
                    this.#estado =EstadoDelComponente.NORMAL
                    return this.onDeseleccionado.emit(new UsuarioDeseleccionadoEvent(this.datosUsuario!));
                }
                break
            case EstadoDelComponente.EN_MODIFICACION:
                console.log(event)
                if( event.actionId === "edicion" ){
                    if (event instanceof AccionCanceladaEvent){
                        this.#estado =EstadoDelComponente.NORMAL
                        return this.onModificacionCancelada.emit(new UsuarioModificacionCanceladaEvent(this.datosUsuario!));
                    }else if (event instanceof AccionConfirmadaEvent){
                        this.#estado =EstadoDelComponente.NORMAL
                        return this.onModificacionConfirmada.emit(new UsuarioModificacionConfirmadaEvent(this.datosUsuario!));
                    }
                }
                break
            case EstadoDelComponente.EN_BORRADO:
                if( event.actionId === "borrado" ){
                    if (event instanceof AccionCanceladaEvent){
                        this.#estado =EstadoDelComponente.NORMAL
                        return this.onBorradoCancelado.emit(new UsuarioBorradoCanceladoEvent(this.datosUsuario!));
                    }else if (event instanceof AccionConfirmadaEvent){
                        this.#estado =EstadoDelComponente.NORMAL
                        return this.onBorradoConfirmado.emit(new UsuarioBorradoConfirmadoEvent(this.datosUsuario!));
                    }
                }
                break
        }
        if (! (event instanceof PointerEvent) ){
            console.error("Evento no soportado en este estado", this.#estado, event)
        }
    }

}
