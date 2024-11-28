// app.js
const express = require('express'); // Importa la biblioteca Express para crear la aplicación web.
const connectDB = require('./db'); // Importa la función para conectar a la base de datos.
const app = express(); // Crea una instancia de la aplicación Express.

// Conectar a MongoDB
connectDB(); // Llama a la función para establecer la conexión a la base de datos.


// Middleware para manejar JSON
app.use(express.json()); // Permite que la aplicación procese datos en formato JSON en las solicitudes.


// Importar el controlador
const TVShowCtrl = require("./controllers/tvshows"); // Importa el controlador que maneja las rutas relacionadas con las series de TV.

// Rutas de la API
const tvshows = express.Router(); // Crea un enrutador para manejar las rutas relacionadas con series de TV.
tvshows.route("/tvshows") // Define la ruta para "/tvshows"
  .get(TVShowCtrl.findAllTVShows) // Asocia la solicitud GET para obtener todas las series.
  .post(TVShowCtrl.addTVShow); // Asocia la solicitud POST para agregar una nueva serie.

tvshows
  .route("/tvshows/:id") // Define la ruta para "/tvshows/:id" (donde :id es un parámetro).
  .get(TVShowCtrl.findById) // Asocia la solicitud GET para obtener una serie específica por ID.
  .put(TVShowCtrl.updateTVShow) // Asocia la solicitud PUT para actualizar una serie existente por ID.
  .delete(TVShowCtrl.deleteTVShow); // Asocia la solicitud DELETE para eliminar una serie por ID.

app.use("/api", tvshows); // Usa el enrutador para las rutas que comienzan con "/api".

const PORT = 8000; // Define el puerto en el que se ejecutará el servidor.
app.listen(PORT, () => { // Inicia el servidor y escucha en el puerto especificado.
  console.log(`Servidor funcionando en el puerto ${PORT}`); // Imprime un mensaje indicando que el servidor está activo.
});
