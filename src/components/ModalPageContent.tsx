// src/components/ModalPageContent.tsx
"use client";
import React from "react";

export default function ModalPageContent({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-90 rounded-xl p-8 max-w-3xl w-full shadow-xl backdrop-blur-md text-gray-800 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Your Perfect Stamp with My Stamp Maker
        </h1>
        <p className="text-lg leading-7 mb-6">
          My Stamp Maker is your all-in-one online tool for designing and customizing stamps.
          Whether you need a professional stamp for your business, a personal signature stamp,
          or a fun and creative craft stamp, our easy-to-use editor helps you bring your ideas to life.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Why Choose Us?</h2>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li>No software download—just your browser.</li>
          <li>Fully customizable shapes, fonts, and designs.</li>
          <li>High-quality downloads and save features.</li>
        </ul>

        <div className="text-center mt-8">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Start Designing Now
          </button>
        </div>
      </div>
    </div>
  );
}
