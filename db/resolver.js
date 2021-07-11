// Importando dotenv
require('dotenv').config({ path: 'variables.env'})
// Importamos el modelo 
const Usuario = require('../models/Usuario');
// importando proyecto
const Proyecto = require('../models/Proyecto');
// Importando el encriptador
const bcryptjs = require('bcryptjs');
// Importando jsonWeb token
const jwt = require('jsonwebtoken');
const { CheckResultAndHandleErrors } = require('apollo-server');



// Crea y firma un JWT

const crearToken = (usuario, secreta, expiresIn) => {
  console.log(usuario)

  const { _id , email} = usuario;

  // Firmamos el token
  return jwt.sign({_id, email}, secreta,  {expiresIn});

}

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
    // Nota: Query funciona como un selecy  y un get-
    Query: {
        obtenerCursos : () => cursos,
        obtenerTecnologia: () => cursos,

        // Obtener proyectos
        obtenerProyectos : async (_, {input}, ctx) => {
            const proyectos = await Proyecto.find({ creador: ctx.usuario._id});

            return proyectos;
        }
    },
    // Nota: Funciona como un create, delete, update
    Mutation:{
        // Para crear usuario
        crearUsuario : async (_, {input}, ctx, info) => {
            // Desectructuramos objeto
            const {email, password } = input;

            // Comprobamos si existe usuario
            const existeUsuario = await Usuario.findOne({email})

            // console.log(existeUsuario)

            // si existe Usuario
            if(existeUsuario){
                throw new Error('El usuario ya esta registrado')
            }

            // Crear usuario
            try {

                // hash del password
                const salt = await bcryptjs.genSalt(10);
                input.password = await bcryptjs.hash(password, salt);

                // console.log(input);

                // Creamos la instancia del objeto usuario
                const nuevoUsuario = await new Usuario(input);
                console.log(nuevoUsuario)

                // Guardamos en la BaSE de datos
                nuevoUsuario.save();

                // Retornamos el string segun el schema
                return "Usuario creado correctamente";
            } catch (error) {
                console.log(error)
            }

            console.log('creando usuario')
        },
        // Para autenticar

        autenticarUsuario : async (_, {input}, ctx, info) => {
            // Desectructuramos objeto
            const {email, password } = input;

            // Comprobamos si existe usuario
            const existeUsuario = await Usuario.findOne({email})

            if(!existeUsuario){
                throw new Error('El usuario no existe');
            }

            // Si el password es correcto
            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            // Nota: el return es true o false

            if(!passwordCorrecto){
                throw new Error('Password esta incorrecto');
            }

            console.log(passwordCorrecto);

            // Dar Acceso a la app

            return {
                // Retornamos un token
                token: crearToken(existeUsuario , process.env.SECRETA, '2hr')
            }
            return "Has iniciado sesión"
   
        },
        // Para proyectos
        nuevoProyecto : async (_, {input}, ctx, info) => {
          // console.log('desde resolver', ctx)

            try {
                const proyectoCreado = await new Proyecto(input);

                // asociar el creado
                proyectoCreado.creador = ctx.usuario._id

                // Guardamos proyecto
                const resultado = await proyectoCreado.save();

                // Retornaos un objeto
                return resultado;

            } catch {
                console.log(error)

            }

            console.log('creando proyectops4 slimg')

        },
        actualizarProyecto : async (_, {id, input}, ctx, info) => { 
            // Revisar que el proyecto existe
             let proyecto = await Proyecto.findById(id);

            if(!proyecto){
                throw new Error('Proyecto No encontrado');
            }

            // // Verificar que la persona que edita es el creador
                
            
                    // console.log(typeof proyecto.creador)

                    //  nota: convertimos el objcto creado en string
                

                if(proyecto.creador.toString() !== ctx.usuario._id){
                    throw new Error('No tienes las credenciales para editar');
                }

            // Guardar el proyecto
            proyecto = await Proyecto.findOneAndUpdate({_id: id}, input, {new: true});

            // Return proyecto
            return proyecto;
        },
        eliminarProyecto: async (_, {id}, ctx, info) => {  
             // Revisar que el proyecto existe
             let proyecto = await Proyecto.findById(id);

            if(!proyecto){
                throw new Error('Proyecto No encontrado');
            }

            // Tevisar que la persona es la creadora
            if(proyecto.creador.toString() !== ctx.usuario._id){
                throw new Error('No tienes las credenciales para editar');
            }

            // Eliminar proyecto

            await Proyecto.findByIdAndDelete({_id: id});

            return "Proyecto Eliminado";

        }
    }

    /**
     **   posicion: _ es el resultado del type padre
     **    posicion2: argumentos que se pasan 
     **   posicion3: context es un objeto qeu se comparte en todos los resolver. Sirve para revisar todos los usuarios autenticado
     **    posicion4:  se le conoce como info a  la informacion actual
     **/

}
// Nota: El resolver siemrpe van hacer funciones

module.exports = resolvers;