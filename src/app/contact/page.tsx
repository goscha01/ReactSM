import React from "react";
import StaticPageWrapper from "@/components/StaticPageWrapper";
import ContactContent from "@/components/ContactContent";

export default function ContactPage() {
  return (
    <StaticPageWrapper>
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <ContactContent />
    </StaticPageWrapper>
  );
}