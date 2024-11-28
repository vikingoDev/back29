let i = 60; // 1. Declara una variable global `i` y le asigna el valor 60.

function Ejemplo() { // 2. Define una función llamada `Ejemplo`.
    for (let i = 0; i < 5; i++) { // 3. Inicia un bucle `for` con una variable
        // `i` local (diferente de la global). Esta variable `i` comienza en 0 
        //y se incrementa hasta que es menor que 5.
        console.log(i); // 4. Imprime el valor de la variable `i` local en 
        //cada iteración del bucle. La salida será 0, 1, 2, 3, 4.
    } // 5. Fin del bucle `for`. La variable `i` local se destruye aquí 
    //y ya no está disponible fuera del bucle.
}

Ejemplo(); // 6. Llama a la función `Ejemplo`, 
//lo que ejecuta el bucle `for` e imprime los valores de `i` desde 0 hasta 4.

console.log('Después del loop', i); 
// 7. Imprime el valor de la variable global `i`. 
// Como el bucle `for` dentro de `Ejemplo` usó una variable `i` local,
// la variable global `i` no se ve afectada. La salida será 60.