// importando servidor
const {ApolloServer}  = require('apollo-server')

// importamos schema
const typeDefs = require('./db/schema');  // type definition

// importando resolvers
const resolvers =require('./db/resolver');

// Importando conecion DB
const conectarDB = require('./config/db');

// Conectar a la BD
conectarDB();


// Iniciar servidor appollo
const server = new ApolloServer({typeDefs, resolvers});

// NOta: se debe psar primero los typeDef y luego los resolver

server.listen().then(({url}) => {
    console.log(`Servidor listo en la URL ${url}`)
})