// Definir el esquema para las publicaciones (posts) usando mongoose.Schema
const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content: {
        type: String, // Definir el tipo de dato como String
        required: true, // Este campo es obligatorio
        minlength: 5 // La longitud mínima del contenido debe ser de 5 caracteres
    },
    date: {
        type: Date, // Definir el tipo de dato como Date
        default: Date.now // Establecer la fecha por defecto a la fecha actual
    },
    category: {
        type: String, // Definir el tipo de dato como String
        enum: [ // Definir un conjunto limitado de valores permitidos
            'Tecnología',
            'Hogar',
            'País',
            'Mundo',
            'Música',
            'Tendencias',
            'Salud'
        ]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Tipo de dato ObjectId que referencia a otro documento
        ref: 'User' // Referencia al modelo 'User'
    }
});

// Exportar el esquema para usarlo en otras partes de la aplicación
module.exports = mongoose.model('Post', postSchema);
