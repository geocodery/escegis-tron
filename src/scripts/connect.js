class conn {
    constructor() {
        this.mongoose = require('mongoose');
        // Realizando la conexion
        this.mongoose.connect('mongodb://localhost/escegis', { useNewUrlParser: true });
        this.gpo_distritos = this.mongoose.model('gpo_distritos', {});
    }

};

// Exportamos la clase
module.exports = {conn};