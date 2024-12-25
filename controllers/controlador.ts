import {generateAnswer} from '../src/ragtest.ts';
import { createRetriever } from "../src/retrievertest";

export const preguntaIa = async (req, res, next) => {
    console.log('Entro a controlador');
    //console.log(req);
    console.log(req.body);
    const mensajeRol = req.body.mensaje_rol
    const tipoPregunta = req.body.tipo_pregunta;
    const indice = req.body.indice;
    const pregunta = req.body.pregunta;
    const temperatura = req.body.temperatura;

    const retriever = await createRetriever(indice);
    
    const respuesta = await generateAnswer(mensajeRol, tipoPregunta, indice, pregunta, temperatura);

    res.status(201).json({
        respuesta: respuesta,
        fecha: new Date().toISOString()
    });
}