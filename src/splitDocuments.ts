import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
//import { loadDocuments } from "./loadDocuments";

export async function splitDocuments(rawDocuments: Document[]): Promise<Document[]> {
  console.log("Inicia la división de documentos en partes...");

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });

  const documentChunks = await splitter.splitDocuments(rawDocuments);

  console.log(
    `${rawDocuments.length} documentos divididos en ${documentChunks.length} partes.`
  );

  return documentChunks;
}

//Para test
//const rawDocuments = await loadDocuments();
//await splitDocuments(rawDocuments);
