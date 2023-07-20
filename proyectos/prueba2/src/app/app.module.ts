import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AsincronoComponent } from './components/asincrono/asincrono.component';
import { ServicioUsuariosMock } from './services/impl/usuarios.service.mock';
import { ServicioUsuarios } from './services/usuarios.service';
import { AccionConfirmableComponent } from './components/accion-confirmable/accion.confirmable.component';
import { ListadoUsuariosComponent } from './components/listado-usuarios/listado.usuarios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioFormularioComponent } from './components/usuario-formulario/usuario-formulario.component';

@NgModule({
  // Aquí definiremos nuestros propios componentes web (nuestras marcas HTML personalizadas)
  declarations: [
    AppComponent,
    UsuarioComponent,
    AccionConfirmableComponent,
    AsincronoComponent,
    ListadoUsuariosComponent,
    UsuarioFormularioComponent
  ],// Esto es lo que va a permitir que a partir de ahora, en los HTML pueda
    // empezar a usar la marca <usuario>
  // Otros modulos de Angular que necesitamos para que nuestra aplicación funcione
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  // Servicios que necesitamos para que nuestra aplicación funcione
  // Por ejemplo: quiero tener TAL suministrador de diccionarios
  providers: [{ provide: ServicioUsuarios, useClass: ServicioUsuariosMock}], // Aqui estamos configurando la Inyección de dependencias
                                    // Eso funcionaría si esa clase se fuese a pedir tal cual
  
  // Componentes que vamos a iniciar cuando se cargue la aplicación
  bootstrap: [AppComponent]
})
export class AppModule { }
