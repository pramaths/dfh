'use client'
import Image from "next/image";
import Graph from "../../components/graph"
import Sidebar from "@/components/SideBar";
export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      <Graph/>
      <div>
      {/* <Sidebar content={"hello"} closeSidebar={close} /> */}
      </div>
    </main>
  );
}
