import {generateAnswer} from '../src/ragtest.ts';
import { createRetriever } from "../src/retrievertest";

export const getPosts = async (req, res, next) => {
    console.log('Get');
    res.status(200).json({
        posts: [{ title: 'First Post'}, {contents: 'This is the other first post! '}]
    });
};

export const createPost = async (req, res, next) => {
    console.log('Post');
    const title = req.body.title;
    const content = req.body.content;
    
    const respuesta = await generateAnswer(title,title,title, title);
    
    console.log(respuesta);

    res.status(201).json({
        message: respuesta,
        post: {id: new Date().toISOString(), title: title, content: content}
    });


};

export const preguntaIa = async (req, res, next) => {
    console.log('Entro a controlador');
    //console.log(req);
    console.log(req.body);
    const mensajeRol = req.body.mensaje_rol
    const tipoPregunta = req.body.tipo_pregunta;
    const indice = req.body.indice;
    const pregunta = req.body.pregunta;
    //const preguntaResumen = pregunta + ". Contestar con una sola palabra, si o no.";
    //const mensajeRolResumen = "Contestar con una sola palabra, si o no.";

    const retriever = await createRetriever(indice);
    
    const respuesta = await generateAnswer(mensajeRol, tipoPregunta, indice, pregunta);

    res.status(201).json({
        respuesta: respuesta,
        fecha: new Date().toISOString()
    });

    /*if (indice == 'pdf4'){
        const respuestaResumen = await generateAnswer(mensajeRol, tipoPregunta, indice, preguntaResumen);
        res.status(201).json({
            respuesta_resumen: respuestaResumen,
            respuesta: respuesta,
            fecha: new Date().toISOString()
        });
    } else {
        res.status(201).json({
            respuesta: respuesta,
            fecha: new Date().toISOString()
        });
    }*/
}