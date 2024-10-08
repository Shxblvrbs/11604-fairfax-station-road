"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const Header = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const subtextRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

    tl.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.2 }
    )
      .fromTo(
        subtitleRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.5"
      )
      .fromTo(
        subtextRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.5"
      );
  }, []);

  return (
    <header className="fixed top-0 w-full p-4 bg-transparent text-slate-300 z-50">
      <div className="text-center space-y-2">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          Virtual Tour
        </h1>
        <h2
          ref={subtitleRef}
          className="text-xl md:text-3xl text-gray-300"
        >
          11604 Fairfax Station Rd, Fairfax Station, VA 22039
        </h2>
        <p
          ref={subtextRef}
          className="lg:invisible text-md md:text-base text-gray-400"
        >
          (Swipe to Interact)
        </p>
      </div>
    </header>
  );
};

export default Header;
