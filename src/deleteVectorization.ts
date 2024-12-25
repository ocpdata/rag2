import dotenv from "dotenv";
import { loadDocuments } from "./loadDocuments";
import { splitDocuments } from "./splitDocuments";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import cliProgress from "cli-progress";

dotenv.config();

const embeddingLLM = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
});

const pinecone = new Pinecone();

const pineconeIndex = pinecone.index('pdf4');

const vectorStore = await PineconeStore.fromExistingIndex(embeddingLLM, {
    pineconeIndex,
});

await vectorStore.delete({
    deleteAll: true,
});

console.log('Booró el vector store de Pinecone');