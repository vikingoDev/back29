let min=1;
let max=10;
function obtenerNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
let numeroAleatorio=Math.floor(Math.random() * (max - min)) + min;
console.log(numeroAleatorio);

