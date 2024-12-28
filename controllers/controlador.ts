import {generateAnswer} from '../src/ragtest.ts';
//import { createRetriever } from "../src/retrievertest";

export const preguntaIa = async (req, res, next) => {
    console.log('Entro a controlador preguntaIa');
 
    const mensajeRol = req.body.mensaje_rol
    const tipoPregunta = req.body.tipo_pregunta;
    const indice = req.body.indice;
    const pregunta = req.body.pregunta;
    const temperatura = req.body.temperatura;

    console.log('mensajeRol: ', mensajeRol);
    console.log('tipoPregunta: ', tipoPregunta);
    console.log('indice: ', indice);
    console.log('pregunta: ', pregunta);
    console.log('temperatura: ', temperatura);

    //const retriever = await createRetriever(indice);
    
    const respuesta = await generateAnswer(mensajeRol, tipoPregunta, indice, pregunta, temperatura);

    //Respuesta de la IA
    console.log('Respuesta de la IA:', respuesta);
    res.status(201).json({
        respuesta: respuesta,
        fecha: new Date().toISOString()
    });
}