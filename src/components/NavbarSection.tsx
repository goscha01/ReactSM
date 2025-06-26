'use client';

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function NavbarSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [hideTitle, setHideTitle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const leftItems = [
    { label: "Overview", href: "/home" },
    { label: "Instruction", href: "/instruction" },
  ];

  const rightItems = [
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Terms", href: "/terms-and-conditions" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setHideTitle(width < 900);
      setIsMobile(width < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative bg-alpha h-20 md:h-24 w-full flex items-center z-50">
      <div className="w-full max-w-7xl mx-auto px-4 flex justify-between items-center">

        {/* Left menu */}
        {!isMobile && (
          <nav className="hidden md:flex gap-4 text-white text-sm w-1/3">
            {leftItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:underline text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Logo and Title */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/site_logo.svg"
              height={60}
              width={60}
              alt="MyStampMaker logo"
              className="size-12 md:size-16"
            />
            {!hideTitle && (
              <h1 className="text-white text-3xl sm:text-4xl font-sans whitespace-nowrap">
                My Stamp Maker
              </h1>
            )}
          </Link>
        </div>

        {/* Right menu or hamburger */}
        {!isMobile ? (
          <nav className="hidden md:flex gap-4 text-white text-sm w-1/3 justify-end">
            {rightItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:underline text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        ) : (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl focus:outline-none z-40"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        )}
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-alpha text-white px-4 py-3 space-y-2 z-30">
          {[...leftItems, ...rightItems].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block text-base text-white hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
