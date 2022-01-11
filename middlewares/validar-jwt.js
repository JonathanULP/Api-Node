const { request, response } = require("express");
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');



const validarJWT = async ( req=request , res=response, next ) => {

    //obtenemos el header
    const token = req.header('Authorization');


    if ( !token ) {

        return res.status(401).json({
            msg: 'No tiene autorización'
        });

    }

    try {

        //La funcion jwt.verify retorna el payload y nosotros en el archivo generar-jwt creamos el payload y su unico 
        //contenido es el id del usuario. Por esa razon la obtengo aca
        const { uid } = jwt.verify( token , process.env.SECRETORPRIVATEKEY);

        //buscamos el usuario por id
        const usuario = await Usuario.findById( uid );

        //verificamos que el usuario exista y este activo
        if ( !usuario || !usuario.estado) {

            return res.status(401).json({
                msg: 'El token no es válido'
            });

        }

        req.usuario = usuario;
        next();
        
    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido',
            error
        })

    }


};


module.exports = {
    validarJWT
};