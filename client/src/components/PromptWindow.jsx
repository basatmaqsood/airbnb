/* eslint-disable react/prop-types */

import { useState } from "react";

const Modal = ({ message, setNavigation,setShowErrorPrompt }) => {
  const [ showWindow, setShowWindow ] = useState(true);
  console.log("hello");
  return (
    <div
      className={`${
        showWindow ? " " : "hidden"
      } fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
        <div className="text-lg font-semibold mb-4">{message}</div>
        <button
          onClick={()=>{
            setShowWindow(false)
            setNavigation && setNavigation(true);
            setShowErrorPrompt && setShowErrorPrompt(false);
          }}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
