
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});


//Seeteamos el json que se devuelve cuando retornamos un usuario
UsuarioSchema.methods.toJSON = function() {

    //extraemos el __v,password del json y utilizamos el resto
    const { __v, password, ...usuario  } = this.toObject();
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );
