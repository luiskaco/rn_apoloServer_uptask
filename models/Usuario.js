// importamos moongose
const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
      nombre:{
        type: String,
        required: true,
        trim:true   // Limpia espacios
      },
      email:{
        type: String,
        required: true,
        trim:true,
        unique:true,
        lowercase:true
      },
      password:{
        type: String,
        required: true,
        trim:true   // Limpia espacios
      },
      registro:{
        type:Date,
        default: Date.now() // Toma la fecha del registro
      }   
});


module.exports = mongoose.model('Usuario', UsuariosSchema);