// Función que simula la verificación del estado del pedido
function verificarPedido(idPedido) {
  // Devuelve una nueva promesa
  return new Promise((resolve, reject) => {
      // Simulamos un tiempo de procesamiento aleatorio entre 1 y 3 segundos
      const tiempoProcesamiento = Math.floor(Math.random() * 3000) + 1000;
      
      // Esperar el tiempo de procesamiento simulado antes de ejecutar el código dentro de setTimeout
      setTimeout(() => {
          // Simulamos un resultado aleatorio: 80% de éxito y 20% de fallo
          const exito = Math.random() > 0.2;
          
          // Si la simulación resulta en éxito
          if (exito) {
              // Resuelve la promesa con un mensaje de éxito
              resolve(`Pedido ${idPedido} entregado con éxito.`);
          } else {
              // Si la simulación resulta en fallo
              // Rechaza la promesa con un mensaje de error
              reject(`Pedido ${idPedido} falló.`);
          }
      }, tiempoProcesamiento); // El tiempo de procesamiento simulado se pasa a setTimeout
  });
}

// Crear un array de pedidos a verificar
const pedidos = [101, 102, 103, 104, 105];

// Usar Promise.allSettled para verificar todos los pedidos
Promise.allSettled(pedidos.map(idPedido => verificarPedido(idPedido)))
  .then(resultados => {
      // Procesar los resultados de todas las promesas
      resultados.forEach(resultado => {
          // Si la promesa se ha cumplido
          if (resultado.status === 'fulfilled') {
              // Imprimir el mensaje de éxito
              console.log('Éxito:', resultado.value);
          } else if (resultado.status === 'rejected') {
              // Si la promesa ha sido rechazada
              // Imprimir el mensaje de error
              console.log('Error:', resultado.reason);
          }
      });
  })
  .catch(error => {
      // Manejar cualquier error inesperado que pueda ocurrir durante el procesamiento de las promesas
      console.log('Error inesperado:', error);
  })
  .finally(() => {
      // Este bloque se ejecuta siempre al final, independientemente de si las promesas fueron cumplidas o rechazadas
      console.log('Proceso de verificación de pedidos completo.');
      // Aquí podrías agregar más lógica, como el envío de notificaciones finales a los clientes
  });
