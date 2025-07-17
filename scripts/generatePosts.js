require("dotenv").config();
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");
const getTopGSCKeywords = require("./get-gsc-queries");

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateTopic(keyword) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: `Suggest a unique and engaging blog post title that targets the keyword: "${keyword}" and is relevant to rubber stamps for certified translation, notary, or official document use. Respond only with the title.`,
      },
    ],
  });

  return response.choices[0].message.content.trim().replace(/^"|"$/g, "");
}

async function generateBlogPost(topic) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: `Write a 500-700 word blog post in Markdown format about "${topic}". Include a title, introduction, bullet points if needed, and a conclusion.`,
      },
    ],
  });

  return response.choices[0].message.content.trim();
}

function sanitizeTitle(title) {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
}

async function main() {
  try {
    // 1. Get keywords from GSC
    const keywords = await getTopGSCKeywords();
    if (!keywords.length) throw new Error("No keywords from GSC!");

    // 2. Pick a random keyword
    const keyword = keywords[Math.floor(Math.random() * keywords.length)];
    console.log("Selected keyword:", keyword);

    // 3. Generate topic based on keyword
    const topic = await generateTopic(keyword); // update function below
    const blogContent = await generateBlogPost(topic);

    // (save post as before...)
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now
      .toISOString()
      .split("T")[1]
      .replace(/:/g, "-")
      .slice(0, 8); // hh-mm-ss
    const filename = `posts/${date}-${time}-${sanitizeTitle(topic)}.md`;

    fs.mkdirSync("posts", { recursive: true });
    fs.writeFileSync(filename, blogContent);

    console.log(`✅ Blog post generated: ${filename}`);
  } catch (error) {
    console.error("❌ Failed to generate blog post:", error);
    process.exit(1);
  }
}

main();
