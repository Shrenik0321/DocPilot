import OpenAI from "openai";
import {
  OPEN_AI_API_KEY,
  OPEN_AI_ORGANISATION_ID,
  OPEN_AI_PROJECT_ID,
} from "./envConfig.js";
import { OpenAIEmbeddings } from "@langchain/openai";

export const openai = new OpenAI({
  apiKey: OPEN_AI_API_KEY,
  organization: OPEN_AI_ORGANISATION_ID,
  project: OPEN_AI_PROJECT_ID,
});

export const embeddings = new OpenAIEmbeddings({
  openAIApiKey: OPEN_AI_API_KEY,
});
