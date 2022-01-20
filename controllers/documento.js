const { response, request } = require("express");
const { subirArchivo } = require('../helpers/subir-archivo');
const path = require('path');
const fs = require('fs');

const Documento = require('../models/documento');


const cargarArchivo = async ( req , res = response ) => {

    const { id } = req.usuario;
    const id_usuario = id;
    let { created , description , tag } = req.body;
    created = Date(created);
   
    try {

        const {pathDocument , nameDocument} = await subirArchivo(req.files,undefined,id_usuario);

        const documento = new Documento({ nameDocument , created , pathDocument , description , tag , id_usuario });
        documento.save();


        res.json({
            msg :"Carga de archivos",
            pathDocument,
            id_usuario,
            nameDocument,
            documento
        });
        
    } catch (error) {

        res.status(400).json({
            error
        });
        
    }

};


const getDocumentoByUser = async ( req, res = response) => {

    const { _id } = req.usuario;
    const { etiqueta } = req.query;

    if ( etiqueta ) {
        const documentos = await Documento.find({ id_usuario:_id , state: true , tag: etiqueta });
        res.json({
            documentos
        });
        
    } 
    else {
        const documentos = await Documento.find({ id_usuario:_id , state: true });
        res.json({
            documentos
        });
    }
};


const getArchivo = async (req, res) => {

    const { id } = req.params;

    const documento = await Documento.findById( id );

    if ( fs.existsSync( documento.pathDocument ) ){
        res.sendFile( documento.pathDocument );
    }
    else {

        res.json({
            msg: "NO existe"
        });

    }

}



const deleteDocument = async ( req , res=response ) => {

    const { id } = req.params;

    const documento = await Documento.findByIdAndUpdate(id , {state: false});

    res.json({
        documento,
        id
    });

}


module.exports = {
    cargarArchivo,
    getDocumentoByUser,
    deleteDocument,
    getArchivo
};
