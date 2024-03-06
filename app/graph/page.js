'use client'
import Image from "next/image";
import Graph from "../../components/graph"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Graph/>
    </main>
  );
}
