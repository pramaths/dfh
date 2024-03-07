import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Boxes } from "../ui/background-boxes";
import { useSelections } from "@/context/GraphDataContext";
function Notinterested() {
  // Initialize state with an empty array for selected interests
  const { updateSelections } = useSelections();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const handleSelectInterest = (notinterest) => {
    updateSelections('notinterests', notinterest);
  };

  const toggleInterest = (notinterest) => {
    setSelectedInterests((prevSelectedInterests) => {
      const updatedSelectedInterests = prevSelectedInterests.includes(notinterest)
        ? prevSelectedInterests.filter((i) => i !== interest) // Remove if already selected
        : [...prevSelectedInterests, notinterest]; // Add if not selected

      // Here we update the global context with the current list of selected interests
      updateSelections('notinterests', updatedSelectedInterests);

      return updatedSelectedInterests;
    });
  };
  // List of all interests (could also be externalized or fetched from an API)
  const notinterests = [
    "Agriculture", "Automotive", "Banking", "Biotechnology", "Construction",
    "Consumer Goods", "Education", "Energy", "Entertainment", "Fashion",
    "Financial Services", "Food & Beverage", "Healthcare", "Hospitality",
    "Information Technology", "Insurance", "Manufacturing", "Media", "Mining",
    "Pharmaceuticals", "Real Estate", "Retail", "Telecommunications",
    "Transportation", "Travel", "Utilities"
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Are you not interested in any particular industries?</h2>
      <div className="grid grid-cols-3 gap-4 mb-6 text-black">
        {notinterests.map((notinterest) => (
          <Button
            key={notinterest}
            className={`bg-white border ${selectedInterests.includes(notinterest) ? 'bg-green-300' : ''}`}
            onClick={() => toggleInterest(notinterest)}
          >
            {notinterest}
          </Button>
        ))}
      </div>
      <div className="flex justify-center rounded-lg">
        <Link href='/graph' passHref> 
          <Button className="hover:bg-green-400 border-2">Next</Button>
        </Link>
      </div>
    </div>
  );
}



export default function BackgroundBoxesDemo() {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <div className="text-center mt-2 text-neutral-300 relative z-20"> <Notinterested/></div>
     
    </div>
  );
}