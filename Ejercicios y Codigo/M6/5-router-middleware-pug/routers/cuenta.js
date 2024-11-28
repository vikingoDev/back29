const express = require("express");
const personas = require("../personas.js");
const cuentaRouter = express.Router();

// Obtener los detalles de una cuenta a partir del id
cuentaRouter.get("/cuenta/:id", (req, res) => {
    const id = Number(req.params.id); // Convierte el parámetro a número si es necesario
    const user = personas.find((user) => user.id === id);
    //req.params.id;
    if (!user) return res.status(404).send("Usuario no encontrado");
    //res.send(user);
    // Renderiza la vista 'detalleCuenta.pug' y pasa el objeto 'user'
    res.render('detalleCuenta', { usuario: user });
});

// Crear una nueva cuenta
cuentaRouter.post("/cuenta", (req, res) => {
    const { id, nombre } = req.body;
    if (!id) return res.state(400).send();
    const user = personas.find((user) => user.id === id);
    if (user) return res.status(409).send();

    personas.push({
        id,
        nombre
    });
    console.log(personas);
    //res.send();
    res.redirect(`/cuenta/${id}`);  // Redirige a la página de detalles de la cuenta
});

// Actualizar una cuenta
cuentaRouter.patch("/cuenta/:id", (req, res) => {
    const id = Number(req.params.id);  // Convierte el parámetro a número si es necesario
    const user = personas.find((user) => user.id === id);  // Encuentra al usuario
    
    if (!user) return res.status(404).send("Usuario no encontrado");  // Si no se encuentra, devuelve un 404

    // Actualiza solo los campos que están en el cuerpo de la solicitud
    const { nombre } = req.body;
    
    if (nombre) user.nombre = nombre;  // Si el nombre fue enviado en el cuerpo, actualízalo

    // Devuelve el usuario actualizado
    //res.send({ mensaje: "Usuario actualizado", usuario: user });
    res.render('detalleCuenta', { mensaje: "Usuario actualizado", usuario: user });
    console.log(personas);
});

// Eliminar una cuenta
cuentaRouter.delete("/cuenta/:id", (req, res) => {
    const id = Number(req.params.id);  // Convierte el parámetro a número si es necesario
    const userIndex = personas.findIndex((user) => user.id === id);  // Encuentra el índice del usuario
    
    if (userIndex === -1) {
        return res.status(404).send("Usuario no encontrado");  // Si no se encuentra, devuelve un 404
    }
    
    // Elimina el usuario del array
    const deletedUser = personas.splice(userIndex, 1);  // Elimina el usuario en el índice encontrado
    console.log(personas);
    // Envía una respuesta de éxito con los datos del usuario eliminado
    //res.send({ mensaje: "Usuario eliminado", usuario: deletedUser });
    res.render('usuarioEliminado', { mensaje: "Usuario eliminado", usuario: deletedUser[0] });
});

module.exports =cuentaRouter;