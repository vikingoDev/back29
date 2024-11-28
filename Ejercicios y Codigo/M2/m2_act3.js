/*
Explicación:
Iterar con while:

Usamos un bucle while para iterar a través del array y mostrar cada elemento en la consola.
Iterar con for:

Usamos un bucle for para iterar a través del array y mostrar cada elemento en la consola.
Iterar con .forEach:

Usamos el método forEach para iterar a través del array y mostrar cada elemento en la consola.
Mostrar elementos incrementados en 1:

Usamos el método map para crear un nuevo array donde cada elemento del array original se incrementa en 1 y lo mostramos en la consola.
Generar una copia del array con elementos incrementados en 1:

Este paso es similar al anterior, creando una copia del array original con los elementos incrementados en 1.
Calcular el promedio:

Usamos reduce para sumar todos los elementos del array y luego dividimos la suma entre la longitud del array para obtener el promedio.
*/
const array = [1, 2, 3, 4, 5, 6];

// 1. Iterar todos los elementos dentro del array utilizando while y mostrarlos en consola
console.log('Iteración usando while:');
let i = 0;
while (i < array.length) {
  console.log(array[i]);
  i++;
}

// 2. Iterar todos los elementos dentro del array utilizando for y mostrarlos en consola
console.log('Iteración usando for:');
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

// 3. Iterar todos los elementos dentro del array utilizando .forEach y mostrarlos en consola
console.log('Iteración usando .forEach:');
array.forEach(element => {
  console.log(element);
});

// 4. Mostrar todos los elementos dentro del array sumándole uno a cada uno
console.log('Elementos con incremento de 1:');
const incrementedArray = array.map(element => element + 1);
console.log(incrementedArray);

// 5. Generar una copia del array pero con todos los elementos incrementados en 1
// (ya lo hicimos en el paso anterior, pero aquí lo repetimos para claridad)
console.log('Copia del array con elementos incrementados en 1:');
const copiedArray = array.map(element => element + 1);
console.log(copiedArray);

// 6. Calcular el promedio
const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
const average = sum / array.length;
console.log('Promedio del array:');
console.log(average);