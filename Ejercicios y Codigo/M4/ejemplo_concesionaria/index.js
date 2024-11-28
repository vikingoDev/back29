// index.js
const Auto = require('./auto');
const Vendedor = require('./vendedor');
const Cliente = require('./cliente');
const Venta = require('./venta');

// Crear instancias de Auto, Vendedor y Cliente
const auto1 = new Auto('Toyota', 'Corolla', 2020, 20000);
const vendedor1 = new Vendedor('Carlos Pérez');
const cliente1 = new Cliente('Ana Gómez', 25000);

// Crear una instancia de Venta y realizar la venta
const venta1 = new Venta(auto1, vendedor1, cliente1);
console.log(venta1.realizarVenta());

// Cambiar el presupuesto del cliente y realizar la venta nuevamente
cliente1.presupuesto = 15000;
console.log(venta1.realizarVenta());
