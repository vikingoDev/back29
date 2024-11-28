// Importamos los módulos necesarios
const passport = require('passport'); // Importa Passport para la autenticación
const LocalStrategy = require('passport-local').Strategy; // Importa la estrategia local de Passport
const User = require('../models/user'); // Importa el modelo de Usuario
const bcrypt = require('bcrypt'); // Importa bcrypt para comparar las contraseñas de forma segura

// Configuración de la estrategia Local de Passport
passport.use(new LocalStrategy( // Usamos la estrategia local, que se basa en nombre de usuario y contraseña
  {
    usernameField: 'username', // Especificamos el campo 'username' en el cuerpo de la solicitud
    passwordField: 'password'  // Especificamos el campo 'password' en el cuerpo de la solicitud
  },
  async (username, password, done) => { // La función que se ejecuta para autenticar al usuario
    const user = await User.findOne({ username }); // Busca un usuario por su nombre de usuario
    if (!user) { // Si el usuario no existe, devuelve un error
      return done(null, false, { message: 'Usuario no encontrado' }); // El primer parámetro es el error (null si no hay), el segundo es si la autenticación falla (false) y el tercer parámetro es un objeto con el mensaje de error
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash); // Compara la contraseña proporcionada con el hash de la contraseña almacenado en la base de datos
    if (!validPassword) { // Si la contraseña no es válida, devuelve un error
      return done(null, false, { message: 'Contraseña incorrecta' }); // Retorna un error si la contraseña es incorrecta
    }

    return done(null, user); // Si todo es correcto, pasa el usuario al siguiente paso (en este caso, se autentica al usuario)
  }
));

// Serialización de usuario en la sesión
passport.serializeUser((user, done) => { // Serializa al usuario para almacenarlo en la sesión
  done(null, user.id); // Guarda solo el ID del usuario en la sesión (para evitar guardar información sensible)
});

// Deserialización del usuario
passport.deserializeUser(async (id, done) => { // Recupera el usuario de la base de datos cuando se necesita acceder a él durante una sesión
  const user = await User.findById(id); // Busca el usuario por su ID almacenado en la sesión
  done(null, user); // Devuelve el usuario completo para que esté disponible en la sesión
});

// Rutas de login usando Passport
const loginRouter = require('express').Router(); // Crea un enrutador de Express para manejar las rutas de login

loginRouter.post('/', (req, res, next) => { // Define la ruta POST para la autenticación de login
  passport.authenticate('local', (err, user, info) => { // Usa la estrategia local para autenticar al usuario
    if (err) { // Si ocurre un error durante la autenticación, pasa el error al siguiente middleware
      return next(err); // Pasa el error al middleware de manejo de errores
    }
    if (!user) { // Si no se encuentra al usuario, responde con un error 401
      return res.status(401).json({ error: info.message }); // Retorna el mensaje de error proporcionado por la estrategia local
    }

    req.login(user, (err) => { // Si el usuario es autenticado, se crea la sesión con el método login de Passport
      if (err) { // Si ocurre un error al iniciar sesión, pasa el error al siguiente middleware
        return next(err); // Pasa el error al middleware de manejo de errores
      }
      res.status(200).json({ // Si la autenticación es exitosa, responde con el estado 200 y la información del usuario
        username: user.username, // Devuelve el nombre de usuario
        name: user.name // Devuelve el nombre del usuario
      });
    });
  })(req, res, next); // Ejecuta la función de autenticación y pasa los parámetros necesarios
});

module.exports = loginRouter; // Exporta el enrutador para que pueda ser usado en otros archivos
