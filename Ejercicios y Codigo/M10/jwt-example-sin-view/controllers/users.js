// Importa bcrypt para el hash de contraseñas
const bcrypt = require('bcrypt');

// Crea un nuevo enrutador de Express para manejar las rutas de usuarios
const usersRouter = require('express').Router();

// Importa el modelo de Usuario para interactuar con la base de datos de usuarios
const User = require('../models/user');

// Define una ruta POST para crear un nuevo usuario
usersRouter.post('/', async (request, response) => {
  // Obtiene los datos enviados en el cuerpo de la solicitud
  const body = request.body;

  // Define el número de rondas de sal para bcrypt, que aumenta la seguridad de la contraseña
  const saltRounds = 10;

  // Hashea la contraseña recibida usando bcrypt y las rondas de sal especificadas
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  // Crea un nuevo usuario con el nombre de usuario, nombre y hash de la contraseña
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  });

  // Guarda el usuario en la base de datos
  const savedUser = await user.save();

  // Responde con el usuario guardado en formato JSON
  response.json(savedUser);
});

// Define una ruta GET para obtener todos los usuarios
usersRouter.get('/', async (request, response) => {
  // Busca todos los usuarios en la base de datos y "popular" el campo 'posts'
  // Esto significa que sustituye los IDs de posts asociados en el documento de usuario por los documentos de post completos
  const users = await User.find({}).populate('posts');

  // Responde con los usuarios en formato JSON
  response.json(users);
});

// Exporta el enrutador de usuarios para que pueda ser utilizado en otros archivos de la aplicación
module.exports = usersRouter;
