'use client'
import Image from "next/image";
import Options from "../../components/component/optionsCard"
export default function Home() {
  return (
    <main className="flex max-h-screen w-full flex-col items-center justify-between">
   <div className="h-[50rem] w-full dark:bg-black bg-black  dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex items-center justify-center">
      <Options/>
      </div>
    </main>
  );
}
