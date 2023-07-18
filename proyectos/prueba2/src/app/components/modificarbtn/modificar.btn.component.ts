import { Component, EventEmitter, Output } from '@angular/core';
import { CancelarEvent, GuardarEvent, ModificarEvent } from './modificar.btn.events';

@Component({
    selector: 'modificar-btn',                 // Nombre de la etiqueta HTML que estamos generando
    templateUrl: './modificar.btn.component.html',  // La representación gráfica del componente
    styleUrls: ['./modificar.btn.component.css']    // Estilos propios para este componente
})
export class ModificarBtnComponent {

    private hanApretadoEnModificar : boolean = false

    @Output()
    onModificar = new EventEmitter<ModificarEvent>();

    @Output()
    onCancelar = new EventEmitter<CancelarEvent>();

    @Output()
    onGuardar = new EventEmitter<GuardarEvent>();

    clickEnModificar ():void {
        this.hanApretadoEnModificar = true;
        this.onModificar.emit(new ModificarEvent());
    }

    clickEnGuardar ():void {
        this.hanApretadoEnModificar = false;
        this.onGuardar.emit(new GuardarEvent());
    }

    clickEnCancelar ():void {
        this.hanApretadoEnModificar = false;
        this.onCancelar.emit(new CancelarEvent());
    }

    apretadoEnModificar(){
        return this.hanApretadoEnModificar;
    }

}
