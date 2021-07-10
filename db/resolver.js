
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

module.exports = resolvers;