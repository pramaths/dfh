'use client'
import Image from "next/image";
import Interested from "../../components/component/interested"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Interested/>
    </main>
  );
}
