import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/user.model';
import { ServicioUsuarios } from 'src/app/services/usuarios.service';
import { AccionCanceladaEvent, AccionConfirmadaEvent, AccionSolicitadaEvent } from '../accion-confirmable/accion.confirmable.events';
import { UsuarioBorradoCanceladoEvent, UsuarioBorradoConfirmadoEvent, UsuarioBorradoSolicitadoEvent, UsuarioDeseleccionadoEvent, UsuarioModificacionCanceladaEvent, UsuarioModificacionConfirmadaEvent, UsuarioModificacionSolicitadaEvent, UsuarioSeleccionadoEvent } from '../usuario/usuario.events';

enum EstadoDelComponente {
    SIN_SELECCIONADOS,
    CON_SELECCIONADOS
}

@Component({
    selector: 'listado-usuarios',                 // Nombre de la etiqueta HTML que estamos generando
    templateUrl: './listado.usuarios.component.html',  // La representación gráfica del componente
    styleUrls: ['./listado.usuarios.component.css']    // Estilos propios para este componente
})
export class ListadoUsuariosComponent implements OnInit {

    errorMessage: string | undefined = undefined;
    #estado:EstadoDelComponente = EstadoDelComponente.SIN_SELECCIONADOS;
    readonly Estados = EstadoDelComponente

    datosUsuarios!: Array<Usuario>;
    idsUsuariosSeleccionados: Array<number> = [ ];

    @Input() 
    editables: boolean = false;

    @Input() 
    borrables: boolean = false;

    @Input() 
    seleccionables: boolean = false;

    constructor(private servicioUsuarios: ServicioUsuarios) { 
    }

    ngOnInit(): void {
        const misUsuarios: Observable<Array<Usuario>> = this.servicioUsuarios.getUsuarios();
        //miUsuario.subscribe( (nuevoUsuario:Usuario) => this.datosUsuario = nuevoUsuario);
        misUsuarios.subscribe(
            {
                next: (usuarios: Array<Usuario>) => this.datosUsuarios = usuarios,
                error: (error: string) => this.errorMessage = error,
            })
        
    }

    get estado():EstadoDelComponente{
        return this.#estado
    }
/*
    // MAQUINA DE ESTADOS FINITOS
    cambiarEstado(event:any) : void{
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
*/
}
