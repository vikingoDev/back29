// Importa el módulo jsonwebtoken, que permite crear y verificar tokens JWT para la autenticación
const jwt = require('jsonwebtoken');

// Importa bcrypt, una biblioteca para encriptar contraseñas de manera segura
const bcrypt = require('bcrypt');

// Crea un router de Express para las rutas de login
const loginRouter = require('express').Router();

// Importa el modelo de usuario de la base de datos
const User = require('../models/user');

// Define la ruta POST para el inicio de sesión
loginRouter.post('/', async (request, response) => {
  // Obtiene el contenido del cuerpo de la solicitud (username y password)
  const body = request.body;

  // Busca un usuario en la base de datos con el mismo nombre de usuario que se envió en la solicitud
  const user = await User.findOne({ username: body.username });

  // Verifica si el usuario existe y si la contraseña ingresada es correcta
  const passwordCorrect =
    user === null
      ? false // Si no se encuentra el usuario, se establece como false
      : await bcrypt.compare(body.password, user.passwordHash); // Compara la contraseña ingresada con el hash almacenado

  // Si el usuario no existe o la contraseña es incorrecta, responde con un código 401 (no autorizado)
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password' // Devuelve un mensaje de error en la respuesta JSON
    });
  }

  // Si las credenciales son correctas, crea un objeto userForToken con los datos que incluirá el token JWT
  const userForToken = {
    username: user.username,
    id: user._id
  };

  // Crea un token JWT firmado con la información del usuario y una clave secreta
  const token = jwt.sign(userForToken, process.env.SECRET);

  // Si el inicio de sesión es exitoso, responde con el token, el nombre de usuario y el nombre del usuario
  response
    .status(200) // Devuelve un código de estado 200 (OK)
    .send({ token, username: user.username, name: user.name });
});

// Exporta el router de login para que pueda ser utilizado en otros archivos de la aplicación
module.exports = loginRouter;
