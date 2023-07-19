
    -----------------------------------------------------
     |||||   |  Nombre:                    | MODIFICAR |     <<< Si es editable
     O   O   |  Apellidos:                 | BORRAR    |     <<< Si es eliminable
       o     |  Edad:
     \---/   |  Email:
    ------------------------------------------------------

Estamos desarrollando un sistema de control para cursos:

    Alumnos matriculados en un curso

App de gestión de expedientes

    Aprobadores de un expediente
    Editores de un expediente

<expediente id=17>
    Aprobadores <listado-usuarios>
                        <usuario>
    Editores  <listado-usuarios>
                        <usuario>
<curso id=17>
    Alumnos <listado-usuarios>
                        <usuario>
    Profesores  <listado-usuarios>
                        <usuario>
    Administrativos  <listado-usuarios>
                        <usuario>

<solicitud-vacaciones>
    Empleado <usuario>
    Aprobador <usuario>

Administración de usuarios
    Detalle de un usuario: <usuario>
Todos los usuarios:
    <listado-usuarios>
        <usuario>


Felipe    MODIFICAR   BORRAR
     ^

    GUARDAR         CANCELAR ------> del modificar

                 ^

    GUARDAR         CANCELAR ------> del borrar

    Modificar avisa (se comunica) al padre          --->    Eventos
        Padre... quitará el botón de borrar

---

<listado-usuarios>---------------------+
       ^                               |
    Felipe  <   [Modificar] Borrar     |
    Menchu       Modificar  Borrar  <--|
    Rodrigo      Modificar  Borrar  <--|

    Felipe      Guardar    Cancelar
    Menchu
    Rodrigo

---

Curso
    Alumnos
        Felipe      [Modificar] Borrar
        Menchu       Modificar  Borrar

    Profesores
        Rodrigo      Modificar  Borrar

    En este caso, una comunicación hijo/padre padre/hijo no me resuelve la papeleta! -> REDUX