// db.js
const mongoose = require('mongoose'); // Importa la biblioteca Mongoose para MongoDB.

const connectDB = async () => { // Define una función asíncrona para conectar a la base de datos.
  try {
    // Intenta conectarse a MongoDB en la URL especificada.
    await mongoose.connect("mongodb://localhost:27017/tvshows", {
      // useNewUrlParser: true, 
      // Habilita un nuevo analizador de URL (ahora es predeterminado).
      // useUnifiedTopology: true, 
      // Activa la nueva capa de topología (ahora es predeterminado).
    });
    console.log('Conectado a MongoDB'); // Imprime un mensaje si la conexión es exitosa.
  } catch (err) {
    console.error('Error de conexión a MongoDB:', err); // Imprime el error si la conexión falla.
    process.exit(1); // Termina el proceso si no se puede conectar a la base de datos.
  }
};

module.exports = connectDB; // Exporta la función para que pueda ser utilizada en otros módulos.

/*
useNewUrlParser:

Se introdujo para utilizar un nuevo parser de URL de conexión en el driver de MongoDB, que maneja mejor las cadenas de conexión.
A partir de Mongoose 6.x, esta opción se considera obsoleta, ya que el nuevo parser se utiliza por defecto.
useUnifiedTopology:

Se introdujo para usar el nuevo sistema de topología del driver, que mejora la gestión de las conexiones, especialmente en entornos de replicación y clústeres.
Similar a useNewUrlParser, esta opción también se ha vuelto innecesaria en versiones recientes, ya que el unified topology se utiliza de forma predeterminada.
*/