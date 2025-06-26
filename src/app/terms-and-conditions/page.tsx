import React from "react";
import StaticPageWrapper from "@/components/StaticPageWrapper";
import TermsContent from "@/components/TermsContent";

export default function TermsPage() {
  return (
    <StaticPageWrapper>
      <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>
      <TermsContent />
    </StaticPageWrapper>
  );
}