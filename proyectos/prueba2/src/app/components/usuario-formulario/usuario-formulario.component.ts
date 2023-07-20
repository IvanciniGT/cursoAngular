import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'usuario-formulario',                 // Nombre de la etiqueta HTML que estamos generando
    templateUrl: './usuario-formulario.component.html',  // La representación gráfica del componente
    styleUrls: ['./usuario-formulario.component.css']    // Estilos propios para este componente
})
export class UsuarioFormularioComponent implements OnInit {

    formulario!: FormGroup

    constructor() { }

    ngOnInit(): void {
        this.formulario = new FormGroup({
            nombre: new FormControl('Nombre'),
            apellidos:  new FormControl('Apellidos'),
            edad:  new FormControl(44),
            email:  new FormControl('ivan@ivan.com')
        })
    }

    actualizacionFormulario(){
        console.log(this.formulario)
    }

}