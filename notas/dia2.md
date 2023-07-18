
# Comunicaciones síncronas vs asíncronas

Comunicación síncrona: El solicitante queda a la espera de una respuesta por parte del receptor
Comunicación asíncrona: El solicitante solo lanza la petición y no queda a la espera de una respuesta por parte del receptor

En las comunicaciones asíncronas cómo hacemos para que el solicitante pueda obtener respuesta del receptor.

Componente WEB
    Usuario     <usuario id="1928372"/>

Ese componente quiere representar los datos de una persona.
Esos datos los sacará de un servicio Web en Backend.
    http://miservidor.com:8080/api/v1/usuario/1293847 -> JSON
Una vez recibidos, los mostrará por pantalla.

Esa comunicación, la queremos síncrona o asíncrona? 

Necesito que me lleguen los datos para mostrar la pantalla (representación del componente)?
NO. Necesito que me lleguen los datos para mostrar los datos.
Lo cual no implica:
- Ni que me tenga que quedar a la espera de respuesta
  Si me quedo a la espera... estoy perdiendo la oportunidad de ir haciendo cosas en paralelo, 
  Por ejemplo, quizás tengo una pantalla que debe mostrar información de 5 usuarios...
  Y me interesa hacer esas 5 peticiones en paralelo (o al menos de forma no bloqueante)
- Ni que no pueda sacar otro tipo de información mientras me llegan los datos: Cargando datos...
  Esto es lo que consigue una mayor interactividad  

Por los motivos anteriores, esa comunicación me interesa que sea ASINCRONA... COMO EL 99% de las comunicaciones que tenemos a nivel del frontal.
Hay distintas estrategias que usamos en comunicaciones asíncronas, para que el emisor se entere de una respuesta por parte del receptor de la comunicación

    COMPONENTE WEB                                          ??????
        Usuario    ----> getDatosUsuario(1928374)   --->  Esto tarda tiempo... poco o mucho, tarda
                                                          tiempo... tiempo preciado para otros menesteres
                         Una vez hecho esto, quiero 
                         hacer más cosas... mientras el otro contesta

                         Pero en paralelo, cuando el otro conteste,
                         quiero hacer algo con su respuesta...

Opciones que tenemos para resolver esta situación: 3 opciones diferentes:
- Promise | Future
    La función a la que llamamos asincronamente, devuelve una promesa.
    A esa promesa en un momento dado le puedo pedir el valor...
        Lo que ocurrirá es que la promesa podrá o no tener todavía un valor asignado.
- **Observables** (Patrón listener - subscripcion)
    La diferencia con el patr´0on promise es que un observable puede ir cambindo de valor según pasa el tiempo
- Callback
    A función a la que llamo, le paso otra función que deberá invocarme cuando termine su trabjo en el futuro.

---

Queremos tener un botón "MODIFICAR" (DATOS DEL USUARIO)
Ese botón se mostrará cuando me pase el atributo editable="true"

Si aprietan a ese botón:
PASO 1: Ese botón debe desaparecer... y en su lugar aparecer otros 2 botones:
    GUARDAR / CANCELAR
    Cualquiera de ellos, al pulsarse deberán ocultar estos 2 botones 
    y volver a mostrar el de Modificar
PASO 2: la representación debe cambiarse por un formulario

---

Comunicación entre componentes

    APP COMPONENT
    ----------------------
    :) Usuario 1
    :( Usuario 2
    ----------------------

        vvvvv     Tenemos una comunicación de PADRE A HIJO
                    APP COMPONENT ---> ID ----> Usuario Component
                    Hemos resuelto esta comunicación mediante? Mediante atributos html

    Usuario COMPONENT
    -----------------------------------------------------
     |||||   |  Nombre:                    | MODIFICAR |     <<< Si es editable
     O   O   |  Apellidos:
       o     |  Edad:
     \---/   |  Email:
    ------------------------------------------------------

        vvvvv En este caso el componente padre, no necesita pasar nada al hijo.
              Y el hijo al padre? 
                - Cuando apretemos en MODIFICAR, hay que avisar al padre
                - Cuando apretemos en GUARDAR,  hay que avisar al padre
                - Cuando apretemos en CANCELAR , hay que avisar al padre

            En este caso tenemos comunicaciones por un tubo, de hijo a padre!
            que vamos a resolver mediante: EVENTOS !!!!

    MODIFICAR COMPONENT
    ----------------        --------------------
       MODIFICAR        =>   GUARDAR   CANCELAR
    ----------------        --------------------


<button onClick="">
        ^^^
        EVENTO que se lanza y que se procesa por una función


Con este ejemplo sabremos realizar comunicaciones de padre a hijo.... y de hijo a padre
Habrá algún otro tipo de comunicación que necesite montar en una app?  SI
Comunicaciones entre componentes que no estén relacionados entre si
    Y AHI... será otra guerra MUY DIFERENTE !
    Para resolver este escenario echaremos mano de una librería que existe en JS
    precisamente para resolver este problema... no una librería... LA LIBRERIA
    Que usamos no solo en Angular, también en REACT, VUE.... =  REDUX