import { Pinecone } from "@pinecone-database/pinecone";
import { PINECONE_API_KEY } from "../config/envConfig.js";

export const pineconeConfig = new Pinecone({
  apiKey: PINECONE_API_KEY,
});
