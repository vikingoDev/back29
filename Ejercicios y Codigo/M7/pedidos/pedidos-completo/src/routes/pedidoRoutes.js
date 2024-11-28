const express = require('express'); // Importa el módulo Express para crear una aplicación web.
const router = express.Router(); // Crea un enrutador de Express para manejar las rutas.
const { manejarPedido,agregarPedido } = require('../controllers/pedidoController.js'); // Importa la función manejarPedido del controlador de pedidos.

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
router.post('/agregar-pedido', async (req, res) => {
    const { nombres, tipos, precios } = req.body; // Obtener datos del cuerpo de la solicitud
    //console.log('Cuerpo de la solicitud:', req.body); // Verifica el cuerpo de la solicitud

    // Validar la entrada
    if (!nombres || !tipos || !precios) {
        return res.status(400).send('Faltan datos necesarios para el pedido.');
    }

    const nuevoPedido = { nombres, tipos, precios }; // Estado inicial

    try {
        await agregarPedido(nuevoPedido); // Llamar a la función para agregar el pedido
        res.status(201).send('Pedido agregado exitosamente.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar el pedido.');
    }
});

module.exports = router; // Exporta el enrutador para que pueda ser utilizado en otros archivos.
