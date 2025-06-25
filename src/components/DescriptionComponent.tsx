import React from "react";

export default function DescriptionComponent() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-gray-800 flex flex-col lg:flex-row gap-8">
      {/* Main Description - 70% */}
      <div className="w-full lg:w-7/10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          MyStampMaker: Effortless Round Stamp Creation for Translators
        </h1>
        <p className="mb-4 text-lg">
          If you&rsquo;re a translator or language professional who regularly
          works with official documents, you know how essential it is to affix a
          clear, professional round stamp to every certified translation...
        </p>

        <p className="mb-4 text-lg">
          MyStampMaker is a free, web-based tool that enables translators to
          create personalized, high-quality round stamps in just a few clicks...
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Why Translators Choose MyStampMaker
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-6 text-lg">
          {/* List items */}
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Ideal Use Cases</h2>
        <p className="mb-4 text-lg">
          Translators working with immigration documents, university
          transcripts, notarized forms...
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
        <ol className="list-decimal list-inside space-y-2 mb-6 text-lg">
          {/* Steps */}
        </ol>

        <p className="text-lg">
          Join thousands of translators who trust MyStampMaker...
        </p>
      </div>

      {/* Blog Preview - 30% */}
      <aside className="w-full lg:w-1/3 border-l border-gray-300 pl-6">
        <h2 className="text-xl font-semibold mb-4">From Our Blog</h2>
        <div className="bg-gray-50 p-4 rounded shadow-sm">
          <h3 className="text-lg font-bold mb-2">
            How to Create a Certified Translation Stamp
          </h3>
          <p className="text-sm text-gray-700 line-clamp-3">
            Creating a certified translation stamp has never been easier. In
            this guide, we walk you through the process of designing a legally
            accepted stamp with MyStampMaker...
          </p>
          <a
            href="/blog/sample-post"
            className="text-blue-600 mt-2 inline-block text-sm hover:underline"
          >
            Read more →
          </a>
        </div>
      </aside>
    </div>
  );
}
