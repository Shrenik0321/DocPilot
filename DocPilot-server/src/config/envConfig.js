import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL || "";
export const SERVER_PORT = process.env.SERVER_PORT ?? 5555;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
export const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;
export const OPEN_AI_ORGANISATION_ID = process.env.OPEN_AI_ORGANISATION_ID;
export const OPEN_AI_PROJECT_ID = process.env.OPEN_AI_PROJECT_ID;
export const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
export const VECTOR_DATABASE = process.env.VECTOR_DATABASE;
export const OPEN_AI_MODEL_NAME = process.env.OPEN_AI_MODEL_NAME;
