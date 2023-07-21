import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/user.model';
import { AccionCanceladaEvent } from '../accion-confirmable/accion.confirmable.events';
import { UsuarioGuardadoEvent } from './usuario.formulario.event';

@Component({
    selector: 'usuario-formulario',                 // Nombre de la etiqueta HTML que estamos generando
    templateUrl: './usuario.formulario.component.html',  // La representación gráfica del componente
    styleUrls: ['./usuario.formulario.component.css']    // Estilos propios para este componente
})
export class UsuarioFormularioComponent implements OnInit {

    formulario!: FormGroup

    @Input()
    datosUsuario?:Usuario

    @Output()
    onCancelado = new EventEmitter<AccionCanceladaEvent>();

    @Output()
    onGuardado = new EventEmitter<UsuarioGuardadoEvent>();

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {

        this.formulario = this.formBuilder.group({
            nombre:    [this.datosUsuario?this.datosUsuario.nombre:null, [Validators.required, Validators.pattern("^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(( [a-z]{1,4})* [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$")]],
            apellidos: [this.datosUsuario?this.datosUsuario.apellidos:null, [Validators.required, Validators.minLength(2)]],
            edad:      [this.datosUsuario?this.datosUsuario.edad:null, [Validators.min(0), Validators.max(130)]],
            email:     [this.datosUsuario?this.datosUsuario.email:null, [Validators.required, Validators.email]],
        })
    }
    actualizacionFormulario() {
        let usuario= new Usuario()
        usuario.apellidos = this.formulario.value.apellidos
        usuario.edad = this.formulario.value.edad
        usuario.nombre = this.formulario.value.nombre
        usuario.email = this.formulario.value.email
        this.onGuardado.emit(new UsuarioGuardadoEvent(usuario));
    }
    formularioCancelado(){
        this.onCancelado.emit(new AccionCanceladaEvent("formulario"));
    }
}