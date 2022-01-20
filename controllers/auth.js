const { request, response } = require("express");
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");




const login = async(req = request,res = response) => {

    const { email , password } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        return res.status(400).json({
            msg: " email/contraseña no son correctos "
        });
    }

    if ( !usuario.estado ) {
        return res.status(400).json({
            msg: " email/contraseña no son correctos "
        });
    }

    const validarPassword = bcryptjs.compareSync( password , usuario.password);
    if ( !validarPassword ) {
        return res.status(400).json({
            msg: " email/contraseña no son correctos "
        });
    }

    const token = await generarJWT( usuario.id );

    res.send(token);
};


const logout = ( req , res ) => {

    

}


module.exports = {
    login
};
