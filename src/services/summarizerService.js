import OpenAI from 'openai';
const OPENAI_KEY = process.env.OPENAI_API_KEY;

console.log("OPENAI_KEY : ", OPENAI_KEY);
const openai = new OpenAI({ apiKey: OPENAI_KEY });

/**
 * Generates a summary for the given text using OpenAI's GPT model.
 * @param {string} text - The text to summarize.
 * @returns {Promise<string>} - The generated summary.
 */
const generateSummary = async (text) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      // model: "gpt-4o",
      messages: [
        { role: "system", content: "summarize this text" },
        {
          role: "user",
          content: text,
        },
      ],
    });

    // console.log("gpt completion : ", completion);
    // console.log(completion.choices[0].message.content);
    const completeResponse = `${completion.choices[0].message.content}`
    let cleanedResponse = completeResponse.replace(/\*\*/g, '');
    return cleanedResponse;
  } catch (error) {
    throw new Error(`Failed to generate summary: ${error.message}`);
  }
};

export default generateSummary;
