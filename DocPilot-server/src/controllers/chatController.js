import { openai } from "../config/openAiConfig.js";
import { PineconeStore } from "@langchain/pinecone";
import { pineconeIndex } from "../config/pineconeConfig.js";
import { embeddings } from "../config/openAiConfig.js";
import { OpenAI } from "@langchain/openai";
import { OPEN_AI_API_KEY, OPEN_AI_MODEL_NAME } from "../config/envConfig.js";
import { ConversationSummaryMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";

export const chatController = async (req, res) => {
  try {
    const conversation = req.body;
    const currentMessage = conversation.pop(); // Latest message
    const previousMessages = conversation;

    const model = new OpenAI({
      openAIApiKey: OPEN_AI_API_KEY,
      modelName: OPEN_AI_MODEL_NAME,
    });

    const memory = new ConversationSummaryMemory({
      memoryKey: "chat_history",
      llm: model,
    });

    // Load previous chat history from memory
    const memoryVariables = await memory.loadMemoryVariables({});

    // Format previous messages for the prompt
    const previousConversation = previousMessages
      .map((message) => {
        if (message.role === "user") return `Human: ${message.content}\n`;
        return `AI: ${message.content}\n`;
      })
      .join("");

    // Construct the prompt template with memory variables
    const promptText = `The following is a friendly conversation between a human and an AI called DocPilot that helps answer questions based on a provided pdf document. DocPilot is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.
    Current conversation:
    ${memoryVariables.chat_history || ""}
    Human: ${currentMessage.content}
    AI:`;

    const prompt = PromptTemplate.fromTemplate(promptText);

    const chain = new LLMChain({ llm: model, prompt, memory });

    await chain.invoke({ input: currentMessage.content });

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

    const messagePrompt = [
      {
        role: "system",
        content: `You are an AI assistant called DocPilot that helps answer questions based on the provided pdf document. Use the context from the document and the previous conversation to provide accurate answers. If you don't know the answer, say that you don't know.`,
      },
      {
        role: "user",
        content: `CONTEXT:\n${context}\n\nPREVIOUS CONVERSATION:\n${previousConversation}\n\nUSER INPUT: ${currentMessage.content}`,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: OPEN_AI_MODEL_NAME,
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
