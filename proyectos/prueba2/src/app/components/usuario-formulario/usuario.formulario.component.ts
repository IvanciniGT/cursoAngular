import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'usuario-formulario',                 // Nombre de la etiqueta HTML que estamos generando
    templateUrl: './usuario.formulario.component.html',  // La representación gráfica del componente
    styleUrls: ['./usuario.formulario.component.css']    // Estilos propios para este componente
})
export class UsuarioFormularioComponent implements OnInit {

    formulario!: FormGroup

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {

        this.formulario = this.formBuilder.group({
            nombre:    [null, [Validators.required, Validators.pattern("^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(( [a-z]{1,4})* [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$")]],
            apellidos: [null, [Validators.required, Validators.minLength(2)]],
            edad:      [null, [Validators.min(0), Validators.max(130)]],
            email:     [null, [Validators.required, Validators.email]],
        })
    }
    actualizacionFormulario() {
        console.log(this.formulario)
    }
}