// page.js
import React from "react";
import Workenv from "../../components/component/workenv"; // Corrected import

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Workenv />
    </main>
  );
}
