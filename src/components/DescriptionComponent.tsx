import React from "react";

export default function DescriptionComponent() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-gray-800 flex flex-col lg:flex-row gap-8">
      {/* Main Description - 70% */}
      <div className="w-full lg:w-7/10 prose prose-gray prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-center">
          MyStampMaker: Create Professional Round Stamps Online for Free
        </h1>

        <p>
          <strong>MyStampMaker</strong> is the ultimate free online tool for translators and language professionals to design and download <strong>professional round stamps</strong> for certified translations. Whether you’re translating legal documents, academic diplomas, birth certificates, or contracts, your work isn’t complete without a clear and official round stamp.
        </p>

        <p>
          Our <strong>web-based stamp creator</strong> helps certified translators generate high-resolution, personalized round stamps in minutes — no graphic design skills or software needed. Create a stamp that meets industry standards and includes your name, credentials, certification number, or even logos.
        </p>

        <h2>Why Translators Choose MyStampMaker</h2>
        <ul>
          <li><strong>Free and Easy to Use:</strong> No registration, no installation — just open and design.</li>
          <li><strong>Certified Translator Templates:</strong> Built-in layouts optimized for professional use.</li>
          <li><strong>Fully Customizable:</strong> Adjust font styles, spacing, borders, logos, and more.</li>
          <li><strong>High-Resolution Downloads:</strong> Export PNG images perfect for digital and print use.</li>
          <li><strong>Multilingual Support:</strong> Add characters in any language, from Arabic to Chinese.</li>
          <li><strong>Cloud Storage:</strong> Save and access your stamp designs at any time.</li>
        </ul>

        <h2>Ideal Use Cases</h2>
        <p>
          <strong>MyStampMaker</strong> is perfect for certified translators, interpreters, notaries, and legal professionals who frequently work with:
        </p>
        <ul>
          <li>Immigration documents (USCIS, embassies)</li>
          <li>Academic transcripts and diplomas</li>
          <li>Legal affidavits and power of attorney</li>
          <li>Certified marriage and birth certificates</li>
        </ul>

        <h2>How It Works</h2>
        <ol>
          <li>Choose a round stamp template that fits your use case</li>
          <li>Enter your name, title, and certification details</li>
          <li>Customize size, font, spacing, and layout</li>
          <li>Preview your stamp in real time</li>
          <li>Download it in high resolution — instantly</li>
        </ol>

        <p>
          Join thousands of language professionals who rely on <strong>MyStampMaker</strong> to simplify and standardize their certified stamp creation process. Experience the easiest way to design <strong>translation stamps online</strong> — 100% free.
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
            Creating a certified translation stamp has never been easier. In this guide, we walk you through the process of designing a legally accepted stamp with MyStampMaker — fast, free, and fully customizable.
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
