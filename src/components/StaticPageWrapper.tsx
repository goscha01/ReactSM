// src/components/StaticPageWrapper.tsx
import React from "react";

export default function StaticPageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-3xl w-[80%] mx-auto px-4 py-10 text-gray-800 text-base leading-relaxed">
      {children}
    </main>
  );
}
