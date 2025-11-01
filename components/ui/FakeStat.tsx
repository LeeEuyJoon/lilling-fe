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
      <div className="text-center">
        <AnimatedCounter end={urlCount} />{" "}
        <p className="text-sm text-muted-foreground">단축된 URL</p>
      </div>
      <div className="text-center">
        <AnimatedCounter end={clickCount} />
        <p className="text-sm text-muted-foreground">총 클릭</p>
      </div>
    </div>
  );
}
