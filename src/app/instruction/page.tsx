import React from "react";
import StaticPageWrapper from "@/components/StaticPageWrapper";
import InstructionsContent from "@/components/InstructionsContent";

export default function InstructionPage() {
  return (
    <StaticPageWrapper>
      <h1 className="text-3xl font-bold mb-6 text-center">Instructions</h1>
      <InstructionsContent />
    </StaticPageWrapper>
  );
}
