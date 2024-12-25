import { Document } from "@langchain/core/documents";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function loadDocuments(): Promise<Document[]> {
  const rutaDirectorio = "docs/";

  /* Load all PDFs within the specified directory */
  const directoryLoader = new DirectoryLoader(rutaDirectorio, {
    ".pdf": (path) => new PDFLoader(path),
  });

  console.log(directoryLoader);

  console.log(
    `Inicia la carga de documentos.`
  );

  const directoryDocs = await directoryLoader.load();

  console.log(`${directoryDocs.length} documentos cargados.`);
  return directoryDocs;
}

//Para teste
//const rawDocuments = await loadDocuments();
//console.log(rawDocuments[0]);


  