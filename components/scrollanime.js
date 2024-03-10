"use client";
import React from "react";

export default function HeroScrollDemo() {
  const user = {
    image: "graphpic.png",
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <ImageWithBorder src={user.image} />
    </div>
  );
}

const ImageWithBorder = ({ src }) => (
  <div className="border-4 border-black p-2">
    <img src={src} alt="User" className="max-w-full max-h-full" />
  </div>
);
