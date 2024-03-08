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
      <Project/>
      <Threepin/>
      {/* </div> */}
      <LayoutDesign/>
      <Scrollanime/>
    </main>
  );
}
