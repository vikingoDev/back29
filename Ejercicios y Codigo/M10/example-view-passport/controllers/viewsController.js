// Importamos el modelo de Post para interactuar con la colección de posts en la base de datos
const Post = require('../models/post');

// Función para manejar la solicitud de la página principal
exports.getHome = (req, res) => {
  // Renderiza la vista 'index' con un título y un mensaje
  res.render('index', { title: 'Página Principal', message: 'Bienvenido a la aplicación!' });
};

// Función para manejar la solicitud de la página de login
exports.getLogin = (req, res) => {
  // Renderiza la vista 'login' sin pasar datos adicionales
  res.render('login');
};

// Función para manejar la solicitud de la página de registro
exports.getRegister = (req, res) => {
  // Renderiza la vista 'register' sin pasar datos adicionales
  res.render('register');
};

// Función para manejar la solicitud de la página de posts
exports.getPosts = async (req, res) => {
  try {
    // Obtiene todos los posts de la base de datos
    const posts = await Post.find({});
    // Renderiza la vista 'posts' y pasa los posts obtenidos como datos
    res.render('posts', { posts });
  } catch (error) {
    // Si ocurre un error al obtener los posts, responde con un mensaje de error y un código 500
    res.status(500).send({ error: 'Error al obtener los posts' });
  }
};
