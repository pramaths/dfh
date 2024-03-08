'use client'
import Image from "next/image";
import Choices from "../../components/Choices"
import Options from "../../components/component/optionsCard"
export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      {/* <Choices/> */}
      <Options/>
    </main>
  );
}
