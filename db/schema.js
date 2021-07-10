// importando servidor
const {gql}  = require('apollo-server')


// El esquema de consulta
const typeDefs = gql`

    type Curso {
        titulo: String,
        tecnologia: String,
    }
    
    type Tecnologia {
        tecnologia: String,
    }

    type Query {
        obtenerCursos : [Curso] 

        obtenerTecnologia: [Tecnologia]
    }
`;

// Nota: si pasamos solo Curso solo devuelve un curso, si se quiere recibir varios curso debe colocarse en sintaxis de arreglo []

// Nota: Query serian las funciones que consultaran los datos

// Nota: Si usamos query en el schema, debemos usar el mismo nombre en el resolver

// El query siempre sera necesario

// No puedes haceer query a algo que noe sta registrado


 module.exports = typeDefs;