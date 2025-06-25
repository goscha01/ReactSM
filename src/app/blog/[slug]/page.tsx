import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import React from 'react';
import Markdown from 'react-markdown';
import Link from 'next/link';

export const dynamicParams = false;

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const files = await fs.readdir(postsDirectory);

  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({
      slug: file.replace(/\.md$/, ''),
    }));
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { content, data } = matter(fileContent);

    return (
      <main className="max-w-3xl mx-auto px-4 py-10">
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <div className="prose">
          <Markdown>{content}</Markdown>
        </div>
      </main>
    );
  } catch (error) {
    notFound();
  }
}
