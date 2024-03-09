// import React from 'react';

// const Sidebar = ({ show, content, closeSidebar,details }) => {
//   if (!show) {
//     return null;
//   }
// console.log(details)
//   return (
//     <>
//       {/* Overlay */}
//       {/* This overlay now covers the full window but allows for background visibility. */}
//       <div className="fixed inset-0 bg-white bg-opacity-60 z-40" onClick={closeSidebar}></div>
      
//       {/* Sidebar Content */}
//       {/* The sidebar background is adjusted to a purple color with the desired width and styling. */}
//       <div className="fixed right-0 top-0 bottom-0 w-1/4 bg-white text-black p-4 z-50 overflow-auto border rounded-2xl">
//         <div className='flex justify-between'>
//         <div className="content">
//           {content}
//         </div>
//         <div> {details}</div>
//         <button onClick={closeSidebar} className="text-black text-xl">
//             &#x2715; {/* Unicode character for "X" */}
//           </button>        </div>
       
//       </div>
//     </>
//   );
// };

// export default Sidebar;
import React from 'react';
import { TypeAnimation } from 'react-type-animation';const Sidebar = ({ show, content, closeSidebar, details }) => {
  if (!show) {
    return null;
  }
console.log("pramath",content,details)
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-white bg-opacity-60 z-40" onClick={closeSidebar}></div>
      
      {/* Sidebar Content */}
      <div className="fixed right-0 top-0 bottom-0 w-1/4 bg-white text-black p-4 z-50 overflow-auto border rounded-l-2xl ">
        <div className='flex justify-between items-start'>
          <div>
            <h2>{content}</h2>
            {/* Typing Animation for Details */}
            <div className='flex my-2 p-2 border rounded-xl shadow-xl'>
            <TypeAnimation
              sequence={[
                details, // The text you want to animate
                2000, // Keep the text displayed after typing is complete
              ]}
              wrapper="p" // Wrap the animation in a <p> tag
              cursor={true} // Show cursor
              style={{ fontSize: '1em' }} // Customize the style (optional)
            />
          
            </div>
          </div>
          <button onClick={closeSidebar} className="text-black text-xl">&#x2715;</button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
