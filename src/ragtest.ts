import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createRetriever } from "./retrievertest";
import { RunnableSequence } from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";
import dotenv from "dotenv";
//import { syncBuiltinESMExports } from "module";

dotenv.config();

let prompt;

const outputParser = new StringOutputParser();

//Función que genera una respuesta usando RAG.
//Se entrega la respuesta en base al tipo de consulta y al indice de donde se buscará en el vector database.
export async function generateAnswer(mensajeRol, tipo_pregunta, indice, pregunta, temperatura): Promise<String> {
    console.log('Entró a generateAnswer', mensajeRol, tipo_pregunta, indice, pregunta);

    const llm = new ChatOpenAI({
        model: "gpt-4o-mini",
        temperature: temperatura,
        maxTokens: 500,
      });

    //Crea el prompt de acuerdo a la consulta
    let mensaje: string;
    switch (tipo_pregunta){
        case 'consulta':
            mensaje = mensajeRol + `Pregunta: {question} 
              Contexto: {context} 
              Respuesta:`;
            console.log(mensaje);
            prompt = ChatPromptTemplate.fromMessages([
                [
                  "human", mensaje,
                ],
              ]);

        case 'chat':
            break;

        default:
            break;
    }

    //Crea el retriever de acuerdo al indice
    const retriever = await createRetriever(indice);

    //Obtiene el contexto del retriever
    const retrievalChain = RunnableSequence.from([
        (input) => input.question,
        retriever,
        formatDocumentsAsString,
    ]);

    //Crea la cadena del RAG
    const generationChain = RunnableSequence.from([
        {
            question: (input) => input.question,
            context: retrievalChain,
        },
        prompt,
        llm,
        outputParser,
    ]);

    //Hace la pregunta
    const respuesta = await generationChain.invoke({
        question: pregunta,
    });
    
    //Devuelve la respuesta
    return respuesta;
}

//Para test
/*const response = await generateAnswer('consulta', 'pdf4', 'como es el proceso de venta?');
console.log(response);*/