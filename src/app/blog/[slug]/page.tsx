import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import StaticPageWrapper from "@/components/StaticPageWrapper";

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "posts"));
  return files
    .filter((filename) => filename.endsWith('.md'))    // <-- Only .md files!
    .map((filename) => ({
      slug: filename.replace(/\.md$/, ""),
    }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const filePath = path.join(process.cwd(), "posts", `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <StaticPageWrapper>
      <Link
        href="/blog"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Back to Blog
      </Link>
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </StaticPageWrapper>
  );
}
