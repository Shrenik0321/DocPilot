import { openai } from "../config/openAiConfig.js";
import { PineconeStore } from "@langchain/pinecone";
import { pineconeIndex } from "../config/pineconeConfig.js";
import { embeddings } from "../config/openAiConfig.js";

export const chatController = async (req, res) => {
  try {
    const conversation = req.body;
    const currentMessage = conversation.pop(); // Latest message
    const previousMessages = conversation;

    // Connects to the vector database and fetches the vector embeddings which are converted from numerical format to text.
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
    });

    // Finds the top 4 most pieces of content that are most similar to the user prompt after the data fetch from vector database.
    const results = await vectorStore.similaritySearch(
      currentMessage.content,
      4
    );

    // Construct the message prompt for OpenAI with better context preservation.
    const context = results.map((r) => r.pageContent).join("\n\n");
    const previousConvo = previousMessages
      .map((message) => {
        if (message.role === "user") return `User: ${message.content}\n`;
        return `Assistant: ${message.content}\n`;
      })
      .join("");

    const messagePrompt = [
      {
        role: "system",
        content: `You are an AI assistant that helps answer questions based on a provided pdf document. Use the context from the document and the previous conversation to provide accurate answers. If you don't know the answer, say that you don't know.`,
      },
      {
        role: "user",
        content: `CONTEXT:\n${context}\n\nPREVIOUS CONVERSATION:\n${previousConvo}\n\nUSER INPUT: ${currentMessage.content}`,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messagePrompt,
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
