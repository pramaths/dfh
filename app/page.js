'use client'
import Image from "next/image";
import { NavbarDemo } from "@/components/navbar";
import LayoutDesign from "../components/layout-design"
import Graph from "../components/graph"
import Threepin from '../components/3d-holo'
import Scrollanime from '../components/scrollanime'
import { Button } from "../components/ui/moving-borders";
 import Project from "../components/project"
import Navbar from "../components/component/Navbar"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar/>
      {/* <NavbarDemo/> */}
      {/* <div className="flex"> */}
      <div className="h-[50rem] w-full dark:bg-black bg-black  dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <Project/>
      </div>
      <Threepin/>
      {/* </div> */}
      <LayoutDesign/>
      <Scrollanime/>
    </main>
  );
}
