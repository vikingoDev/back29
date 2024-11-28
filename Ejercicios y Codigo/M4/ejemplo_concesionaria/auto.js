// auto.js
class Auto {
    constructor(marca, modelo, anio, precio) {
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.precio = precio;
    }

    // Método para mostrar información del automóvil
    mostrarInfo() {
        return `${this.marca} ${this.modelo} (${this.anio}) - $${this.precio}`;
    }
}

module.exports = Auto;
