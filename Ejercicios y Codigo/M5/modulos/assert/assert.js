const assert = require('assert');      // Para realizar pruebas de afirmaciones

// Usar 'assert' para pruebas de afirmaciones
try {
    assert.strictEqual(1 + 1, 2, 'La afirmación es falsa');
    console.log('La afirmación es correcta.');
} catch (error) {
    console.error('Error en la afirmación:', error.message);
}
