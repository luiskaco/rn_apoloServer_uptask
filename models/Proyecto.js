// importamos moongose
const mongoose = require('mongoose');

const ProyectoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim:true
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId, // Caputra el id de la peronsa
        ref: 'Usuario' // Busca la referencia dle otro modelo
    },
    creado:{
        type:Date,
        default: Date.now()
    }
})

// nota:  type: mongoose.Schema.Types.ObjectId toma lo que contiene el id  

module.exports = mongoose.model('Proyecto', ProyectoSchema);