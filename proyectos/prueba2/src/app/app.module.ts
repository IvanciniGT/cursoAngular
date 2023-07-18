import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AsincronoComponent } from './components/asincrono/asincrono.component';

@NgModule({
  // Aquí definiremos nuestros propios componentes web (nuestras marcas HTML personalizadas)
  declarations: [
    AppComponent,
    UsuarioComponent,
    AsincronoComponent
  ],// Esto es lo que va a permitir que a partir de ahora, en los HTML pueda
    // empezar a usar la marca <usuario>
  // Otros modulos de Angular que necesitamos para que nuestra aplicación funcione
  imports: [
    BrowserModule
  ],
  // Servicios que necesitamos para que nuestra aplicación funcione
  // Por ejemplo: quiero tener TAL suministrador de diccionarios
  providers: [],
  // Componentes que vamos a iniciar cuando se cargue la aplicación
  bootstrap: [AppComponent]
})
export class AppModule { }
