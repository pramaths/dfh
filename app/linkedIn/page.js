 "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import { LampContainer } from "../../components/ui/lamp";

// export default function LampDemo() {
//     const [linkedinProfile, setLinkedinProfile] = useState('');

//     const handleSubmit = (event) => {
//       event.preventDefault();
//       console.log('LinkedIn Profile:', linkedinProfile);
//       navigateToGraph(linkedinProfile); // Implement this function based on your app's routing logic
//     };
//   return (
//     <LampContainer>
//       <motion.h1
//         initial={{ opacity: 0.5, y: 100 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{
//           delay: 0.3,
//           duration: 0.8,
//           ease: "easeInOut",
//         }}
//         className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
//       >
//         Build career path <br /> the right way
//       </motion.h1>
//     </LampContainer>
//   );
// }
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LampContainer } from '../../components/ui/lamp';
import { useRouter } from 'next/navigation';
import { GraphDataProvider,useSelections } from '../../context/GraphDataContext';
export default function LampDemo() {
//   const [linkedinProfile, setLinkedinProfile] = useState('');
//   const router = useRouter();
//   const { updateSelections } = useSelections();

//   const handleChange = (event) => {
//     console.log("handleChange called with value:", event.target.value);
//     updateSelections('linkedIn', event.target.value);
//     router.push('/graph');
//   };
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('LinkedIn Profile:', linkedinProfile);
//   };
const [linkedinProfile, setLinkedinProfile] = useState('');
const router = useRouter();
const { updateSelections } = useSelections();

const handleSubmit = (event) => {
  event.preventDefault();
  console.log('LinkedIn Profile:', linkedinProfile);
  updateSelections('linkedIn', linkedinProfile); // Assuming this updates the global state correctly
  router.push('/graph'); // Navigate after the state is updated
};

  return (
    <div className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center items-center font-medium tracking-tight text-transparent justify-center overflow-hidden max-h-screen flex flex-col">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="mt-6 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl "
        >
          Build your career path <br /> the right way
          <br/>
          
        <form onSubmit={handleSubmit} className="flex flex-col items-center text-2xl mt-5">
          <input
            type="text"
            placeholder="Enter your LinkedIn URL"
            value={linkedinProfile}
            onChange={(e) => setLinkedinProfile(e.target.value)}
            className="mt-4 mb-2 p-2 border border-slate-300 rounded-md text-black"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Submit
          </button>
        </form>
        </motion.h1>
      </LampContainer>
    
    </div>
  );
}
