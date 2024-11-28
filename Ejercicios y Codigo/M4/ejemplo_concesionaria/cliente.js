// cliente.js
class Cliente {
    constructor(nombre, presupuesto) {
        this.nombre = nombre;
        this.presupuesto = presupuesto;
    }

    // Método para mostrar información del cliente
    mostrarInfo() {
        return `Cliente: ${this.nombre}, Presupuesto: $${this.presupuesto}`;
    }
}

module.exports = Cliente;
