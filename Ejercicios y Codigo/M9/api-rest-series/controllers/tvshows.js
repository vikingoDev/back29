const TVShow = require('../models/TVShow'); // Importa el modelo TVShow desde la carpeta models

// GET - Devuelve todas las series de TV en la base de datos
exports.findAllTVShows = async function (req, res) {
  try {
    const tvshows = await TVShow.find(); // Busca todas las series en la base de datos
    console.log(tvshows); // Muestra los datos en la terminal
    res.status(200).json({ success: true, data: tvshows }); // Devuelve el resultado en formato JSON
  } catch (err) {
    console.error(err); // Muestra el error en la terminal
    res.status(500).json({ success: false, message: 'Error al obtener series de TV', error: err.message }); // Manejo de errores
  }
};

// GET - Devuelve una serie de TV con el ID especificado
exports.findById = async function (req, res) {
  try {
    const tvshow = await TVShow.findById(req.params.id); // Busca la serie de TV por ID
    if (!tvshow) return res.status(404).json({ success: false, message: 'TVShow no encontrado' }); // Maneja el caso donde no se encuentra la serie
    console.log(tvshow); // Muestra la serie encontrada en la terminal
    res.status(200).json({ success: true, data: tvshow }); // Devuelve la serie en formato JSON
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al obtener la serie', error: err.message }); // Manejo de errores
  }
};

// PUT - Actualiza una serie de TV con el ID especificado
exports.updateTVShow = async function (req, res) {
  try {
    const updatedTVShow = await TVShow.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Actualiza la serie de TV
    if (!updatedTVShow) return res.status(404).json({ success: false, message: 'TVShow no encontrado' }); // Maneja el caso donde no se encuentra la serie
    res.status(200).json({ success: true, data: updatedTVShow, version: updatedTVShow.__v }); // Devuelve la serie actualizada
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al actualizar el registro', error: err.message }); // Manejo de errores
  }
};

// POST - Inserta una nueva serie de TV en la base de datos
exports.addTVShow = async function (req, res) {
  try {
    const tvshow = new TVShow(req.body); // Crea una nueva instancia de TVShow con los datos del cuerpo de la solicitud
    const savedTVShow = await tvshow.save(); // Guarda la nueva serie en la base de datos
    res.status(201).json({ success: true, data: savedTVShow }); // Devuelve la serie creada con estado 201 (Creado)
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al crear la serie', error: err.message }); // Manejo de errores
  }
};

// DELETE - Elimina una serie de TV con el ID especificado
exports.deleteTVShow = async function (req, res) {
  try {
    const deletedTVShow = await TVShow.findByIdAndDelete(req.params.id); // Elimina la serie de TV por ID
    if (!deletedTVShow) return res.status(404).json({ success: false, message: 'TVShow no encontrado' }); // Maneja el caso donde no se encuentra la serie
    res.status(204).send(); // Responde con estado 204 (Sin contenido) al eliminar con éxito
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error al eliminar la serie', error: err.message }); // Manejo de errores
  }
};