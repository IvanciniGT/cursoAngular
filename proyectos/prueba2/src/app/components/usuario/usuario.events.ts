import { Usuario } from "src/app/models/user.model";

class UsuarioEvent{
    readonly usuario: Usuario
    constructor(usuario: Usuario){
        this.usuario=usuario;
    }
}

export class UsuarioModificacionSolicitadaEvent extends UsuarioEvent{
    constructor(usuario: Usuario){
        super(usuario);
    }
}

export class UsuarioModificacionConfirmadaEvent extends UsuarioEvent{
    constructor(usuario: Usuario){
        super(usuario);
    }
}

export class UsuarioModificacionCanceladaEvent extends UsuarioEvent{
    constructor(usuario: Usuario){
        super(usuario);
    }
}

export class UsuarioBorradoSolicitadoEvent extends UsuarioEvent{
    constructor(usuario: Usuario){
        super(usuario);
    }
}

export class UsuarioBorradoConfirmadoEvent extends UsuarioEvent{
    constructor(usuario: Usuario){
        super(usuario);
    }
}

export class UsuarioBorradoCanceladoEvent extends UsuarioEvent{
    constructor(usuario: Usuario){
        super(usuario);
    }
}


export class UsuarioSeleccionadoEvent extends UsuarioEvent{
    constructor(usuario: Usuario){
        super(usuario);
    }
}

export class UsuarioDeseleccionadoEvent extends UsuarioEvent{
    constructor(usuario: Usuario){
        super(usuario);
    }
}
