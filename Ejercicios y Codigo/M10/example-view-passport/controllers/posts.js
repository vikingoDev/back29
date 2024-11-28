// Importamos los módulos necesarios
const postsRouter = require('express').Router(); // Crea un enrutador de Express para manejar las rutas de los posts
const Post = require('../models/post'); // Importa el modelo de Post
const User = require('../models/user'); // Importa el modelo de User
const { authenticateSession } = require('../middlewares/middleware'); // Importa el middleware para autenticar la sesión del usuario

// Obtener todos los posts
postsRouter.get('/', async (req, res) => { // Define la ruta GET para obtener todos los posts
  try {
    const posts = await Post.find({}); // Recupera todos los posts de la base de datos
    res.json(posts); // Devuelve los posts en formato JSON
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los posts' }); // Si ocurre un error, devuelve el error con un código de estado 500
  }
});

// Crear un nuevo post
postsRouter.post('/', authenticateSession, async (req, res) => { // Define la ruta POST para crear un nuevo post. Se aplica el middleware 'authenticateSession' para verificar que el usuario esté autenticado
  const body = req.body; // Obtiene el cuerpo de la solicitud (que contiene los datos del nuevo post)
  const user = req.user; // 'req.user' contiene el usuario autenticado, que ha sido asignado por el middleware authenticateSession

  const post = new Post({ // Crea un nuevo objeto de post utilizando el modelo 'Post'
    title: body.title, // Asigna el título del post desde el cuerpo de la solicitud
    content: body.content, // Asigna el contenido del post desde el cuerpo de la solicitud
    category: body.category, // Asigna la categoría del post desde el cuerpo de la solicitud
    date: new Date(), // Asigna la fecha actual como la fecha del post
    user: user._id // Relaciona el post con el usuario autenticado utilizando su ID
  });

  try {
    const savedPost = await post.save(); // Guarda el post en la base de datos
    user.posts = user.posts.concat(savedPost._id); // Agrega el ID del nuevo post a la lista de posts del usuario
    await user.save(); // Guarda la referencia del nuevo post en el usuario
    res.status(201).json(savedPost); // Devuelve el post recién creado con un código de estado 201 (creado)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el post' }); // Si ocurre un error al guardar el post, devuelve un error con un código de estado 500
  }
});

module.exports = postsRouter; // Exporta el enrutador para ser usado en otros archivos
