
const saludo = 'Hola amigo';
console.log(saludo);

function saluda(nombre){
    console.log(`Hola ${nombre}`);
}
saluda("felipe");

let numero = 7;

// El operador = en programación recibe el nombre de operador ASIGNACION.
// Esta linea no asigna el 7 a la variable numero...
// Hace lo contrario... Asigna la variable al 7
// Una variable es una referencia que punta a un dato que tengo en RAM!

// Lo primero que hace es poner el 7 en la RAM
// Luego crea una variable llamada numero 
// Apunta esa variable al 7 que está guardado en RAM
numero = 8;
// Se guarda el 8 en RAM... en un sitio distinto al 7
// Después muevo la variable (la vario)

let miFuncionAEjecutar = saluda;    // Statement (Sentencia = Frase en castellano)
miFuncionAEjecutar('Ivan');

function componerSaludo(persona) {
    return `Hola ${persona.nombre} ${persona.apellido}`;
}

function saludarA(funcionDeComposicionDelSaludo, persona){
    console.log(funcionDeComposicionDelSaludo(persona));
}

saludarA(componerSaludo, {nombre: 'Ivan', apellido: 'Lopez'});

// Operador flecha en JS, que me permite definir expresiones Lambda
// Expression? Una porción de código que devuelve un valor
numero = 5+7; // Statement
         ///     Es una expresion:

// Una expresión lambda es una expresión que devuelve una función anónima.
let miNuevaFunciónDeComposicionDeSaludo = (persona) => {
    return `Bienvenido ${persona.nombre} ${persona.apellido}`;
}

saludarA(miNuevaFunciónDeComposicionDeSaludo, {nombre: 'Ivan', apellido: 'Lopez'});

let miNuevaFunciónDeComposicionDeSaludo2 = persona => {
    return `Saludos ${persona.nombre} ${persona.apellido}`;
}

saludarA(miNuevaFunciónDeComposicionDeSaludo2, {nombre: 'Ivan', apellido: 'Lopez'});


let miNuevaFunciónDeComposicionDeSaludo3 = persona => `Hellowww ${persona.nombre} ${persona.apellido}`;

saludarA(miNuevaFunciónDeComposicionDeSaludo3, {nombre: 'Ivan', apellido: 'Lopez'});

saludarA( persona => `Welcome ${persona.nombre} ${persona.apellido}`,  {nombre: 'Ivan', apellido: 'Lopez'});


let dato = 3;  // number
dato = 'hola';
dato = false;

// En JS usamos un concepto que es el Duck Typing.



let valor = undefined;

// Mira si existe el valor...
    // Si el valor es un boolean, además si vale true
    // Si no es booleano, solo se mira que exista el valor
if (valor)
    console.log("Tengo un valor")

if (valor !== undefined)
    console.log("Tengo un valor")
