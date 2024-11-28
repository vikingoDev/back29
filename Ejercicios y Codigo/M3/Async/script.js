// Definir la función asíncrona
const hacerTarea = async (iteraciones) => {
  // Crear un array vacío para almacenar los números generados
  const numeros = [];
  
  // Bucle para realizar la tarea el número de veces especificado en `iteraciones`
  for (let i = 0; i < iteraciones; i++) {
      // Generar un número aleatorio entre 1 y 6
      const numero = 1 + Math.floor(Math.random() * 6);
      
      // Añadir el número generado al array `numeros`
      numeros.push(numero);
      
      // Si el número generado es 6, devolver un objeto de error
      if (numero === 6) {
          return {
              error: true,
              mensaje: 'Se ha sacado un 6'
          };
      }
  }
  
  // Si el bucle termina sin encontrar un 6, devolver el array de números generados
  return {
      error: false,
      valor: numeros
  };
};

// Definir una función asíncrona para manejar el resultado
const manejarTarea = async () => {
  try {
      // Esperar a que la función `hacerTarea` se complete y almacenar el resultado
      // Esperar a que la promesa se resuelva
      const resultado = await hacerTarea(10); 
      
      // Imprimir el resultado en la consola
      console.log(resultado);
      
      // Procesar el resultado basado en si hubo un error o no
      if (resultado.error) {
          console.error('Error:', resultado.mensaje);
      } else {
          console.log('Números:', resultado.valor);
      }
  } catch (error) {
      // Manejar cualquier error que ocurra durante la ejecución de `hacerTarea`
      console.error('Se produjo un error:', error);
  }
};

// Llamar a la función asíncrona para ejecutar la tarea
manejarTarea();
