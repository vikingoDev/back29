// Creación de arrays
let colores = new Array('rojo', 'verde', 'azul'); 
// 1. Crea un array llamado `colores` usando el constructor `Array` 
// y le asigna los elementos 'rojo', 'verde' y 'azul'.

let frutas = ['manzana', 'banana', 'cereza']; 
// 2. Crea un array llamado `frutas` usando la notación de corchetes. 
//El array contiene los elementos 'manzana', 'banana' y 'cereza'.

console.log(frutas[1]); 
// 3. Imprime el segundo elemento del array `frutas`. 
// Los índices de los arrays empiezan en 0, así que `frutas[1]` es 'banana'.

let numeros = [1, 2, 3]; 
// 4. Crea un array llamado `numeros` con los elementos 1, 2 y 3.

numeros.push(4); 
// 5. Usa el método `push` para añadir el número 4 al final del array `numeros`. 
//Ahora el array es [1, 2, 3, 4].

// Uso del método pop para eliminar el último elemento
let ultimoElemento = numeros.pop(); 
// 6. Usa el método `pop` para eliminar el último elemento del array `numeros`, 
// que es 4. `pop` también devuelve el elemento eliminado, por lo que se asigna a 
//`ultimoElemento`.

console.log(ultimoElemento); 
// 7. Imprime el valor de `ultimoElemento`, que es 4, el elemento eliminado por `pop`.

console.log(numeros); 
// 8. Imprime el estado final del array `numeros`. 
// Después de eliminar el último elemento, el array es [1, 2, 3].

let arr = [1, 2, 3, 4, 5, 6]; 
// 9. Crea un array llamado `arr` con los elementos 1, 2, 3, 4, 5 y 6.

for (let i in arr) { // 10. Inicia un bucle `for...in` que itera sobre los 
    //índices del array `arr`.
    console.log(arr[i]); 
    // 11. Imprime el valor de cada elemento en `arr` usando su índice. 
    //El bucle imprimirá 1, 2, 3, 4, 5 y 6.
}
