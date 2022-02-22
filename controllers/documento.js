const { response, request } = require("express");
const { subirArchivo } = require('../helpers/subir-archivo');
const path = require('path');
const fs = require('fs');

const Documento = require('../models/documento');


const cargarArchivo = async ( req , res = response ) => {
   
    try {

        const { id } = req.usuario;
        const id_usuario = id;
        let { created , description , tag } = req.body;
        created = Date(created);

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

const updateArchivo = async ( req ,  res = response  ) => {

    const { id } = req.params;

    const { description , tag , state , favorite , public } = req.body;

    const documento = await Documento.findByIdAndUpdate(id,{description,tag,state,favorite,public},{new:true});


    return res.json({
        documento
    });

}


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

const getDocumentPorNombreEtiqueta = async ( req , res = response) => {

    const { _id } = req.usuario;
    const { filtro } = req.params;

    if ( filtro ) {

        const documentos = await Documento.find({id_usuario:_id , $or:[{nameDocument:{ $regex: '.*' + filtro + '.*' }},{tag : { $regex: '.*' + filtro + '.*'}}]});  
        res.json({
            documentos
        });
    }
    else {
        const documentos = [];
        res.json({
            documentos
        });
    }

}

const getDocumentosEliminados = async ( req , res ) => {

    const { _id } = req.usuario;

        const documentos = await Documento.find({ id_usuario:_id , state: false });
        res.json({
            documentos
        });
    
}

const getDocumentosFavoritos = async ( req , res ) => {

    const { _id } = req.usuario;

        const documentos = await Documento.find({ id_usuario:_id , state: true , favorite: true });
        res.json({
            documentos
        });
    
}


const getArchivo = async (req, res) => {

    try {

        const { id } = req.params;

    const documento = await Documento.findById( id );

    if ( fs.existsSync( documento.pathDocument ) ){
        res.sendFile( documento.pathDocument );
    }
    else {

        res.json({
            msg: "NO existe el archivo solicitado"
        });

    }
        
    } catch (error) {

        res.status(400).json({
            msg: "No se encuentra el archivo"
        })
        
    }
}

    const getDocumentoFull = async (req, res) => {
    
        const { id } = req.params;
    
        const documento = await Documento.findById({_id:id});
    
        if ( fs.existsSync( documento.pathDocument ) ){

           return res.json({
                documento
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

const restoreArchivo = async( req , res = response) => {
    
   const { id } = req.params;

   const documento = await Documento.findByIdAndUpdate(id,{state: true});

   res.json({
       documento
   });

};




module.exports = {
    cargarArchivo,
    getDocumentoByUser,
    getDocumentosEliminados,
    deleteDocument,
    getArchivo,
    getDocumentPorNombreEtiqueta,
    getDocumentosFavoritos,
    updateArchivo,
    getDocumentoFull,
    restoreArchivo
};
