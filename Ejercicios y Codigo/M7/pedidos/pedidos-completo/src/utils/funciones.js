// Función que espera un tiempo específico y luego resuelve una promesa
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Función que selecciona un elemento aleatorio de un array
function seleccionarAleatorio(array) {
    const indiceAleatorio = Math.floor(Math.random() * array.length);
    return array[indiceAleatorio];
}

// Exportar funciones
module.exports = {
    esperar,
    seleccionarAleatorio
};
