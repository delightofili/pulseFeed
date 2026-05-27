"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function FeedItemWrapper({ id, children }) {
  const pressTimer = useRef(null);
  const isLongPress = useRef(false);
  const router = useRouter();

  const handleMouseDown = () => {
    isLongPress.current = false;
    pressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      router.push(`/?modal=post&id/${id}`);
    }, 1000);
  };

  const handleMouseUp = () => {
    clearTimeout(pressTimer.current);
  };

  const handleClick = (e) => {
    if (isLongPress.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
