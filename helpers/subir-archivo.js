const path = require('path');
const { v4: uuidv4} = require('uuid');


const subirArchivo = (files , extensionesInvalidas = ['exec','js','rar','zip','html'], carpeta = '') => {

    return new Promise( ( resolve , reject ) => {

        const { documento } = files;
        const nombreCortado = documento.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];


        // Validar la extension
        if ( extensionesInvalidas.includes( extension ) ) {
            return reject(`La extensión ${ extension } no es permitida`);
        }

        const nameDocument = documento.name;
        const pathDocument = path.join( __dirname, '../uploads/', carpeta, nameDocument );

        documento.mv( pathDocument, (err) => {
            if ( err ) {
                reject(err);
            }

            resolve( {pathDocument , nameDocument} );
        })


    });

};

module.exports = {
    subirArchivo
}