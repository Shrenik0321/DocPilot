import dotenv from "dotenv";

dotenv.config();

export const PINECONE_API_KEY = process.env.PINECONE_API_KEY || "";
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
