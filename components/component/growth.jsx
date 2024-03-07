
"use client";
import React from "react";
import { Boxes } from "../ui/background-boxes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { GraphDataProvider,useSelections } from '../../context/GraphDataContext';
function Growth() {
  const { updateSelections } = useSelections();
const handleChange = (event) => {
  updateSelections('growth', event.target.value);
};
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 items-center z-2000">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Visualize your professional self 10-20 years from now.
      </h1>
      <h2 className="text-xl text-center mb-8">What does your growth look like?</h2>
      <Link href="/interested" passHref>
      <form className="flex flex-col space-y-4 items-center">
        {/* Wrapper div to control the width of all radio button labels equally */}

        <div className="w-full max-w-md space-y-4  ">
          {[
            "I'm an expert in a specific field, known for my specialized knowledge",
            "I'm a versatile professional with wide-ranging knowledge in many fields",
            "I'm running my own business",
            "Not sure",
          ].map((option, index) => (
            <label key={index} className="block w-full text-center hover:border-green-500 bg-black">
            <input className="sr-only peer" name="growth" value={option} 
                onChange={handleChange}  required type="radio" />
            <div className="text-lg py-4 px-6 border-2 border-gray-300 rounded-md peer-checked:border-blue-500 peer-checked:bg-blue-50 cursor-pointer hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500">
  {option}
</div>
          </label>
          
          ))}
        </div>
      </form>
      </Link>
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
