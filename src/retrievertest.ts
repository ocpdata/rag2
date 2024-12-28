import { VectorStoreRetriever } from "@langchain/core/vectorstores";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import dotenv from "dotenv";

dotenv.config();

//Crea el retriever. Se le debe indicar el indice del VectorStore (Pinecone)
export async function createRetriever(indice): Promise<VectorStoreRetriever> {
    console.log('Crea el retiever');

    console.log('Indice:', indice);
    
    const embeddingLLM = new OpenAIEmbeddings({
        model: "text-embedding-3-small",
    });

    const pinecone = new Pinecone();

    const pineconeIndex = pinecone.index(indice);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddingLLM, {
        pineconeIndex,
    });

    const retriever = vectorStore.asRetriever();

    return retriever;
}
