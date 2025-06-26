const fs = require('fs');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const topics = [
  "Benefits of Round Stamps for Translators",
  "How to Make a Stamp Online in Minutes",
];

async function generatePost(title) {
  const slug = title.toLowerCase().replace(/ /g, '-');
  const prompt = `Write a 500+ word SEO-friendly blog post about: "${title}" for a website that helps people create round stamps online.`;

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 1000,
  });

  const content = `---
title: "${title}"
slug: "${slug}"
date: "${new Date().toISOString().split('T')[0]}"
---

${response.data.choices[0].text.trim()}`;

  const filePath = path.join(__dirname, '../content/posts', `${slug}.md`);
  fs.writeFileSync(filePath, content);
  console.log(`✅ Generated post: ${slug}`);
}

(async () => {
  for (const topic of topics) {
    await generatePost(topic);
  }
})();
