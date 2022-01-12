const { response } = require("express");
const { subirArchivo } = require('../helpers/subir-archivo');

const Documento = require('../models/documento');


const cargarArchivo = async ( req , res = response ) => {

    const { id } = req.usuario;
    let { created , description , tag , id_usuario} = req.body;
    created = Date(created);
   
    try {

        const {pathDocument , nameDocument} = await subirArchivo(req.files,undefined,id);

        const documento = new Documento({ nameDocument , created , pathDocument , description , tag , id_usuario});
        documento.save();


        res.json({
            msg :"Carga de archivos",
            pathDocument,
            id,
            nameDocument,
            documento
        });
        
    } catch (error) {

        res.status(400).json({
            error
        });
        
    }

}

module.exports = {
    cargarArchivo
}
