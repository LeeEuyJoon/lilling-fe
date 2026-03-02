"use client";
import { useState, useEffect } from "react";
import AnimatedCounter from "./AnimatedCounter";

export default function FakeStats() {
  const [urlCount, setUrlCount] = useState(945);
  const [clickCount, setClickCount] = useState(7981);

  useEffect(() => {
    const interval = setInterval(() => {
      setUrlCount((prevUrlCount) => {
        return prevUrlCount + Math.floor(Math.random() * 5);
      });

      setClickCount((prevClickCount) => {
        return prevClickCount + Math.floor(Math.random() * 50);
      });
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex items-center justify-center gap-8">
      <div className="text-center">
        <div className="flex justify-center">
          <AnimatedCounter end={urlCount} />
        </div>
        <p className="text-xs text-neutral-500 dark:text-white/40 mt-0.5">URLs shortened</p>
      </div>
      <div className="w-px h-8 bg-neutral-200 dark:bg-white/10" />
      <div className="text-center">
        <div className="flex justify-center">
          <AnimatedCounter end={clickCount} />
        </div>
        <p className="text-xs text-neutral-500 dark:text-white/40 mt-0.5">Total clicks</p>
      </div>
    </div>
  );
}
