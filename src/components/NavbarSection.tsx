import Image from "next/image";
import React from "react";

export default function NavbarSection() {
  return (
    <div className="bg-alpha h-20 md:h-24 w-full flex items-center">
      <div className="max-w-7xl w-full mx-auto px-3 sm:px-5 lg:px-8 flex items-center justify-center gap-3">
        <Image
          src={"/images/site_logo.svg"}
          height={70}
          width={70}
          alt="logo"
          className="size-14 md:size-16 xl:size-20"
        />
        <h1 className="text-white text-3xl sm:text-4xl font-sans">My Stamp Maker</h1>
      </div>
    </div>
  );
}
