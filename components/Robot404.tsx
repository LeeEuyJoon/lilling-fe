"use client";

import Lottie from "lottie-react";
import animationData from "@/public/404.json";

export default function Robot404() {
  return (
    <div className="w-full max-w-md">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}
