// Importamos las dependencias necesarias
const bcrypt = require('bcrypt'); // Importa bcrypt para el cifrado de contraseñas
const usersRouter = require('express').Router(); // Crea un enrutador de Express para manejar las rutas de usuarios
const User = require('../models/user'); // Importa el modelo de User para interactuar con la base de datos

// Ruta para crear un nuevo usuario
usersRouter.post('/', async (request, response) => { // Define la ruta POST para crear un usuario
  const body = request.body; // Obtiene los datos del cuerpo de la solicitud (username, password, name)

  const saltRounds = 10; // Define el número de rondas para generar el hash de la contraseña
  // Cifra la contraseña usando bcrypt y el número de rondas de sal
  const passwordHash = await bcrypt.hash(body.password, saltRounds); // Asigna el hash de la contraseña al variable passwordHash

  // Crea un nuevo objeto 'user' basado en el modelo 'User'
  const user = new User({
    username: body.username, // Asigna el nombre de usuario desde el cuerpo de la solicitud
    name: body.name, // Asigna el nombre completo del usuario desde el cuerpo de la solicitud
    passwordHash // Asigna el hash de la contraseña cifrada
  });

  /*
    Comentado: Esto sería un ejemplo de cómo se obtendrían todos los usuarios junto con sus posts relacionados
    usersRouter.get('/', async (request, response) => {
      const users = await User.find({}).populate('posts'); // Encuentra todos los usuarios y rellena los posts relacionados
      response.json(users); // Devuelve los usuarios con los posts relacionados en formato JSON
    });
  */

  const savedUser = await user.save(); // Guarda el nuevo usuario en la base de datos
  response.json(savedUser); // Devuelve el usuario guardado en formato JSON como respuesta
});

// Ruta para obtener todos los usuarios
usersRouter.get('/', async (request, response) => { // Define la ruta GET para obtener todos los usuarios
  const users = await User.find({}).populate('posts'); // Encuentra todos los usuarios y rellena los posts relacionados
  response.json(users); // Devuelve la lista de usuarios con sus posts relacionados en formato JSON
});

// Exporta el enrutador para que pueda ser usado en otros archivos
module.exports = usersRouter;
