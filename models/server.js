const express = require('express');
require('dotenv').config();

const { connectionDB } = require('../database/config');



class Server 
{

    constructor()
    {
        this.app  = express();
        this.port = process.env.PORT;
        this.connection = process.env.MONGODB;
        this.usuariosPath = '/api/usuarios';

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
        this.app.use( this.usuariosPath, require('../routes/usuario'));
    }

    middlewares() {

        // Lectura y parseo del body
        this.app.use( express.json() );

    }

    listen()
    {
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto', process.env.PORT );
        });
    }

};


module.exports =  Server ;