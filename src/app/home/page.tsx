"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f6f1] text-black">

      {/* NAVBAR */}
      <nav
        className={`fixed left-0 top-0 z-50 w-full transition-transform duration-700 ease-in-out ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex h-24 items-center justify-between px-8">

          {/* LEFT */}
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="group relative text-xs uppercase tracking-[0.2em]"
            >
              Home
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
            </a>

            <a
              href="#batches"
              className="group relative text-xs uppercase tracking-[0.2em]"
            >
              Batches
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
            </a>

            <a
              href="#people"
              className="group relative text-xs uppercase tracking-[0.2em]"
            >
              People
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* CENTER */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <h1
              className="text-3xl tracking-[0.01em]"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              NITALUM
            </h1>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-8">
            <a
              href="/login"
              className="group relative text-xs uppercase tracking-[0.2em]"
            >
              Login
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
            </a>

            <a
              href="/signup"
              className="text-xs uppercase tracking-[0.2em]"
            >
              Join →
            </a>

            <span className="hidden text-[10px] uppercase tracking-[0.2em] text-gray-500 lg:block">
              ● 2026
            </span>
          </div>
        </div>
      </nav>

      {/* TEMPORARY CONTENT */}
      <section className="min-h-[200vh] flex items-center justify-center">
        <h2 className="text-6xl">Home Page</h2>
      </section>

    </main>
  );
}