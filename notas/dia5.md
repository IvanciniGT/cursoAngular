
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

---

Componentes Web
- usuario
- listado-usuarios
- accion-confirmable
- formulario-usuario

Servicio
- Servicio de Usuarios

Los Servicios al igual que los componentes Web son Componentes de mi aplicación... y les aplico los principios SOLID

Quiero poder desarrollar un componente de forma independiente a otros componentes.
Eso está muy bien... es muy fácil, cuando mi componente no depende de otros.

Al acabar de desarrollarlo, le haré sus pruebas: Unitarias
Qué es una prueba unitaria? Es una prueba que hago sobre una característica de un componente/sistema AISLADO DE OTROS

La aventura nos viene cuando desarrollamos componentes que dependen de otros componentes:
- 1... para desarrollar, necesito el otro componente del que dependo.
- 2... para probar... también necesito el otro componente.

Pero... en cuanto mi componente depende de otros... puedo hacerle pruebas unitarias? 
SI PUEDO, pero necesito AISLARLO
De hecho... un problema frecuente es que ese otro componente del que dependo no existe todavía (aún no está desarrollado tampoco)
Y yo necesito ni que sea algo para hacer pruebas.
Aquí sale el concepto de TestDouble (mal llamados mocks):
- Stub  \
- Fake  |
- Spy    >      Martin Fowler
- Mock  |
- Dummy /

Para hacer una prueba unitaria, aislo el componente.
Después de las unitarias, me meto con la de integración....
Una prueba de Integración prueba la COMUNICACION entre componentes

      Integración
          v
    A -------------> B
    ^                ^
    Unitarias        Unitarias


Componente Usuario WEB
<usuario id="22843">
... Y ahora estamos haciendo unas pruebas sobre él... no automatizadas... manuales... pero pruebas
¿Qué tipo de pruebas hemos realizado? Pruebas unitarias... no automatizadas
Y para ello, lo que hemos hecho ha sido MONTAR UN FAKE del servicio

    A ------------> B
     b <------------ b

Al aislar al componente A en la comunicación con B, podemos usar diferentes estrategias:
    Montar un B ficticio... que devuelva unos datos fijos... ante cualquier petición.           -> STUB 
    Cómo en este caso sé que A llamó a B?
        En nuestro caso, hemos montado algo que devuelve datos... con cierta lógica... 
        en función de parámetros en la petición                                                 -> FAKE
    
    Un FAKE, llevado al extremo es: El sistema real que hay que implementar

En ocasiones... tengo otro problema más grande...
y es que tengo una comonicación del tipo:

    A ---------> B   mandar Email
      ---------> C
      <---------

      Si quiero probar que A habla bien con C... Me importa B en ese caso? NO... pero ... necesito una implementación de B
        Necesito un DUMMY de B

            class ServicioEmailDummy extends ServicioEmail{
                sendEmail(datos){
                    // Vale!
                }
            }
       
       Si quiero probar que A llama a B?  Entonces monto un Spy
       Que es una implementación que anota las llamadas que se le hacen.

            class ServicioEmailSpy extends ServicioEmail{
                llamadas=[]
                sendEmail(datos){
                    this.llamadas.push(datos);
                }
                getLlamadas(){
                    return this.llamadas;
                }
            }

        Puedo montar un Spy inteligente... que según recibe una llamada, valide que los datos que recibe son correctos -> MOCK

        En ocasiones... quiero comprobar en comunicaciones de tipo  A---->B
                                                                     <----
                                                                        1º Que a recibe los datos... STUB/FAKE
                                                                        2º Que los datos que A manda están bien SPY/MOCK

        Y en muchos casos, montamos las 2 cosas JUNTAS.

---

Vamos a montar un servidor de Backend de mentirijilla!
...
Para qué? Para probar otra comunicación.... para aislar a otro componente... dando un elemento B con el que se comunique controlado... que sé la respuesta que va a mandar

A qué componente me refiero? El servicio