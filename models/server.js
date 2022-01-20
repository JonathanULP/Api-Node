const express = require('express');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const cors = require('cors');
const path = require('path');

const { connectionDB } = require('../database/config');



class Server 
{

    constructor()
    {
        this.app  = express();
        this.port = process.env.PORT;
        this.connection = process.env.MONGODB;

        this.authPath = '/api/auth';
        this.usuariosPath = '/api/usuarios';
        this.documentosPath = '/api/documentos';
        

        // Conectar a base de datos
        this.conectarDB();

        //middlewares
        this.middlewares();

         // Mis rutas
        this.routes();
    }


    async conectarDB()
    {
        await connectionDB();
    }


    routes() {

        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.usuariosPath, require('../routes/usuario'));
        this.app.use( this.documentosPath, require('../routes/documento'));
        
    }

    middlewares() {

        //CORS
        this.app.use( cors() );
        // Lectura y parseo del body
        this.app.use( express.json() );

        //Configuracion de fileuppload
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

        this.app.use(express.static('public'));

    }

    listen()
    {
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto', process.env.PORT );
        });
    }

};


module.exports =  Server ;