require("dotenv").config();
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateBlogPost() {
  try {
    // Generate blog content
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Write a 500-700 word blog post in Markdown format about "The Benefits of Using Round Stamps for Certified Translations". Include a title, introduction, bullet points if needed, and conclusion.`,
        },
      ],
    });

    const blogContent = completion.choices[0].message.content;

    // Create filename using current date
    const date = new Date().toISOString().split("T")[0];
    const filename = `posts/${date}-round-stamps-certified-translations.md`;

    // Ensure posts directory exists
    fs.mkdirSync("posts", { recursive: true });

    // Write to file
    fs.writeFileSync(filename, blogContent.trim());

    console.log(`✅ Blog post generated: ${filename}`);
  } catch (error) {
    console.error("❌ Failed to generate blog post:", error);
    process.exit(1);
  }
}

generateBlogPost();
