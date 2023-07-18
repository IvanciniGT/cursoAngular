import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'usuario',                 // Nombre de la etiqueta HTML que estamos generando
    templateUrl: './usuario.component.html',  // La representación gráfica del componente
    styleUrls: ['./usuario.component.css']    // Estilos propios para este componente
})
export class UsuarioComponent {

    textoAMostrarMediantePromesa: string;
    textoAMostrarMedianteCallback: string;
    textoAMostrarMedianteObservable: string;

    // Cuando se invoca al constructor de esta clase? 
    //
    constructor() {
        this.textoAMostrarMediantePromesa = "Recien creado el componente"
        this.textoAMostrarMedianteCallback = "Recien creado el componente"
        this.textoAMostrarMedianteObservable = "Recien creado el componente"
        this.trabajarConPromesas();
        this.trabajarConCallbacks();
        this.trabajarConObservables();
    }

    trabajarConObservables(){
        // LLamar a una función que tardará lo que tarde en ejecutarse...
        // pero que me devolverá un Observable
        let miObservable:Observable<string> = this.funcionQueGeneraObservable();
        // Lo que haré será subscribirme a ese observable
                                // Paso una función que se debe ejecutar cada vez que el observable
                                // Cambie de valor
        miObservable.subscribe( (texto) => this.textoAMostrarMedianteObservable = texto )

        //   observerOrNext?: Partial<Observer<string>> | ((value: string) => void) | undefined
    }

    /* Esta función será algo que normalmente alguien habrá escrito por mi: FRAMEWORK*/
    funcionQueGeneraObservable():Observable<string>{
            return new Observable( (suscriptor) => {
                setTimeout( ()=>suscriptor.next("Hola Amigo 5"), 1000 )
                setTimeout( ()=>suscriptor.next("Hola Amigo 4"), 2000 )
                setTimeout( ()=>suscriptor.next("Hola Amigo 3"), 7000 )
            });
    }


    trabajarConCallbacks(){
        // Llamar a otra función... que hace sus cosas... y tarda un huevo en contestar...
        // En este caso, lo que voy a hacer es a esa función que tarda un huevo en contestar,
        // pasarle una función
        this.funcionQueRecibeCallback("amigo", (texto:string) => this.textoAMostrarMedianteCallback = texto );
        this.textoAMostrarMedianteCallback = "Esperando respuesta mediante callback"

        // de callback, es decir, una función que ella deberá ejecutar, cuando haya acabado su trabajo.
        // Y la vamos a llamar asincronamente
    }

    /* Esta función será algo que normalmente alguien habrá escrito por mi: FRAMEWORK*/
    funcionQueRecibeCallback( texto:string , callback:(argumento:string) => void ){
        // Hará cosas que tardarán un rato, pero las hará asíncronamente
        // Y cuando acabe, ejecutará mi función de callback
        setTimeout( ()  => {
            // Esta función aquí haría cositas...
            // Y a los 5 segundos cuando acabe, invoca a la función de callback
            callback("HOLA "+ texto); // Este es el valor que se asigna a la promesa
        } , 3000);
    }


    trabajarConPromesas() {
        // Quiero hacer una comunicación asíncrona y esa comunicación me devolverá una promesa
        let laPromesa: Promise<string> = this.funcionQueDevuelvePromesa();
        // Deja configurado que cuando la promesa sea resuelta se ejecute una función: 
        // En este caso una función que tomará el valor asignado a la promesa 
        // y cambia el texto a mostrar con ese valor
        laPromesa.then( valorDeLaPromesa => this.textoAMostrarMediantePromesa = valorDeLaPromesa)
        this.textoAMostrarMediantePromesa = "Esperando texto"
    }

    /* Esta función será algo que normalmente alguien habrá escrito por mi: FRAMEWORK*/
    async funcionQueDevuelvePromesa() {
        // Hemos montado una función que cuando la invoco que hace?
        // Dejar programada una tarea que a los 5 segundos rellene el valor de una promesa que hemos creado
        // Y devolver la promesa
        // Que ocurre antes? que se devuelva la promesa o que se ejecute la función que rellena el valor de la promesa?
        return new Promise<string>( (resolve, reject) => {
            // Que deja configurada una tarea a los 5 segundo que asigna el valor a la promesa
            setTimeout( ()  => {
                resolve("HOLA AMIGO"); // Este es el valor que se asigna a la promesa
            } , 5000);
        } );
    }

}

/*
function double(numero:number):number{
    return numero * 2;
}

//double es una función
//double(2) es una llamada a una función... que devuelve un number

//double(2) no es una función... es un number

let resultado:(numero:number)=>number;
resultado = double;

let resultado2:number;
resultado2 = double(5);
*/



