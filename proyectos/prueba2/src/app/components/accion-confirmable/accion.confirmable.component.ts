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

    clickEnAccion ():void {
        this.hanSolicitadoLaAccion = true;
        this.onAccionSolicitada.emit(new AccionSolicitadaEvent(this.actionId));
    }

    clickEnConfirmar ():void {
        this.hanSolicitadoLaAccion = false;
        this.onAccionConfirmada.emit(new AccionConfirmadaEvent(this.actionId));
    }

    clickEnCancelar ():void {
        this.hanSolicitadoLaAccion = false;
        this.onAccionCancelada.emit(new AccionCanceladaEvent(this.actionId));
    }

    accionSolicitada(){
        return this.hanSolicitadoLaAccion;
    }

}
