const express = require('express');
const cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.usuariosPath1 = '/api/areas';
        this.usuariosPath2 = '/api/empresas';


        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares(){

        //CORS
        //this.app.use( cors());

        //Lectura y Parseo del Body 
        this.app.use( express.json() );

        //Directorio Público
        this.app.use( express.static('public'));


    }

    routes(){
       
       
       this.app.use(this.usuariosPath, require('../routes/persona'));
       this.app.use(this.usuariosPath1, require('../routes/area'));
       this.app.use(this.usuariosPath2, require('../routes/empresa'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server on port', this.port);
        });
    }


}

module.exports = Server;