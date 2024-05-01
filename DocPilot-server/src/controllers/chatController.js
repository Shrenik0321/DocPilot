import { openai } from "../config/openAiConfig.js";

import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { pineconeConfig } from "../config/pineconeConfig.js";
import { OPEN_AI_API_KEY } from "../config/envConfig.js";

export const chatController = async (req, res) => {
  try {
    const { content } = req.body;

    const pineconeIndex = pineconeConfig.Index("docpilot");

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: OPEN_AI_API_KEY,
    });

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
    });

    const results = await vectorStore.similaritySearch(content, 4);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.",
        },
        {
          role: "user",
          content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
  
            \n----------------\n
            
            CONTEXT:
            ${results.map((r) => r.pageContent).join("\n\n")}
            
            USER INPUT: ${content}`,
        },
      ],
    });

    const responseMessage = completion.choices[0].message;

    return res.json({ responseMessage });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};
