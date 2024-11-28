const mongoose = require('mongoose'); 
// Importa Mongoose para manejar la conexión y modelos de MongoDB.

// Define el esquema para la colección de series de TV.
const tvShowSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Título de la serie, tipo String y obligatorio.
  year: { type: Number, required: true }, // Año de lanzamiento, tipo Number y obligatorio.
  country: { type: String, required: true }, // País de origen, tipo String y obligatorio.
  poster: { type: String, required: true }, // URL del cartel de la serie, tipo String y obligatorio.
  seasons: { type: Number, required: true }, // Número de temporadas, tipo Number y obligatorio.
  genre: {
    type: String, // Género de la serie, tipo String.
    enum: ['Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Comedy'] // Debe ser uno de los géneros especificados.
  },
  summary: { type: String } // Resumen de la serie, tipo String, no es obligatorio.
});

// Registra el modelo 'TVShow' basado en el esquema definido.
const TVShow = mongoose.model('TVShow', tvShowSchema);

// Exporta el modelo para que pueda ser utilizado en la aplicación.
module.exports = TVShow;
