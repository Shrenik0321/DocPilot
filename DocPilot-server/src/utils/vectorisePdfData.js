import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { pineconeIndex } from "../config/pineconeConfig.js";
import { PineconeStore } from "@langchain/pinecone";
import { embeddings } from "../config/openAiConfig.js";

export const vectorisePdfDataFunc = async (fileUrl) => {
  try {
    const res = await fetch(fileUrl);
    const blob = await res.blob();
    const loader = new PDFLoader(blob);
    const pageLevelDocs = await loader.load();

    await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
      pineconeIndex,
      maxConcurrency: 5,
    });
  } catch (err) {
    console.log(err);
  }
};
