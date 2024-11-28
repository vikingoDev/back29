// vendedor.js
class Vendedor {
    constructor(nombre) {
        this.nombre = nombre;
    }

    // Método para mostrar información del vendedor
    mostrarInfo() {
        return `Vendedor: ${this.nombre}`;
    }
}

module.exports = Vendedor;
