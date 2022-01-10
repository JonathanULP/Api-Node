const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const getUsuario = async(req,res) => 
{

    const {limite = 5, desde = 0} = req.query;

    [ total , usuarios ] = await Promise.all([
       Usuario.countDocuments({estado: true}),
       Usuario.find({estado: true})
              .skip(desde)
              .limit(limite) 
    ]);
    res.json({
        total,
        usuarios
    });
}

const postUsuario = async(req = request, res = response) => {

    const {name,email,password} = req.body;
    const usuario = new Usuario({name,email,password});

    const salt = bcryptjs.genSaltSync(12);
    usuario.password = bcryptjs.hashSync(password,salt);

    usuario.save();
    
    res.json({
      usuario 
    });

};

const putUsuario = async(req,res) => {

    const { id } = req.params;

    const {_id,password,google,email, ...resto} = req.body;

    //verificamos si envia el password y modificamos
    if ( password ) {

        const salt = bcryptjs.genSaltSync(12);
        resto.password = bcryptjs.hashSync(password,salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({ usuario });

};

const deleteUsuario = async( req , res ) => {

    //obtenemos el ID desde los parametros
    const { id } = req.params;

    //Eliminar logicamente
    const usuario = await Usuario.findByIdAndUpdate( id , {estado: false} )

    res.json({
        usuario
    })


};


module.exports = {

    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario

}