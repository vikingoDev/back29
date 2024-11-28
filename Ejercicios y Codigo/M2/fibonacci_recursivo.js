/*
La recursividad y la secuencia de Fibonacci son conceptos estrechamente
relacionados en la programación. Vamos a desglosar ambos conceptos y 
cómo se aplican en la implementación de la secuencia de Fibonacci.

Secuencia de Fibonacci
La secuencia de Fibonacci es una serie de números en la que cada número
es la suma de los dos números anteriores. La secuencia comienza típicamente
con 0 y 1. Los primeros números en la secuencia de Fibonacci son:
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
*/

// Función para obtener un número aleatorio entre min (inclusive) y max (exclusive)
function obtenerNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Se debería definir 'min' y 'max' antes de usarlos. Ejemplo:
let min = 1;
let max = 10;

// Generar un número aleatorio usando la función definida
let numeroAleatorio = obtenerNumeroAleatorio(min, max);
console.log(numeroAleatorio);

// Bucle para encontrar el primer número múltiplo de 7 mayor o igual a 20
for (let actual = 20; ; actual = actual + 1) {
    if (actual % 7 === 0) {
        console.log(actual);
        break;
    }
}