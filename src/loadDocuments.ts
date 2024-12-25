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
  /*console.log('\n');
  console.log(`El id del documento es: ${directoryDocs[0].id}`);
  console.log('\n');
  //console.log(directoryDocs[0].metadata);
  console.log(`La metadata es: ${directoryDocs[0].metadata}`);
  console.log('\n');
  console.log(`El contenido es: ${directoryDocs[0].pageContent}`);*/

  return directoryDocs;
}

//const rawDocuments = await loadDocuments();

//console.log(rawDocuments[0]);


  