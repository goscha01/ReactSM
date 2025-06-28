import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React from "react";
import Link from "next/link";
import StaticPageWrapper from "@/components/StaticPageWrapper";

interface Post {
  slug: string;
  title: string;
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <StaticPageWrapper>
      <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </StaticPageWrapper>
  );
}

// Helper function to read posts from markdown files
async function getPosts(): Promise<Post[]> {
  const postsDir = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDir);

  return filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(postsDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        slug: filename.replace(".md", ""),
        title: data.title || filename.replace(".md", ""),
      };
    });
}
