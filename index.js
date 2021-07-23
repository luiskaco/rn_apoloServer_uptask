// importando servidor
const {ApolloServer}  = require('apollo-server')

// Importamos jwt
const jwt = require('jsonwebtoken');

// Importando dotenv
require('dotenv').config({ path: 'variables.env'})

// importamos schema
const typeDefs = require('./db/schema');  // type definition

// importando resolvers
const resolvers =require('./db/resolver');

// Importando conecion DB
const conectarDB = require('./config/db');

// Conectar a la BD
conectarDB();



// Iniciar servidor appollo
const server = new ApolloServer(
    {
        typeDefs, 
        resolvers,
        
        context: ({req}) => {
            console.log(req.headers['authorization'])

            // Obtenemos el token
            const token = req.headers['authorization'] || '';
            // Nota: Validamos si esta autenticado  o no
           
            //  console.log(req.headers)
            
            // Si hay un token
            if(token){ 
                const tokenClean = token.replace('Bearer ','');

                try {
                    const usuario = jwt.verify(tokenClean, process.env.SECRETA);
                    // Obtenemos los valores del usuario autenticado

                         console.log(usuario);

                    return {
                        usuario
                    }
               
          
                    
                }catch (error){
                    console.log(error)
                }
            }
        }
    });

// NOta: se debe psar primero los typeDef y luego los resolver

server.listen({ port: process.env.PORT || 4000 }).then(({url}) => {
    console.log(`Servidor listo en la URL ${url}`)
})

/**
 *  nota: { port: process.env.PORT || 4000 } heroku autmaticamente nos asigna un peurto. Si estmaos en local se usa el 4000
 */