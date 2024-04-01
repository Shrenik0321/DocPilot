import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL || "";
export const SERVER_PORT = process.env.SERVER_PORT ?? 5555;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
