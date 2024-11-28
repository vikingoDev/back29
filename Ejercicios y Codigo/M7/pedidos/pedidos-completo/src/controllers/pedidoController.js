const Pedido = require('../models/Pedidos'); // Importa el modelo Pedido para crear y manejar pedidos.
const { esperar, seleccionarAleatorio } = require('../utils/funciones'); // Importa funciones utilitarias: esperar y seleccionarAleatorio.

const fs = require('fs'); // Importa el módulo fs para manejar el sistema de archivos.
const path = require('path'); // Importa el módulo path para trabajar con rutas de archivos.

function cargarDatos() { // Define la función cargarDatos para cargar información desde un archivo JSON.
    const dataPath = path.join(__dirname, '../models/datos.json'); // Construye la ruta al archivo datos.json.
    const data = fs.readFileSync(dataPath); // Lee el contenido del archivo de forma síncrona.
    return JSON.parse(data); // Parsea el contenido JSON y lo devuelve como un objeto.
}

const datos = cargarDatos(); // Llama a cargarDatos y guarda el objeto resultante en la variable datos.
const nombres = datos.pedidos.nombres; // Extrae los nombres de los pedidos del objeto datos.
const tipos = datos.pedidos.tipos; // Extrae los tipos de los pedidos del objeto datos.
const precios = datos.pedidos.precios; // Extrae los precios de los pedidos del objeto datos.

// Actualiza el estado del pedido y lo imprime en la consola
function actualizarEstadoPedido(pedido, estado) { // Define una función para actualizar el estado de un pedido.
    pedido.estado = estado; // Establece el estado del pedido al valor proporcionado.
    console.log(`Pedido ${pedido.nombre}: ${estado}`); // Imprime el estado actualizado en la consola.
}

// Simula el seguimiento del pedido
async function seguirProcesoPedido(pedido) { // Define una función asíncrona para simular el seguimiento del pedido.
    await esperar(1000); // Espera 1 segundo.
    actualizarEstadoPedido(pedido, 'Recibido'); // Actualiza el estado a 'Recibido'.
    
    await esperar(3000); // Espera 3 segundos.
    actualizarEstadoPedido(pedido, 'Preparando'); // Actualiza el estado a 'Preparando'.
    
    await esperar(1000); // Espera 1 segundo.
    actualizarEstadoPedido(pedido, 'Finalizado'); // Actualiza el estado a 'Finalizado'.
    
    await esperar(1000); // Espera 1 segundo.
    actualizarEstadoPedido(pedido, 'Entregado'); // Actualiza el estado a 'Entregado'.
}

// Simula la realización del pedido con un retraso aleatorio
async function realizarPedido(pedido) { // Define una función asíncrona para simular la realización del pedido.
    const retraso = Math.floor(Math.random() * 10000) + 1000; // Genera un retraso aleatorio entre 1 y 10 segundos.
    return new Promise(resolve => { // Devuelve una nueva promesa.
        setTimeout(() => { // Establece un temporizador que se ejecutará después del retraso.
            resolve(`Pedido ${pedido.nombre} realizado con éxito después de ${retraso / 1000} segundos`); // Resuelve la promesa con un mensaje.
        }, retraso); // El temporizador se detiene por el retraso aleatorio.
    });
}

// Genera un pedido aleatorio
function generarPedidoAleatorio(i) { // Define una función para generar un pedido aleatorio.
    const nombre = `Pedido ${i + 1}`; // Crea un nombre para el pedido basado en el índice.
    const contenidoPedido = `${seleccionarAleatorio(nombres)} con ${seleccionarAleatorio(tipos)}`; // Selecciona un nombre y tipo aleatorio para el contenido del pedido.
    const precio = seleccionarAleatorio(precios); // Selecciona un precio aleatorio.
    return new Pedido(nombre, contenidoPedido, precio); // Crea y devuelve un nuevo objeto Pedido.
}

// Maneja un pedido
async function manejarPedido(i) { // Define una función asíncrona para manejar un pedido dado su índice.
    const pedido = generarPedidoAleatorio(i); // Genera un pedido aleatorio utilizando la función anterior.
    console.log(`Generando ${pedido.nombre}: ${pedido.contenido}, Precio: ${pedido.precio}`); // Imprime información sobre el pedido generado.
    const resultadoPedido = await realizarPedido(pedido); // Realiza el pedido y espera su resultado.
    console.log(resultadoPedido); // Imprime el resultado del pedido en la consola.
    await seguirProcesoPedido(pedido); // Sigue el proceso del pedido, actualizando su estado.
}
async function agregarPedido(nuevoPedido) {
    const dataPath = path.join(__dirname, '../models/datos.json');
    
    // Leer datos existentes
    const data = fs.readFileSync(dataPath);
    const pedidos = JSON.parse(data);
    
   // Agregar nuevo pedido a las listas
   pedidos.pedidos.nombres.push(nuevoPedido.nombres);
   pedidos.pedidos.tipos.push(nuevoPedido.tipos);
   pedidos.pedidos.precios.push(nuevoPedido.precios);
    
    // Escribir datos actualizados de nuevo en el archivo
    fs.writeFileSync(dataPath, JSON.stringify(pedidos, null, 2)); // Con formato
}
// Exportar funciones
module.exports = { // Exporta un objeto con las funciones que se desean hacer disponibles.
    manejarPedido,agregarPedido // Exporta la función manejarPedido.
};
