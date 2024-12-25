import fs from 'fs';
import { credenciales } from './certificados/certificados.ts';
import https from 'https';
import express from "express";
import bodyParser from "body-parser";
import {router} from './routes/rutas.ts';

//Define el uso de express paar las APIS
const app = express();

//Define el servidor https con las credenciales
const httpsServer = https.createServer(credenciales, app);

//Define el parseador para los urls ingresados
app.use(bodyParser.json()); //application/json

//Define las cabeceras
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','*');
    //res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});

//Define las rutas
app.use('/',router);

//Inicia el servidor https
httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443 new');
});

/*app.listen(8080, () => {
    console.log(`Example app listening on port 8080`);
  })*/
