class Pedido {
    constructor(nombre, contenido, precio) {
        this.nombre = nombre; // Nombre del pedido
        this.contenido = contenido; // Descripción del contenido
        this.precio = precio; // Precio del pedido
        this.estado = 'Pendiente'; // Estado inicial del pedido
    }
}

module.exports = Pedido; // Exportar la clase Pedido