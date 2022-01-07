const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const getUsuario = async(req,res) => 
{
    res.json("Usuarios");
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


module.exports = {

    getUsuario,
    postUsuario

}