import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/user.model';
import { ServicioUsuarios } from 'src/app/services/usuarios.service';
import { UsuarioBorradoCanceladoEvent, UsuarioBorradoConfirmadoEvent, UsuarioBorradoSolicitadoEvent, UsuarioDeseleccionadoEvent, UsuarioModificacionCanceladaEvent, UsuarioModificacionConfirmadaEvent, UsuarioModificacionSolicitadaEvent, UsuarioSeleccionadoEvent } from '../usuario/usuario.events';

enum EstadoDelComponente {
    SIN_SELECCIONADOS,
    CON_SELECCIONADOS,
    CON_USUARIO_EN_MODIFICACION,
    CON_USUARIO_EN_BORRADO,
    NUEVO_USUARIO
}

@Component({
    selector: 'listado-usuarios',                 // Nombre de la etiqueta HTML que estamos generando
    templateUrl: './listado.usuarios.component.html',  // La representación gráfica del componente
    styleUrls: ['./listado.usuarios.component.css']    // Estilos propios para este componente
})
export class ListadoUsuariosComponent implements OnInit {

    errorMessage: string | undefined = undefined;
    #estado:EstadoDelComponente = EstadoDelComponente.SIN_SELECCIONADOS;
    readonly Estados = EstadoDelComponente

    #datosUsuariosOriginales!: Array<Usuario>;
    #datosUsuarios!: Array<Usuario>;
    #idsUsuariosSeleccionados: Array<number> = [ ];
    #usuarioEnBorrado?: number;
    #usuarioEnModificacion?: number;

    nuevoUsuarioSolicitado(){
        if(! this.#asegurarEstado([EstadoDelComponente.SIN_SELECCIONADOS, EstadoDelComponente.CON_SELECCIONADOS], null)) return
        this.#estado = EstadoDelComponente.NUEVO_USUARIO;
        this.#idsUsuariosSeleccionados = [ ];
    }

    @Input() 
    permitirCrear: boolean = false;

    @Input() 
    editables: boolean = false;

    @Input() 
    borrables: boolean = false;

    @Input() 
    seleccionables: boolean = false;

    constructor(private servicioUsuarios: ServicioUsuarios) { 
    }

    ngOnInit(): void {
        const misUsuarios: Observable<Array<Usuario>> = this.servicioUsuarios.getUsuarios();
        misUsuarios.subscribe(
            {
                next: (usuarios: Array<Usuario>) => this.#datosUsuariosOriginales = this.#datosUsuarios = usuarios,
                error: (error: string) => this.errorMessage = error,
            })
    }

    get datosUsuarios(){
        return this.#datosUsuarios ? [... this.#datosUsuarios] : []
    }

    get estado():EstadoDelComponente{
        return this.#estado
    }

    nuevoUsuarioSeleccionado(evento:UsuarioSeleccionadoEvent){
        if(! this.#asegurarEstado([EstadoDelComponente.SIN_SELECCIONADOS, EstadoDelComponente.CON_SELECCIONADOS], evento)) return
        this.#idsUsuariosSeleccionados.push(evento.usuario.id);
        this.#estado = EstadoDelComponente.CON_SELECCIONADOS;
    }
    nuevoUsuarioDeseleccionado(evento:UsuarioDeseleccionadoEvent){
        if(! this.#asegurarEstado([EstadoDelComponente.CON_SELECCIONADOS], evento)) return
        this.#idsUsuariosSeleccionados = this.#idsUsuariosSeleccionados.filter( (id) => id !== evento.usuario.id );
        if(this.#idsUsuariosSeleccionados.length === 0)
            this.#estado = EstadoDelComponente.SIN_SELECCIONADOS;
    }
    usuarioBorradoSolicitado(evento:UsuarioBorradoSolicitadoEvent){
        if(! this.#asegurarEstado([EstadoDelComponente.SIN_SELECCIONADOS], evento)) return
        this.#estado = EstadoDelComponente.CON_USUARIO_EN_BORRADO;
        this.#usuarioEnBorrado = evento.usuario.id;
    }
    usuarioBorradoCancelado(evento:UsuarioBorradoCanceladoEvent){
        if(! this.#asegurarEstado([EstadoDelComponente.CON_USUARIO_EN_BORRADO], evento)) return
        this.#estado = EstadoDelComponente.SIN_SELECCIONADOS;
        this.#usuarioEnBorrado = undefined
    }
    usuarioBorradoConfirmado(evento:UsuarioBorradoConfirmadoEvent){
        if(! this.#asegurarEstado([EstadoDelComponente.CON_USUARIO_EN_BORRADO], evento)) return
        this.#estado = EstadoDelComponente.SIN_SELECCIONADOS;
        this.#usuarioEnBorrado = undefined
        console.log("Borrando usuario", evento.usuario)
        // TODO :
        // Sacarlo del listado de Usuarios
        // Llamar a alguien que realmente borre el usuario de donde tenga que ser borrado
    }
    usuarioModificacionSolicitada(evento:UsuarioModificacionSolicitadaEvent){
        if(! this.#asegurarEstado([EstadoDelComponente.SIN_SELECCIONADOS], evento)) return
        this.#estado = EstadoDelComponente.CON_USUARIO_EN_MODIFICACION;
        this.#usuarioEnModificacion = evento.usuario.id;
    }
    usuarioModificacionCancelada(evento:UsuarioModificacionCanceladaEvent){
        if(! this.#asegurarEstado([EstadoDelComponente.CON_USUARIO_EN_MODIFICACION], evento)) return
        this.#estado = EstadoDelComponente.SIN_SELECCIONADOS;
        this.#usuarioEnModificacion = undefined
    }
    usuarioModificacionConfirmada(evento:UsuarioModificacionConfirmadaEvent){
        if(! this.#asegurarEstado([EstadoDelComponente.CON_USUARIO_EN_MODIFICACION], evento)) return
        this.#estado = EstadoDelComponente.SIN_SELECCIONADOS;
        this.#usuarioEnModificacion = undefined
        console.log("Modificando usuario", evento.usuario)
        // TODO :
        // Modificarlo en el listado de Usuarios
        // Llamar a alguien que realmente modifique el usuario de donde tenga que ser modificado
    }

    #asegurarEstado(estadosCompatible:Array<EstadoDelComponente>, evento:any):boolean{
        if(!estadosCompatible.includes(this.estado)){
            console.error("Evento no soportado en este estado", this.#estado, evento)
            return false
        }
        return true
    }

    estaElUsuarioSeleccionado(id:number):boolean {
        return this.#idsUsuariosSeleccionados.includes(id)
    }

    sonSeleccionablesLosUsuarios():boolean {
        return this.seleccionables && 
            (this.estado == EstadoDelComponente.SIN_SELECCIONADOS || this.estado == EstadoDelComponente.CON_SELECCIONADOS)
    }

    esEditableElUsuario(id:number):boolean {
        return this.editables &&    // Esto es condición indispensable para que se muestreo no el botón de MODIFICAR
            (this.estado == EstadoDelComponente.SIN_SELECCIONADOS // Si nadie esta seleccionado, a todos les dejo modificar
                || (this.estado == EstadoDelComponente.CON_USUARIO_EN_MODIFICACION  // Pero si hay alguien en modificación, 
                    && this.#usuarioEnModificacion === id)                          // solo dejo que se le modifique a él
            )
    }

    esBorrableElUsuario(id:number):boolean {
        return this.borrables &&    // Esto es condición indispensable para que se muestreo no el botón de BORRAR
            (this.estado == EstadoDelComponente.SIN_SELECCIONADOS // Si nadie esta seleccionado, a todos les dejo borrar    
                || (this.estado == EstadoDelComponente.CON_USUARIO_EN_BORRADO  // Pero si hay alguien en borrado,
                    && this.#usuarioEnBorrado === id)                          // solo dejo que se le borre a él
            )
    }
    borrarUsuariosSeleccionados(){
        this.#idsUsuariosSeleccionados = [];
        this.#estado = EstadoDelComponente.SIN_SELECCIONADOS;
        console.log("Borrando usuarios", this.#idsUsuariosSeleccionados)
        // TODO :
        // Sacarlos del listado de Usuarios
        // Llamar a alguien que realmente borre los usuarios de donde tenga que ser borrado
    }

    estanTodosLosUsuariosSeleccionados():boolean {
                // Quitar los ids que no estén en #datosUsuario
        return this.#idsUsuariosSeleccionados.length === this.#datosUsuarios?.length
    }
    algunUsuarioSeleccionado():boolean {
        return this.#idsUsuariosSeleccionados.length > 0
    }
    seleccionarTodosLosUsuarios(){
        this.#idsUsuariosSeleccionados = this.#datosUsuarios.map( (usuario) => usuario.id );
        this.#estado = EstadoDelComponente.CON_SELECCIONADOS;
    }
    deseleccionarTodosLosUsuarios(){
        this.#idsUsuariosSeleccionados = [];
        this.#estado = EstadoDelComponente.SIN_SELECCIONADOS;
    }
    
    temporizadorFiltro:any;
    ultimoFiltroAplicado:string = ""
    filtrarUsuariosPor(texto:string){
        clearTimeout(this.temporizadorFiltro);
        this.temporizadorFiltro = setTimeout(()=>this.ejecutarFiltro(texto),200);
    }
    ejecutarFiltro(texto:string){
        if(texto === this.ultimoFiltroAplicado) return
        texto = texto.trim().toLowerCase();
        if(texto.length === 0){
            this.#datosUsuarios = this.#datosUsuariosOriginales
        }else{
            this.#datosUsuarios = this.#datosUsuariosOriginales.filter((usuario) => 
                usuario.nombre.toLowerCase().includes(texto) ||
                usuario.apellidos.toLowerCase().includes(texto) ||
                usuario.email.toLowerCase().includes(texto)
            )
        }
        this.ultimoFiltroAplicado = texto
    }

}
