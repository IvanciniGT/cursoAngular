# Angular

Un framework para el desarrollo de frontends de apps WEB.
Quién está detrás? Google

Frameworks equivalentes? Vue, React, Polymer

Antiguamente el frontend (HTML+CSS) de apps web, se generaba dónde? En el servidor:
- JAVA: jsps
- .net: asps
- php

Esto ya no nos gusta, desde hace mucho. Por qué?
- Mucha menos interactividad que las actuales
  - Cada acción que hacía una persona en un navegador, lanzaba una petición a un Servidor... que era procesada,
    y generaba nuevo HTML... que se mandaba de vuelta al navegador.
  - Hoy en día, lo que montamos son SPA: Single Page Application:
    Generamos una página html única... que va mutando, mediante:
        La generación de nuevos trozos de HTML en respuesta a peticiones que hacemos a un servidor o no.
        Esos trozos de HTML los genero dentro del propio navegador, mediante código JS
- Menor rendimiento... requería de servidores mucho más potentes.
- Hoy en día trabajamos con otras arquitecturas: Sistema monolítico
    Sistema monolítico: Tengo una única app que realiza toda la funcionalidad... esto presentaba numeros problemas:
        - Poco código reutilizable
        - Mucho más complejo escalar el sistema
        - Evolutivos / Mntos erán más complejos:
          - Necesito redeplegar la app entera cuando hay un cambio
- Código poco reutilizable
    Hoy en día generamos funciones que crean trozos de HTML ... que quiero reutilizar... 
    Pero eso se ha estandarizado: WebComponent:
    - Una marca propia que extiende al HTML:
      <Carrusel>
      <Usuario id="1827436438">
      <Animalito>
    - Esas marcas tendrán asociada su propia REPRESENTACION GRAFICA: HTML
                                   su propia lógica 
        Hoy en día existe un estándar de la W3C (Tim Berners Lee: HTTP + HTML), css, xml, xpath, xquery...
            WebComponents

---

Qué características tiene un entorno de producción que lo diferencian de otros entornos:
- Alta disponibilidad 99%, 99.9%, 99.99%
- Escalabilidad: Capacidad de ajustar la infra/software a las necesidades de cada momento

    app3: LO MAS HABITUAL HOY EN DIA: INTERNET
        Dia n       100 usuario
        Dia n+1     100000 usuario      ESCALABILIDAD HORIZONTAL: Más máquinaS!
        Dia n+2     1000 usuario        Cluster -> Clouds
        Dia n+3     2000000 usuario

---
Aplicación WEB de Animalitos Fermín
Navegador

Sistema de Animalitos Fermín
- App de movil iOS          <- 300k telefonos v1.1
- App de movil Android      <- 300k telefonos v1.0
- Navegador                 <- 300k NAVEGADORES v1.1
- Altavoz inteligente 
- Sistema de voz interactiva
- Apps de terceros queriendo usar el sistema de amilaitos Fermín

Protocolo de comunicaciones: http (SOAP , REST)

Servidor

BBDD animalitos         altaDeNuevoAnimalito    --> -JSON- / XML
                            v1.0 -> v1.1 (+pics)
                        recuperarAnimalitos
                        detalleDeUnAnimalito

---

JS -> TS

Javascript: Lenguaje de programación... aunque su nombre formal es: ECMA Script

- Compilados / interpretados
    JS es interpretado... requiere de un INTERPRETE
    Quién proporciona ese intérprete en una app web? El navegador

    Beneficios Compilados
        Tienen un proceso llamado compilación... en el cuál:
            - Traducen el código del lenguaje de turno a código directamente ejecutable por el SO de un cliente
            - Se hace una revisión de ciertos aspectos del código (identificación de errores)
    Beneficios de los Interpretados
        A todo el mundo les distribuyo el mismo código.. el código escrito en el leng de prog de turno.

- En base al paradigma(s) de programación que usan:
  - Lenguajes imperativos       Damos instrucciones en forma de ORDENES que se procesan una trás otra:
                                    if, else, for, while, switch
  - Lenguajes procedurales      Cuando el lenguaje me permite crear mis propias procedimientos, funciones
                                    métodos.... e invocarlos
                                Qué nos ofrecen: + reutilización de código
  - Lenguajes funcionales       Cuando el lenguaje me permite que una variable apunte a una función...
                                e invocar esa función posteriormente desde la variable.
                                El concepto es sencillo... el tema es el impacto de esto:
                                - Puedo pasar a una función otra función como argumento
                                - Puedo hacer que una función devuelva otra función
  - Lenguajes OO                Cuando el lenguaje me permite definir mis propios tipos de datos
                                con sus propiedades y funciones.

                                Tipos de datos          Propiedades                 Funciones
                                string                  secuencia de caracteres     toUppercase trim split
                                date                    año, mes, dia               formateate según formato X
                                list
                                usuario                 nombre, apellidos, edad     esMayorDeEdad()

- De tipado estático y de tipado dinámico.

En lenguajes de tipado estático es necesario definir un tipo de dato asociado a una variable, de forma que la variable solo puede apuntar a datos de ese tipo. En los lenagujes de tipado dinámico, esto no es así. Una variable puede apuntar a datos de cualquier tipo.

Qué es mejor? estático o dinámico?  AQUI NO DEPENDE !!!!! ESTATICO !!!!
Qué es más cómodo en proyectos pequeños? El dinámico.

Beneficios del tipado estático:
- 1º Un desarrollador, nada más ver la definición de una variable tiene claro el tipo de cosas (datos) al que puede apuntar. Eso es clave sobre todo si no es mi código.
- 2º Un desarrollador, nada más ver la definición de una función, tiene claro el comportamiento de la misma... o al menos cómo comunicarse con ella:

    public Informe generaInforme(String titulo, Datos datos);
    function generarInforme(titulo, datos);

Los lenguajes de tipado dinámico no valen para proyectos grandes.... y por ello inventan patrañas asquerosas cuando necesitan usarse para proyectos más grandes:

    python:
        def generarInforme(titulo:str , datos:[]): None     # En python esas cosas son documentación. 
            pass
    js... no hay nada... y por eso se inventaron un nuevo lenguaje TypeScript
        Claro.. los navegadores ejecutan TypeScript? NO
        Hay que convertir el código TypeScript a JS... en un proceso que llamaremos: TRANSPILACION
        Aprovechando el momento de la transpilación para hacer una validación de tipos de datos.

Esa transpilación se hace por un programa (transpilador) escrito en lenguaje JS...
Y para ejecutar una transpilación en mi computadora, fuera de un navegador necesito: Node

Para optimizar el transporte de datos del servidor web al navegador, me interesa mandar 200 fichero js? o 1? 1
Me interesan más funciones que se llamen: "generarInformeDeProgreso" o "a".

De forma que cuando genero el distribuible de mi aplicación, vamos a lanzar un proceso posterior a la transpilación que es el minificado, que aglutinará los 300 ficheros js que tengo + los 17000 que haya como dependencias y los meteré todos en un fichero .js que es lo que mandaré al cliente... aprovechando para cambiar el nombre de funciones, variables... por nombres más cortos... y también a a quitar espacios en blanco innecesarios, saltos de linea, etc.

El programa que hace esa minificación también está escrito en JS ... y usaré node para correrlo.

Por otro lado, cuando nuestro proyecto esté acabado, tendremos una colección de ficheros .js, .css, imágenes variadas...
Quién ejecuta esos archivos? Un navegador.... 
Y quien le pasa al navegador los archivos? Servidor web local
Puedo montar un servidor web en local cómodamente con Node

Qué es Node?

Es el antiguo interprete de JS que existía en el navegador Chromium (-> Chrome, Edge, Opera, Safari.... menos Firefox !!!!)
Lo arrancaron del navegador de forma que pudiera ejecutarse JS desde fuera de un navegador... (es el equivalente a la JVM)

Necesitamos Node para ejecutar una app Angular? Para nada!
Necesitamos Node para crear una app Angular!

---

Hoy en día usamos Arquitecturas distribuidas, metodologías ágiles, y frameworks que nos ayuden a montar proyectos que usen una arquitectura distribuida y que se elaboren según metodologías ágiles.

Quiero usar una BBDD Relacional: MariaDB, MySQL, Oracle, BD2...
En el mundo WEB .... Mongo

Hoy en día queremos aplicaciones distribuidas... con muchos componentes independientes ... que se comuniquen entre si. Para conseguir esto, hoy en día nos apoyamos en los principios de desarrollo SOLID !
Son 5 principios... enunciados a lo largo del tiempo por distintos desarrolladores bastante consagrados, y posteriormente recopilados por otro de esos grande desarrolladores (EL TIO BOB)

S Principio de responsabilidad única (Single responsibility principle)
O Principio de abierto/cerrado (Open/closed principle)
L Principio de sustitución de Liskov (Liskov substitution principle)
I Principio de segregación de la interfaz (Interface segregation principle)
D Principio de inversión de la dependencia (Dependency inversion principle) ***

                                                    JS          JAVA        .net
Principio de la inversión de dependencias
    ^^^
Inyección de dependencias
    ^^^
Control de Inversión                                Angular     Spring      .netcore


---

JAVA

Quiero montar una aplicación que funcionará desde una terminal para buscar significados de palabras en distintos idiomas.

Cuántos proyectos quiero?  .jar? 3 (querré 3 proyectos maven) (en 3 repos de git)

- Front (aplicación de terminal)
    v
- API de comunicaciones
    v
- Back (gestión de palabras e idiomas)

# API: Colección de Interfaces: com.diccionario

    interface Diccionario {
        String getIdioma();
        boolean existe(String palabra);
        Optional<List<String>> getSignificados(String palabra) ;
            lista vacia     MIERDA ! No es ambigua
            null            MIERDA ! No es ambigua
            exception       MIERDA ! No es ambigua.. pero a cambio usa una exception para controlar lógica
                                    GRacias al throws NoSuchWordException
    }

    interface SuministardorDeDiccionarios{
        boolean tienesDiccionarioDe(String idioma);
        Optional<Diccionario> getDiccionario(String idioma);
    }

# Implementar el API: 

## SuministradorDeDiccionariosDesdeFichero: com.diccionario.ficheros

    import com.diccionario.SuministradorDeDiccionarios;
    public class SuministradorDeDiccionariosDesdeFichero implements SuministradorDeDiccionarios {
        // Constructor
        ...
    }

## SuministradorDeDiccionariosDesdeBBDD: com.diccionario.bbdd

# Implemento la app:

import com.diccionario.Diccionario;
import com.diccionario.SuministradorDeDiccionarios;
// import com.diccionario.ficheros.SuministradorDeDiccionariosDesdeFichero;
    // Esta linea es la maldad en estado puro... Es lo peor que podemos hacer en un proyecto de software.
    // Nos acabamos de MEAR en el ppo de INVERSION DE DEPENDENCIAS

public class App {

    private SuministradorDeDiccionarios miSuministrador;

    public App(SuministradorDeDiccionarios miSuministrador){
                // Inyección de dependencias
                // Me permite respetar el PPO de inversión de dependencias
        this.suministrador=suministrador
    }

    public void procesarPeticion(String idioma, String termino ){
        // ...
        
        List<String> definiciones = null;
        if (miSuministrador.tienesDiccionarioDe(idioma)){
            Diccionario miDiccionario = miSuministrador.getDiccionario(idioma).get();
            if(miDiccionario.existe(palabra)){
                definiciones = miDiccionario.getSignificados(palabra).get();
            }
        }
        // ... Hago lo que necesito con las definiciones...las imprimo... lo que sea...
    }

}

## Dependencias

    App   >     API    <    Implementación del API 1

    app.jar                             MAVEN
                                            dependencies: diccionarios-api, diccionarios-desde-fichero
    diccionarios-api.jar                MAVEN
                                            dependencies: NINGUNA 
    diccionarios-desde-fichero.jar      MAVEN
                                            dependencies: diccionarios-api

## PPO de inversion de dependencias:

Un componente de alta nivel no puede depender de implementaciones de modulos de más bajo nivel... solo de abstracciones (interfaces)

## Patrón de inyección de dependencias

Es  un patrón de diseño orientado a objetos, en el que se suministran objetos a una clase en lugar de ser la propia clase la que cree dichos objetos


## Inversión de control

Es otro patrón de diseño de software en el que el flujo de ejecución de un programa se invierte respecto a los métodos de programación tradicionales. 
En los métodos de programación tradicionales la interacción se expresa de forma imperativa haciendo llamadas a procedimientos o funciones.
Al usar un patrón de inversión de control, el flujo del programa se delega al Framework que ofrezca el control de inversión... 
El framework es el que EJECUTA mi programa.
Es el que va a crear el new App(unaInstanciaDeUnSuministrador)

    Escribe lo que java sería el main

    En java con Spring: 
        
        public class App {
            public static void main(String[] args){
                SpringApplication.run(App.class); // Inversión de control.
            }
        }

    En Angular, será igual... parecido:
        Tendremos un fichero main.js
        
            (ANGULAR) bootstrapModule(AppModule); // Inversión de control

---

// PROGRAMACION TRADICIONAL
main{
    Muestra por consola una pregunta solicitando al usuario una palabra
    Valida ese dato
    Muestra por consola una pregunta solicitando al usuario una idioma
    Valida ese dato
    Luego pregunta a un suministrador si tiene el idioma
    Liego si lo tiene pregúntale por la palabra en el idioma
    Luego lo pintas por pantalla
}

// INVERSION DE CONTROL... Donde haciendo uso de un lenguaje DECLARATIVO
Oye Spring (oye Angular),
Que por aquí usamos suministardores de diccionarios... y para este proyecto vamos a usar el de ficheros.. por si alguien te pide uno
Que por aquí tengo una app..
Y esa app tiene una función llamada: procesarPeticion que es a la que tienes que llamar.

## Problema nuevo:

Quien crea ahora la instancia de App?
Porque el que la cree necesita pasar una instancia del Suministrador.
En algún sitio alguien, tendrá que escribir:
    new App(unaInstanciaDeUnSuministrador)

Ese código es el que los frameworks de inversión de control escriben por mi!
---

maven?
Herramienta de automatización de tareas habituales en el proyecto:
- compilación (javac)
  - Hacerte con las dependencias
  - Configurar un classpath
  - al llamar al javac, pasarle el listado de todos los ficheros/directorios que querías compilar
  - - decirle en qué carpeta querías los compilados...
- ejecución de pruebas -> Generación de informes de pruebas
- empaquetar el proyecto -> .jar
- mandar mi código a Sonarqube

En el mundo JS tenemos un equivalente a maven: npm


---
# Angular

Cuando trabajos con angular, lo primero es instalar angular en nuestro entorno

Eso lo vamos a hacer con npm:

npm 


---

# Componente usuario

<usuario id="29384728" />

Ese componente irá a un servicio REST vía HTTP
para solicitar los datos de esa persona
y los mostrará por pantalla

Adicionalmente, el componente tendrá un botón llamado MODIFICAR
Si alguien lo aprieta, se mostrará un formulario, que permita editar esos datos...
Con su correspondiente guardar, que también hará una llamada por http a un servicio, 
para que los datos sean guardados en un backend