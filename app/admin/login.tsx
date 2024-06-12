"use client";

import { useRef, RefObject } from "react";

export default function Login({
  setLoggedIn
} : {
  setLoggedIn: (value: boolean) => void,
}) {  
  const passwordRef: RefObject<HTMLInputElement> = useRef(null);

  return (
    <div className="w-full flex flex-row items-center justify-center">
      <input type="text" placeholder="password" ref={passwordRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus-visible:outline-blue-500 w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      <button
        onClick={() => {
          // Only for demo purposes. A proper app would need to use proper auth
          if (passwordRef?.current?.value === "password") {
            setLoggedIn(true);
          }
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-3 py-2 px-4 rounded-lg focus:outline-none"
      >Login</button>
    </div>
  )
}