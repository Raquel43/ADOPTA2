const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursosSchema = new Schema({
    tipo: {
        type: String
    }, 
    titulo: {
        type: String
    },
    descripcion: {
        type: String
    },
    meses: {
        type: Number
    },
    anyos:{
        type: Number
    },
    imagen:{
        type: String
    }

}, 
{ versionKey: false }
);

module.exports = mongoose.model('Mascotas', cursosSchema);