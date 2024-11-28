// Define un middleware de manejo de errores llamado errorHandler, que captura errores en la aplicación
const errorHandler = (error, request, response, next) => {
  
  // Imprime el mensaje del error en la consola para facilitar el diagnóstico
  console.log(error.message);

  // Verifica si el error es de tipo 'CastError', que normalmente ocurre al convertir un ID malformado
  if (error.name === 'CastError') {
    // Responde con un estado 400 (Bad Request) y un mensaje indicando que el ID tiene un formato incorrecto
    return response.status(400).send({ error: 'malformatted id' });
  } 
  // Verifica si el error es de tipo 'ValidationError', que ocurre cuando fallan las validaciones de los datos
  else if (error.name === 'ValidationError') {
    // Responde con un estado 400 y el mensaje de error de validación específico
    return response.status(400).json({ error: error.message });
  } 
  // Verifica si el error es de tipo 'JsonWebTokenError', que indica que un token JWT es inválido
  else if (error.name === 'JsonWebTokenError') {
    // Responde con un estado 401 (Unauthorized) y un mensaje de "token inválido"
    return response.status(401).json({
      error: 'invalid token'
    });
  }

  // Si el error no coincide con ninguno de los anteriores, pasa el error al siguiente middleware
  next(error);
};

// Exporta el middleware errorHandler para que esté disponible en otros archivos de la aplicación
module.exports = { errorHandler };
