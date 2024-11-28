// venta.js
const Auto = require('./auto');
const Vendedor = require('./vendedor');
const Cliente = require('./cliente');

class Venta {
    constructor(auto, vendedor, cliente) {
        this.auto = auto;
        this.vendedor = vendedor;
        this.cliente = cliente;
    }

    // Método para realizar la venta
    realizarVenta() {
        if (this.cliente.presupuesto >= this.auto.precio) {
            return `${this.cliente.nombre} compró el ${this.auto.mostrarInfo()} de ${this.vendedor.nombre}.`;
        } else {
            return `${this.cliente.nombre} no tiene suficiente presupuesto para comprar el ${this.auto.mostrarInfo()}.`;
        }
    }
}

module.exports = Venta;
