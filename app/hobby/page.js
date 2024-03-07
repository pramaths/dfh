// page.js
import React from "react";
import Hobby from "../../components/component/hobby.jsx"; // Corrected import

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hobby />
    </main>
  );
}
