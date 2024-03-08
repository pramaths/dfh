"use client";
import React from "react";
import { PinContainer } from "./ui/3d-pin";

export default function AnimatedPinDemo() {
  return (
    <div className="flex flex-row justify-center space-x-4 h-[40rem] w-full">
      {/* First Container */}
      <PinContainer imageSrc="/resumeref.jpeg" imageAlt="The girl">
        <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem]">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
            Upload Resume
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500">
              Upload the pdf and get to know about yourself.
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
        </div>
      </PinContainer>

      {/* Second Container */}
      <PinContainer imageSrc="/questionref.jpeg" imageAlt="The girl">
        <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem]">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
            Questionnaire time!!!
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500">
              Answer a set of questions and get to know about yourself.
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
        </div>
      </PinContainer>

      {/* Third Container */}
      <PinContainer imageSrc="/linkedinref.jpeg" imageAlt="The girl">
        <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem]">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
            Uppload your Linkedin profile
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500">
              We will make you job search easier.
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
        </div>
      </PinContainer>
    </div>
  );
}