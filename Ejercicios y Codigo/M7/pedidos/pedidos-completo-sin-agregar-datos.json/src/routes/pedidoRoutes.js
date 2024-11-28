const express = require('express'); // Importa el módulo Express para crear una aplicación web.
const router = express.Router(); // Crea un enrutador de Express para manejar las rutas.
const { manejarPedido } = require('../controllers/pedidoController.js'); // Importa la función manejarPedido del controlador de pedidos.

let contador = 0; // Inicializa un contador para llevar la cuenta de los pedidos generados.

// Ruta para generar pedidos continuamente
router.get('/generar-pedidos', (req, res) => { // Define una ruta GET para iniciar la generación de pedidos.
    const intervalId = setInterval(() => { // Establece un intervalo para ejecutar una función repetidamente.
        manejarPedido(contador); // Llama a la función manejarPedido con el valor actual del contador.
        contador++; // Incrementa el contador después de manejar el pedido.
    }, Math.floor(Math.random() * 10000) + 1000); // Retraso aleatorio entre 1 y 10 segundos antes de la siguiente ejecución.

    res.send('Generación de pedidos en proceso...'); // Envía una respuesta al cliente indicando que la generación ha comenzado.
});

// Parar la generación de pedidos (opcional)
router.post('/parar-generar-pedidos', (req, res) => { // Define una ruta POST para detener la generación de pedidos.
    clearInterval(intervalId); // Limpia el intervalo para detener la generación de pedidos.
    res.send('Generación de pedidos detenida.'); // Envía una respuesta al cliente indicando que la generación se ha detenido.
});

module.exports = router; // Exporta el enrutador para que pueda ser utilizado en otros archivos.
