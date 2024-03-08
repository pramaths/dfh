'use client'
import Image from "next/image";
import Choices from "../../components/Choices"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Choices/>
    </main>
  );
}
