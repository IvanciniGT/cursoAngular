import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'usuario-formulario',                 // Nombre de la etiqueta HTML que estamos generando
    templateUrl: './usuario.formulario.component.html',  // La representación gráfica del componente
    styleUrls: ['./usuario.formulario.component.css']    // Estilos propios para este componente
})
export class UsuarioFormularioComponent implements OnInit {

    formulario!: FormGroup
    direcciones!: FormArray

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {

        this.direcciones = this.formBuilder.array([])
        this.formulario = this.formBuilder.group({
            nombre:    [null, [Validators.required, Validators.pattern("^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(( [a-z]{1,4})* [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$")]],
            apellidos: [null, [Validators.required, Validators.minLength(2)]],
            edad:      [null, [Validators.min(0), Validators.max(130)]],
            email:     [null, [Validators.required, Validators.email]],
            conduce:   'no',
            tienesVehiculo:   true,
            genero:     'No lo digo',
            direcciones: this.direcciones
        })
        this.formulario.addAsyncValidators
    }
    nuevaDireccion(): void {

        let direccion = this.formBuilder.group({
            via:   null,
            numero:   null,
            cp:   [null, [], [UsuarioFormularioComponent.validarCP] ],
            poblacion:   null,
        })
        this.direcciones.push(direccion);
        // En cada control, damos 3 cosas:
        // - Valor inicial
        // - Validaciones
        // - Validaciones asíncronas!
    }

    actualizacionFormulario() {
        console.log(this.formulario)
        //let valores = this.formulario.value;
        //valores.direcciones
        //for (let direccion of valores.direcciones)...
    }

    //static cpValidationTimeout: any= undefined;

    static validarCP (campoCodigoPostal: AbstractControl):Observable<ValidationErrors | null>{
        if(!campoCodigoPostal.value) return of(null);
        let respuestaDelBack: Observable<boolean>;
            respuestaDelBack=UsuarioFormularioComponent.validarCPMedianteLlamadaAServicioRest(campoCodigoPostal.value)

        return new Observable( (subscriptor) => {
            respuestaDelBack.subscribe( valido => {
                if(valido) subscriptor.next(null)
                else subscriptor.next({"cp_invalido": true})
                subscriptor.complete()
            })
        })
    }
/*
        console.log("Validando: "+campoCodigoPostal.value)
        if(UsuarioFormularioComponent.cpValidationTimeout){
            clearTimeout(UsuarioFormularioComponent.cpValidationTimeout)
        }
        setTimeout( () => UsuarioFormularioComponent.validarCPMedianteLlamadaAServicioRest(campoCodigoPostal.value), 2000);
*/

    static validarCPMedianteLlamadaAServicioRest(cp:string): Observable<boolean>{ // Esta función debe ser asíncrona!
        // El servicio rest me devuelve si el cp es valido(true) o no (false)
        // Qué debe devolver esta función?
        return new Observable( (suscriptor) => {
            setTimeout( ()=>suscriptor.next(cp.startsWith("2")), 2000 )
        })
        
    }

}


        /*
        this.formulario = new FormGroup({
            nombre: new FormControl('',[
                Validators.required,
                Validators.pattern("^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(( [a-z]{1,4})* [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$")
            ]),
            apellidos:  new FormControl('',[
                Validators.required,
                Validators.minLength(2)
            ]),
            edad:  new FormControl('',[
                Validators.min(0),
                Validators.max(130)
            ]),
            email:  new FormControl('', [
                Validators.required,
                Validators.email
            ])
        })*/