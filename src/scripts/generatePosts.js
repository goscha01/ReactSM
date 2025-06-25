import fs from "fs";
import path from "path";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

(async () => {
  const today = new Date().toISOString().split("T")[0];
  const slug = `monthly-post-${today}`;
  const outputPath = path.join("posts", `${slug}.md`);

  const prompt = `Write a blog post of at least 500 words about why round stamps are useful for translators working with legal or certified documents.`;

  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.data.choices[0].message?.content;

  if (content) {
    fs.writeFileSync(
      outputPath,
      `---
title: "Round Stamps for Translators - ${today}"
date: "${today}"
---

${content}
`
    );
    console.log("Blog post generated:", outputPath);
  } else {
    console.error("No content generated.");
  }
})();
