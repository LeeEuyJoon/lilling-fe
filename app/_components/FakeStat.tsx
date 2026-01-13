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
    <div className="flex gap-8 justify-center mt-18">
      <div className="text-center w-40 flex flex-col items-center">
        <AnimatedCounter end={urlCount} />
        <p className="text-sm text-muted-foreground">shortened urls</p>
      </div>
      <div className="text-center w-40 flex flex-col items-center">
        <AnimatedCounter end={clickCount} />
        <p className="text-sm text-muted-foreground">total clicks</p>
      </div>
    </div>
  );
}
