import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccionCanceladaEvent, AccionConfirmadaEvent, AccionSolicitadaEvent } from './accion.confirmable.events';

@Component({
    selector: 'accion-confirmable',                 // Nombre de la etiqueta HTML que estamos generando
    templateUrl: './accion.confirmable.component.html',  // La representación gráfica del componente
    styleUrls: ['./accion.confirmable.component.css']    // Estilos propios para este componente
})
export class AccionConfirmableComponent {

    private hanSolicitadoLaAccion : boolean = false

    @Input()
    mensajeAccion!:string;
    @Input()
    mensajeConfirmacion!:string;
    @Input()
    mensajeCancelacion!:string;
    @Input()
    actionId!:string;

    @Output()
    onAccionSolicitada = new EventEmitter<AccionSolicitadaEvent>();

    @Output()
    onAccionCancelada = new EventEmitter<AccionCanceladaEvent>();

    @Output()
    onAccionConfirmada = new EventEmitter<AccionConfirmadaEvent>();

    clickEnAccion (event:any):void {
        this.hanSolicitadoLaAccion = true;
        this.onAccionSolicitada.emit(new AccionSolicitadaEvent(this.actionId));
        event.stopPropagation()
    }

    clickEnConfirmar (event:any):void {
        this.hanSolicitadoLaAccion = false;
        this.onAccionConfirmada.emit(new AccionConfirmadaEvent(this.actionId));
        event.stopPropagation()
    }

    clickEnCancelar (event:any):void {
        this.hanSolicitadoLaAccion = false;
        this.onAccionCancelada.emit(new AccionCanceladaEvent(this.actionId));
        event.stopPropagation()
    }

    accionSolicitada(){
        return this.hanSolicitadoLaAccion;
    }

}
