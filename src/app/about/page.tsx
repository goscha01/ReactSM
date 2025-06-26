import React from "react";
import StaticPageWrapper from "@/components/StaticPageWrapper";
import AboutContent from "@/components/AboutContent";

export default function AboutPage() {
  return (
    <StaticPageWrapper>
      <h1 className="text-3xl font-bold mb-6 text-center">About</h1>
      <AboutContent />
    </StaticPageWrapper>
  );
}
