// importando servidor
const {ApolloServer, gql}  = require('apollo-server')


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

const cursos = [
    {
        titulo: 'Javascrits Moderno Guía definitiva construye +10 proyectos',
        tecnologia: 'JavaScript ES6',
    },
    {
        titulo: 'React - La guía completa: Hooks Context Redux Mern + 15 Apps',
        tecnologia: 'React',
    },
    {
        titulo: 'Node.js - Bootcamp Desarrollo web inc.  MVC y Rest API',
        tecnologia: 'Node.js',
    },
    {
        titulo: 'ReactJS Avanzado - FullStack React Graphql y Apollo',
        tecnologia: 'React',
    },
]


// Nota: resolvers son Los que se encarga de conectar con la base de datos
const resolvers = {
    Query: {
        obtenerCursos : () => cursos,

        obtenerTecnologia: () => cursos
    }
}
// Nota: El resolver siemrpe van hacer funciones


// Iniciar servidor appollo
const server = new ApolloServer({typeDefs, resolvers});

// NOta: se debe psar primero los typeDef y luego los resolver

server.listen().then(({url}) => {
    console.log(`Servidor listo en la URL ${url}`)
})