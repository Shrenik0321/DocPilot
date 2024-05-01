import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { pineconeConfig } from "../config/pineconeConfig.js";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { OPEN_AI_API_KEY } from "../config/envConfig.js";

export const vectorisePdfDataFunc = async (fileUrl) => {
  try {
    const res = await fetch(fileUrl);
    const blob = await res.blob();
    const loader = new PDFLoader(blob);
    const pageLevelDocs = await loader.load();

    const pineconeIndex = pineconeConfig.Index("docpilot");

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: OPEN_AI_API_KEY,
    });

    const vectorStore = await PineconeStore.fromDocuments(
      pageLevelDocs,
      embeddings,
      {
        pineconeIndex,
        maxConcurrency: 5,
      }
    );

    console.log(vectorStore);
  } catch (err) {
    console.log(err);
  }
};
