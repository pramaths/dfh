
"use client";
import React from "react";
import { Boxes } from "../ui/background-boxes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { GraphDataProvider,useSelections } from '../../context/GraphDataContext';
function Growth() {
  const router = useRouter();
  const { updateSelections } = useSelections();

  const handleChange = (event) => {
    console.log("handleChange called with value:", event.target.value);
    updateSelections('growth', event.target.value);
    router.push('/interested');
  };

  return (
    <div className="flex justify-center items-center h-screen"> {/* This will center the container */}
      <div className="max-w-4xl mx-auto py-12 px-6 z-2000">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Visualize your professional self 10-20 years from now.
        </h1>
        <h2 className="text-xl text-center mb-8">What does your growth look like?</h2>
        <div className="w-full max-w-md space-y-4 mx-auto"> {/* Added mx-auto for horizontal centering */}
          {[
            "I'm an expert in a specific field, known for my specialized knowledge",
            "I'm a versatile professional with wide-ranging knowledge in many fields",
            "I'm running my own business",
            "Not sure",
          ].map((option, index) => (
            <label key={index} className="block w-full">
              <input className="sr-only peer" name="growth" value={option} onChange={handleChange} type="radio" />
              <div className="text-lg py-4 px-6 border-2 border-gray-300 rounded-md peer-checked:border-blue-500 peer-checked:bg-blue-50 cursor-pointer hover:bg-gradient-to-r from-green-400 to-blue-500">
                {option}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
export default function BackgroundBoxesDemo() {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <div className="text-center mt-2 text-neutral-300 relative z-20"> <Growth/></div>
     
    </div>
  );
}
