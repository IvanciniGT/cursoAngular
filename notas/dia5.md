
En el componente listado-usuarios
    Una propiedad nueva (rellenada desde un atributo HTML) que sea: permitirCrear=true, false
    Si está a true, arriba del todo un botón NUEVO: que me muestre el formulario.... vacio

En el componente usuario
    que al apretar en el botón MODIFICAR salga el formulario.... relleno!



listado-usuarios
    formulairo-usuarios     
        Aceptar, Cancelar
            v
            v
            crear un usuario
    usuario

    usuario
        AccionConfirmable
            Aceptar, Cancelar
               v        v
        formulairo-usuarios
            Aceptar, Cancelar
                v
                v
                modificar un usuario
