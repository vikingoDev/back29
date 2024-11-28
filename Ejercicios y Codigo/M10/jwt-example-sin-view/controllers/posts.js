// Importa el enrutador de Express para definir las rutas de posts
const postsRouter = require('express').Router();

// Importa jsonwebtoken, que se usa para verificar tokens JWT
const jwt = require('jsonwebtoken');

// Importa el modelo de Post para interactuar con la base de datos de posts
const Post = require('../models/post');

// Importa el modelo de User para interactuar con la base de datos de usuarios
const User = require('../models/user');

// Define una ruta GET para obtener todos los posts
postsRouter.get('/', async (request, response) => {
  try {
    // Busca todos los posts en la base de datos
    const posts = await Post.find({});
    // Responde con los posts en formato JSON
    response.json(posts);
  } catch (error) {
    // Si hay un error, responde con un estado 500 y un mensaje de error
    response.status(500).json({ error: 'Error al obtener los posts' });
  }
});

// Define una ruta GET para obtener un post específico por su ID
postsRouter.get('/:id', async (request, response) => {
  try {
    // Busca el post por ID en la base de datos
    const post = await Post.findById(request.params.id);
    if (post) {
      // Si el post se encuentra, responde con el post en formato JSON
      response.json(post.toJSON());
    } else {
      // Si no se encuentra el post, responde con un estado 404 (No encontrado)
      response.status(404).end();
    }
  } catch (error) {
    // Si hay un error, responde con un estado 500 y un mensaje de error
    response.status(500).json({ error: 'Error al obtener el post' });
  }
});

// Define una función auxiliar para obtener el token JWT del encabezado de autorización
const getTokenFrom = (request) => {
  // Obtiene el encabezado de autorización de la solicitud
  const authorization = request.get('authorization');
  // Verifica si el encabezado existe y si comienza con "Bearer "
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    // Si cumple, devuelve el token sin el prefijo "Bearer "
    return authorization.substring(7);
  }
  // Si no cumple, devuelve null
  return null;
};

// Define una ruta POST para crear un nuevo post
postsRouter.post('/', async (request, response) => {
  // Obtiene el contenido del cuerpo de la solicitud
  const body = request.body;
  // Obtiene el token de la solicitud usando la función auxiliar
  const token = getTokenFrom(request);

  try {
    // Verifica el token usando el secreto almacenado en el entorno
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      // Si el token es inválido o no contiene un ID, responde con un estado 401
      return response.status(401).json({ error: 'Token faltante o inválido' });
    }

    // Busca el usuario en la base de datos usando el ID decodificado del token
    const user = await User.findById(decodedToken.id);
    if (!user) {
      // Si no se encuentra el usuario, responde con un estado 404 (No encontrado)
      return response.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Crea un nuevo post con los datos de la solicitud y el ID del usuario autenticado
    const post = new Post({
      title: body.title,
      content: body.content,
      category: body.category,
      date: new Date(),
      user: user._id
    });

    // Guarda el post en la base de datos
    const savedPost = await post.save();
    // Agrega el ID del post recién creado al arreglo de posts del usuario
    user.posts = user.posts.concat(savedPost._id);
    // Guarda el usuario actualizado en la base de datos
    await user.save();
    // Responde con el post guardado y un estado 201 (Creado)
    response.status(201).json(savedPost);
  } catch (error) {
    // Si el error es de tipo JsonWebTokenError, responde con un estado 401 (No autorizado)
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({ error: 'Token inválido' });
    }
    // Para otros errores, responde con un estado 500 y un mensaje de error
    response.status(500).json({ error: 'Error al crear el post' });
  }
});

// Define una ruta DELETE para eliminar un post específico por su ID
postsRouter.delete('/:id', async (request, response) => {
  try {
    // Elimina el post de la base de datos usando el ID de la solicitud
    await Post.findByIdAndRemove(request.params.id);
    // Responde con un estado 204 (Sin contenido) si la eliminación fue exitosa
    response.status(204).end();
  } catch (error) {
    // Si hay un error, responde con un estado 500 y un mensaje de error
    response.status(500).json({ error: 'Error al eliminar el post' });
  }
});

// Define una ruta PUT para actualizar un post específico por su ID
postsRouter.put('/:id', async (request, response, next) => {
  // Obtiene el contenido del cuerpo de la solicitud
  const body = request.body;
  // Crea un objeto post con los datos actualizados
  const post = {
    title: body.title,
    content: body.content,
    category: body.category
  };

  try {
    // Actualiza el post en la base de datos usando el ID de la solicitud y devuelve el post actualizado
    const updatedPost = await Post.findByIdAndUpdate(request.params.id, post, { new: true });
    // Responde con el post actualizado en formato JSON
    response.json(updatedPost);
  } catch (error) {
    // Si hay un error, pasa el error al siguiente middleware
    next(error);
  }
});

// Exporta el enrutador de posts para que pueda ser utilizado en otros archivos de la aplicación
module.exports = postsRouter;
