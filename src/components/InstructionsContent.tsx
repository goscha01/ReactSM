import React from 'react';

export default function InstructionsContent() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800 prose prose-gray prose-lg">
      <h1 className="text-3xl font-bold text-center">How to Use MyStampMaker</h1>

      <p>
        Creating your own professional stamp is quick and easy with MyStampMaker. Just follow these simple steps to design, customize, and download your stamp:
      </p>

      <ul>
        <li>
          <strong>Add a Circle:</strong> Click the <b>Circle</b> tool to add a circular outline for your stamp. Adjust the radius and border thickness as needed.
        </li>
        <li>
          <strong>Insert Round Text:</strong> Use the <b>Round Text</b> element to add text around the circle. Customize the spacing, rotation, and font to match your professional needs.
        </li>
        <li>
          <strong>Add Center Text:</strong> Select the <b>Line Text</b> tool to insert straight text in the center. Edit the position, size, and angle for optimal alignment.
        </li>
        <li>
          <strong>Include an Image or Logo:</strong> Use the <b>Image</b> tool to upload a logo or graphic. Resize, rotate, and reposition it within your stamp layout.
        </li>
        <li>
          <strong>Combine Elements:</strong> Add as many text, shape, and image elements as you need to create a custom stamp design that reflects your credentials.
        </li>
        <li>
          <strong>Remove Elements:</strong> Click the <b>delete x</b> next to any element to remove it from the canvas.
        </li>
        <li>
          <strong>Download Your Stamp:</strong> Once you’re satisfied with your design, click <b>Download</b> to save a high-resolution PNG of your stamp for digital or print use.
        </li>
      </ul>

      <p>
        Whether you’re a certified translator, legal professional, or simply need a customized seal, MyStampMaker makes the process effortless and professional.
      </p>
    </div>
  );
}
