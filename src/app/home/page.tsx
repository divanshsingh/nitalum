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
    <main
  className="min-h-screen text-black"
  style={{
    backgroundColor: "#f7f6f1",
    backgroundImage: `
      linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)
    `,
    backgroundSize: "18px 18px",
  }}
>

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

{/* HERO */}
<section className="relative min-h-screen overflow-hidden px-8 pt-28">

  {/* HERO CONTENT */}
  <div className="relative z-10 max-w-5xl">

    {/* SMALL METADATA
    <p className="mb-8 text-[10px] uppercase tracking-[0.3em] text-gray-500">
      MCA / NIT AGARTALA / 2026
    </p> */}

    {/* HEADLINE */}
    <h2
      className="text-[clamp(3.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.04em]"
      style={{ fontFamily: "var(--font-archivo-black)" }}
    >
      <span className="block">The people you</span>

      <span className="relative inline-block">
        <span className="relative z-10">studied with.</span>

        {/* HIGHLIGHT */}
        <span className="absolute bottom-1 left-0 -z-0 h-[45%] w-full -rotate-1 bg-[#c8ff3d]" />
      </span>

      <span className="mt-3 block">The people who</span>

      <span className="relative inline-block">
        <span className="relative z-10">came before you.</span>

        {/* HIGHLIGHT */}
        <span className="absolute bottom-1 left-0 -z-0 h-[45%] w-full rotate-1 bg-[#f3b7d8]" />
      </span>

      <span className="mt-3 block">The people you'll</span>

      <span className="relative inline-block">
        <span className="relative z-10">meet next.</span>

        {/* HIGHLIGHT */}
        <span className="absolute bottom-1 left-0 -z-0 h-[45%] w-full -rotate-1 bg-[#c8ff3d]" />
      </span>
    </h2> 
 
    {/* SUPPORTING CONTENT */}
    <div className="mt-8 flex items-end justify-between gap-10">

      <div>
        <div className="relative max-w-md">
          <p
            className="text-[20px] uppercase leading-[1.05] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            A private community
            <br />
            for MCA · NIT Agartala
          </p>
          <p
            className="mt-3 text-[15px] tracking-[0.08em] text-gray-600"
            style={{ fontFamily: "var(--font-caveat)" }}
          >
            students / seniors / alumni
          </p>
        </div>

        <div className="mt-6 flex items-center gap-6">
          <a
            href="#community"
            className="group text-xs font-medium uppercase tracking-[0.2em]"
          >
            Explore the community
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </a>

          <a
            href="/signup"
            className="group relative inline-flex items-center border border-black bg-[#f3b7d8] px-5 py-3 text-[11px] uppercase tracking-[0.18em] transition-transform duration-300 hover:rotate-0"
          >
            <span>Join NITALUM</span>

            <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </a>
        </div>
      </div>

    </div>

  </div>

  {/* LARGE HERO IMAGE */}
    <div className="absolute right-[8%] top-[17%] z-10 rotate-[2deg]">

      {/* PHOTO PAPER */}
      <div className="relative w-[350px] bg-white p-3 pb-8 shadow-[0_12px_30px_rgba(0,0,0,0.10)]">

        {/* TAPE */}
        <div className="absolute -top-5 left-1/2 z-20 h-9 w-28 -translate-x-1/2 rotate-[-4deg] bg-[#f3b7d8]/90" />

        {/* IMAGE */}
        <div className="h-[430px] overflow-hidden">
          <img
            src="/images/hero-main.png"
            alt="NIT Agartala MCA community"
            className="h-full w-full object-cover"
          />
        </div>

      </div>

    </div>

    {/* SMALL PORTRAIT */}
    <div className="absolute right-[4%] bottom-[12%] z-10 h-[170px] w-[130px] -rotate-[6deg] overflow-hidden border-4 border-[#f7f6f1]">
      <img
        src="/images/hero-person.png"
        alt="NITALUM member"
        className="h-full w-full object-cover"
      />
    </div>

    {/* GROUP PHOTO */}
    <div className="absolute right-[31%] bottom-[9%] z-30">

      {/* HAND-DRAWN MARKS */}
      <svg
        width="65"
        height="65"
        viewBox="0 0 65 65"
        fill="none"
        className="rotate-[-5deg]"
      >
      <path
        d="
          M31 3
          L48 47
          L10 20
          L54 21
          L16 48
          L31 3
        "
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      </svg>

      {/* PHOTO */}
      <div className="h-[125px] w-[125px] overflow-hidden rounded-full border-[3px] border-white shadow-[0_6px_15px_rgba(0,0,0,0.12)]">
        <img
          src="/images/hero-small.png"
          alt="NITALUM students"
          className="h-full w-full object-cover"
        />
      </div>

      {/* LABEL */}
      <p
        className="absolute left-1 -translate-x-1/2 rotate-[-5deg] whitespace-nowrap text-[18px]"
        style={{ fontFamily: "var(--font-caveat)" }}
      >
        your people →
      </p>

    </div>

    {/* EDITORIAL NOTE */}
    <div
      className="absolute right-[40%] top-[12%] z-20 rotate-[-8deg] text-[24px]"
      style={{ fontFamily: "var(--font-caveat)" }}
    >
      different batches.
      <br />
      one community.
    </div>   

</section>      

    </main>
  );
}