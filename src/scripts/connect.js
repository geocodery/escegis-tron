class conn {
    constructor() {
        this.mongoose = require('mongoose');
        // Realizando la conexion
        this.mongoose.connect('mongodb://admin:ersolitario3@ds139942.mlab.com:39942/escegis', { useNewUrlParser: true });
        this.gpo_distritos = this.mongoose.model('gpo_distritos', {});
    }

};

// Exportamos la clase
module.exports = {conn};