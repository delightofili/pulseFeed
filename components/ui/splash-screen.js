"use client";

import { useEffect, useState } from "react";
import { PiPulseBold } from "react-icons/pi";

export default function SplashScreen({ children }) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#071029] text-neutral-100">
        <div className="relative flex flex-col items-center gap-y-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-5xl font-black  animate-pulse shadow-[#041b5a]">
            <PiPulseBold className=" h-10 w-10 md:h-19 md:w-19  text-[#4F7CFF]" />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
