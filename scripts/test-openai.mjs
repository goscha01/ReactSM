import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function runTest() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-3.5-turbo" if you don’t have GPT-4 access
      messages: [{ role: "user", content: "Write a short blog post about AI in 2025." }],
    });

    console.log(completion.choices[0].message.content);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

runTest();
