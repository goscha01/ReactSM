import React from 'react';
import Link from 'next/link';

export default function BlogPage() {
  const posts = [
    { title: "Benefits of Round Stamps for Translators", slug: "benefits-of-round-stamps" },
    { title: "How to Make a Stamp Online in Minutes", slug: "how-to-make-a-stamp-online" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <span className="text-blue-600 hover:underline">{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
