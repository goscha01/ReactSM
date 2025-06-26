import React from "react";

export default function TermsContent() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800 prose prose-gray prose-lg">
      <h1 className="text-3xl font-bold text-center">Terms and Conditions</h1>

      <p>
        Welcome to <strong>MyStampMaker</strong>. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
      </p>

      <h2>1. Use of the Service</h2>
      <p>
        MyStampMaker is a free online platform for creating custom round stamps for personal and professional use. You may not use the service for illegal or unauthorized purposes.
      </p>

      <h2>2. Intellectual Property</h2>
      <p>
        All content, including logos, designs, and text, is the property of MyStampMaker or its content creators. You may not reproduce or distribute any part of the site without permission.
      </p>

      <h2>3. User Content</h2>
      <p>
        You retain rights to the custom stamp designs you create. However, by using our platform, you grant us a non-exclusive right to use and display your designs for promotional purposes unless you opt out.
      </p>

      <h2>4. Disclaimer</h2>
      <p>
        This service is provided “as is” without warranties of any kind. We do not guarantee that generated stamps will meet legal or official requirements in every jurisdiction.
      </p>

      <h2>5. Changes to Terms</h2>
      <p>
        We reserve the right to update these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
      </p>

      <h2>6. Contact</h2>
      <p>
        If you have any questions about these Terms and Conditions, please contact us at:{" "}
        <a href="mailto:support@mystampmaker.com" className="text-blue-600 underline">
          support@mystampmaker.com
        </a>
      </p>
    </div>
  );
}
