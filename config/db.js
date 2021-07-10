// importando moongose
const mongoose = require('mongoose')

// Importando dotenv
require('dotenv').config({ path: 'variables.env'})

// Creando variable de conexion
const conectarDB = async () => {
    try {
        
        // accedemos al env con process.env
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex:true,
        })

        console.log('DB Conectada');

    } catch (error) {
        console.log('Hubo un error');
        console.log(error);

        process.exit(1); // para detener la app
    }
}

module.exports = conectarDB;