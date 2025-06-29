require("dotenv").config();
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateTopic() {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: `Suggest a unique and engaging blog post title about rubber stamps for certified translation, notary, or official document use. Respond only with the title.`,
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
    const topic = await generateTopic();
    const blogContent = await generateBlogPost(topic);

    const date = new Date().toISOString().split("T")[0];
    const filename = `posts/${date}-${sanitizeTitle(topic)}.md`;

    fs.mkdirSync("posts", { recursive: true });
    fs.writeFileSync(filename, blogContent);

    console.log(`✅ Blog post generated: ${filename}`);
  } catch (error) {
    console.error("❌ Failed to generate blog post:", error);
    process.exit(1);
  }
}

main();
