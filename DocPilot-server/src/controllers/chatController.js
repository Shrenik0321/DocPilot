import { openai } from "../config/openAiConfig.js";

export const chatController = async (req, res) => {
  try {
    const { user, content } = req.body;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: content }],
      model: "gpt-3.5-turbo",
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
