const path = require('path');


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
        const pathDocument = path.resolve( __dirname, '../public/uploads/', carpeta, nameDocument );

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