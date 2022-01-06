const mongoose = require('mongoose');


const connectionDB = async () => 
{
    mongoose.connect(process.env.MONGODB,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    })
    .then(() => {console.log('Conectado a la base de datos');})
    .catch((err) => {console.error('Error al conectarse a la base de datos ',err)});
}

module.exports = { connectionDB };