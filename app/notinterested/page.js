'use client'
import Image from "next/image";
import Notinterested from "../../components/component/notinterested"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Notinterested/>
    </main>
  );
}
