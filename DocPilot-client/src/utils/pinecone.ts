import { Pinecone } from "@pinecone-database/pinecone";

export const pinecone = new Pinecone({
  apiKey: "2afc37df-78ff-45b8-ac26-44b7332833f2",
});
const index = pinecone.index("quickstart");
