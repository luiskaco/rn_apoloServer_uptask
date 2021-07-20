// importando servidor
const {gql}  = require('apollo-server')


// El esquema de consulta
const typeDefs = gql`

    # Como se mostraran los datos

    type Curso {
        titulo: String,
        tecnologia: String,
    }
    
    type Tecnologia {
        tecnologia: String,
    }

    type Token {
        token: String
    }

    type Proyecto {
        nombre: String,
        id: ID
    }

    type Tarea {
        nombre: String,
        id: ID,
        proyecto: String,
        estado: Boolean
    }


    # Consultas

    type Query {
        obtenerCursos : [Curso] 
        obtenerTecnologia: [Tecnologia]

        #Proyecto
        obtenerProyectos : [Proyecto]

        #Tarea
        obtenerTareas(input: ProyectoIDInput) : [Tarea]
    }

    # Valores que de entrada

    input UsuarioInput {
        nombre: String!,
        email: String!,
        password: String!
    }

    input AutenticarInput{
        email: String!,
        password: String!
    }

    input ProyectoInput {
        nombre: String!
    }

    input TareaInput {
        nombre: String!,
        proyecto: String!
    }

    input ProyectoIDInput {
        proyecto: String!
    }


    type Mutation {  
        
        # USUARIO

        crearUsuario(input: UsuarioInput) : String 
        autenticarUsuario(input: AutenticarInput) : Token

        # PROYECTOS
        nuevoProyecto(input: ProyectoInput): Proyecto
        actualizarProyecto(id: ID!, input: ProyectoInput) : Proyecto
        eliminarProyecto(id: ID!) : String

        # TAREAS

        nuevaTarea(input: TareaInput) : Tarea
        actualizarTarea(id: ID!, input: TareaInput, estado: Boolean) : Tarea 
        
        eliminarTarea (id: ID!) : String


    }
`;
// ************************* NOTAD E Mutation ************************************

// NOta: el signo de ! en el ID significa obligatorio

/* nota: Para ingresar datos en los mutations usams en grap la funcion input seguido del nombre: 
            
    input UsuarioInput 

    nota: para la interacion es necesario especificar en el mutation el input de la siguiente forma
           
    crearUsuario(input: UsuarioInput) : String

    Nota; para qhacer que el campo sea obligatoro debemos agregarle un signo de exclamacion ! 

*/


// ************************* NOTAD E QUERY ************************************

// Nota: si pasamos solo Curso solo devuelve un curso, si se quiere recibir varios curso debe colocarse en sintaxis de arreglo []

// Nota: Query serian las funciones que consultaran los datos

// Nota: Si usamos query en el schema, debemos usar el mismo nombre en el resolver

// Nota: El query siempre sera necesario

// Nota: No puedes haceer query a algo que noe sta registrado

// NOta: Query funciona como un select mysql o un get de api


 module.exports = typeDefs;