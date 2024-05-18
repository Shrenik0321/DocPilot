import { Pinecone } from "@pinecone-database/pinecone";
import { PINECONE_API_KEY, VECTOR_DATABASE } from "../config/envConfig.js";

export const pineconeConfig = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

export const pineconeIndex = pineconeConfig.Index(VECTOR_DATABASE);
