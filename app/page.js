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
import React,{ useState,useEffect } from "react";
export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') { // Make sure this runs only on the client side
      const alanBtn = require('@alan-ai/alan-sdk-web');
      alanBtn({
          key: 'fc0dd1342f0d91f6cf3a31accb3c8df62e956eca572e1d8b807a3e2338fdd0dc/stage',
          onCommand: (commandData) => {
            if (commandData.command === 'testCommand') {
              alert('this was executed');
            }
          }
      });
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar/>
      {/* <NavbarDemo/> */}
      {/* <div className="flex"> */}
      <div className="h-[50rem] w-full dark:bg-black bg-black  dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <Project/>
      </div>
      <Threepin/>
      {/* </div> */}
      <LayoutDesign/>
      <Scrollanime/>
    </main>
  );
}
