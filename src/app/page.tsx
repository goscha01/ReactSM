"use client";
import CanvasWrapper from "@/components/CanvasWrapper";
import InstructionsSection from "@/components/InstructionsSection";
import NavbarSection from "@/components/NavbarSection";
import React, { useContext, useState } from "react";
import { MainContext } from "@/components/MainContext";
import Image from "next/image";
import GoogleAdsense from "@/components/GoogleAdsense";
import DescriptionComponent from "@/components/DescriptionComponent";
import ModalPageContent from "@/components/ModalPageContent";

export default function MainPage() {
  const { isLoading } = useContext(MainContext);
  const [showModal, setShowModal] = useState(true);
  return (
    <div className="">
      {/* Loading overlay */}
      <GoogleAdsense adClient="YOUR_AD_CLIENT_ID" />
      <div
        className={`overflow-hidden fixed inset-0 z-50 flex flex-col gap-28 items-center justify-center bg-alpha
          transition-opacity duration-700 ease-in-out
          ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <Image
          src={"/images/site_logo.svg"}
          height={70}
          width={70}
          alt="logo"
          className="size-32 md:size-40"
        />
        <div className="size-8 md:size-10 border-4 border-t-transparent border-white rounded-full animate-spin" />
      </div>

      {/* Main content */}
      <div
        className={`transition-opacity duration-700 ease-in-out ${
          isLoading ? "opacity-0 hidden" : "opacity-100 block"
        }`}
      >
        <CanvasWrapper />
        {showModal && (
          <ModalPageContent
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />
        )}
        <InstructionsSection />
      </div>
    </div>
  );
}
