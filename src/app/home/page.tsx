"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [showNav, setShowNav] = useState(true);
  const [communityProgress, setCommunityProgress] = useState(0);
  const [generationProgress, setGenerationProgress] = useState(0);

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

  useEffect(() => {
  const handleCommunityScroll = () => {
    const section = document.getElementById("community");

    if (!section) return;

    const rect = section.getBoundingClientRect();
    const scrollDistance = section.offsetHeight - window.innerHeight;

    const progress = Math.min(
      1,
      Math.max(0, -rect.top / scrollDistance)
    );

    setCommunityProgress(progress);
  };
  window.addEventListener("scroll", handleCommunityScroll);

  return () => {
    window.removeEventListener("scroll", handleCommunityScroll);
  };
}, []);

  useEffect(() => {
  const handleGenerationScroll = () => {
    const section = document.getElementById("generations");

    if (!section) return;

    const rect = section.getBoundingClientRect();
    const scrollDistance = section.offsetHeight - window.innerHeight;

    const progress = Math.min(
      1,
      Math.max(0, -rect.top / scrollDistance)
    );

    setGenerationProgress(progress);
  };

  window.addEventListener("scroll", handleGenerationScroll);

  return () => {
    window.removeEventListener("scroll", handleGenerationScroll);
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
      
{/* ONE COMMUNITY */}
<section
  id="community"
  className="relative h-[200vh]"
>
  <div className="sticky top-0 h-screen overflow-hidden">

    {/* SECTION LABEL */}
    <p className="absolute left-8 top-28 z-30 text-[10px] uppercase tracking-[0.3em] text-gray-500">
      01 — ONE COMMUNITY
    </p>

    {/* HEADING */}
    <div
      className="absolute left-8 top-44 z-20"
      style={{
        transform: `translateY(-${communityProgress * 420}px)`,
      }}
    >
      <h2
        className="text-[clamp(4rem,8vw,6rem)] leading-[0.85] tracking-[-0.05em]"
        style={{ fontFamily: "var(--font-archivo-black)" }}
      >
        One campus.
        <br />

        <span className="relative inline-block">
          <span className="relative z-10">
            Many journeys.
          </span>

          <span className="absolute bottom-2 left-0 -z-0 h-[38%] w-[102%] -rotate-1 bg-[#c8ff3d]" />
        </span>
      </h2>
    </div>

    {/* VIDEO */}
    <div
      className="absolute z-10 overflow-hidden bg-black"
      style={{
        right: `${4 - communityProgress * 4}%`,
        top: `${50 - communityProgress * 52}%`,
        width: `${58 + communityProgress * 42}%`,
        height: `${55 + communityProgress * 45}vh`,
      }}
    >
      <video
        src="/videos/community.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      />

      {/* VIDEO METADATA */}
      <div
        className="absolute bottom-8 right-8 text-right text-white"
        style={{
          opacity: communityProgress,
        }}
      >
        <p className="text-[10px] uppercase tracking-[0.25em]">
          NIT AGARTALA
        </p>

        <p
          className="mt-2 text-[24px]"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          this is where it started.
        </p>
      </div>
    </div>

  </div>
</section>

{/* DIFFERENT GENERATIONS */}
<section 
  id="generations"
  className="relative h-[400vh]">

  <div className="sticky top-0 h-screen overflow-hidden px-8">

    {/* SMALL LABEL */}
    <p className="absolute left-8 top-24 text-[10px] uppercase tracking-[0.3em] text-gray-500">
      02 — DIFFERENT GENERATIONS
    </p>

    {/* LEFT TEXT */}
    <div className="absolute left-8 top-1/2 z-20 -translate-y-1/2">

      <p
        className="mb-8 text-[22px] text-gray-500"
        style={{ fontFamily: "var(--font-caveat)" }}
      >
        different generations,
        <br />
        one community.
      </p>

      <div
        className="flex flex-col text-[clamp(4rem,7vw,7rem)] leading-[0.85] tracking-[-0.05em]"
        style={{ fontFamily: "var(--font-archivo-black)" }}
      >
        <span className={`transition-opacity duration-500 ${
        generationProgress < 0.25 ? "opacity-100" : "opacity-25"
       }`}>Students.</span>
          <span
            className={`transition-opacity duration-500 ${
              generationProgress >= 0.25 && generationProgress < 0.5
                ? "opacity-100"
                : "opacity-25"
            }`}
          >Seniors.</span>
          <span
            className={`transition-opacity duration-500 ${
              generationProgress >= 0.5 && generationProgress < 0.75
                ? "opacity-100"
                : "opacity-25"
            }`}
          >Super Seniors.</span>        
            <span
              className={`transition-opacity duration-500 ${
                generationProgress >= 0.75
                  ? "opacity-100"
                  : "opacity-25"
              }`}
            >Alumni.</span>
      </div>

    </div>

    {/* SVG  */}
    <div className="absolute right-1/2 top-[10%] rotate-[90deg]">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 152 91" width="64" height="64" preserveAspectRatio="xMidYMid meet">
  <path stroke="#111111" stroke-linecap="round" stroke-width="2" d="M1.825 90.57C.263 80.294-.448 72.348 4.388 63.141a160 160 0 0 1 10.937-17.863c2.804-3.973 13.704-18.437 19.99-11.921 3.98 4.126 19.059 47.95 31.38 27.074 6.518-11.046 12.55-31.37 25.623-36.885 7.75-3.268 13.594 26.93 17.267 31.645 5.28 6.779 9.129-6.076 10.983-9.917 4.752-9.841 9.854-19.426 15.928-28.521 2.962-4.435 5.6-8.618 9.845-11.911 2.152-1.67.371-1.151-1.421-1.008-2.731.217-15.267 2.042-6.22.552 5.355-.881 7.492 2.475 9.001 7.425a29.5 29.5 0 0 1 1.217 6.973c.031.55-.28 1.834.234 1.636.918-.355 1.272-16.816 2.283-19.403"/>
  <path stroke="#111111" stroke-linecap="round" stroke-width="2" d="M137.392 6.918a431 431 0 0 0 8.196 9.835"/>
</svg>
    </div>

    <div className="absolute right-[45.5%] bottom-[10%] rotate-[180deg]">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 167 25" width="64" height="64" preserveAspectRatio="xMidYMid meet">
  <path fill="#111111" d="m157.5 24.5-12-12L158 0h8.5L154 12.5l12 12z"/>
  <path fill="#111111" d="m157.5 24.5-12-12L158 0h8.5L154 12.5l12 12zm-20.8 0-12-12L137.3 0h8.4l-12.5 12.5 12 12z"/>
  <path fill="#111111" d="m136.7 24.5-12-12L137.3 0h8.4l-12.5 12.5 12 12z"/>
  <path fill="#111111" d="m116 24.5-12-12L116.5 0h8.5l-12.5 12.5 12 12z"/>
  <path fill="#111111" d="m116 24.5-12-12L116.5 0h8.5l-12.5 12.5 12 12zm-20.8 0-12-12L95.8 0h8.4L91.7 12.5l12 12z"/>
  <path fill="#111111" d="m95.2 24.5-12-12L95.8 0h8.4L91.7 12.5l12 12zm-21 0-11.9-12L74.8 0h8.4L70.7 12.5l12 12z"/>
  <path fill="#111111" d="m74.2 24.5-11.9-12L74.8 0h8.4L70.7 12.5l12 12zm-20.7 0-12-12L54 0h8.5L50 12.5l12 12z"/>
  <path fill="#111111" d="m53.5 24.5-12-12L54 0h8.5L50 12.5l12 12zm-20.8 0-11.9-12L33.3 0h8.4L29.2 12.5l12 12z"/>
  <path fill="#111111" d="m32.7 24.5-11.9-12L33.3 0h8.4L29.2 12.5l12 12zm-20.7 0-12-12L12.5 0H21L8.5 12.5l12 12z"/>
  <path fill="#111111" d="m12 24.5-12-12L12.5 0H21L8.5 12.5l12 12z"/>
</svg>    
    </div>

    <div className="absolute right-[1%] top-[30%]">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 99 91" width="64" height="64" preserveAspectRatio="xMidYMid meet">
  <path stroke="#111111" stroke-linecap="round" stroke-width="1.836" d="M46.59 90c-14.328-7.42-24.922-14.178-33.18-27.98C9 54.65 4.916 47.013 2.69 38.66-.54 26.53.795 10.386 12.99 3.53 28.14-4.986 49.2 9.316 45.285 26.77c-.121.542-1.643 3.86-.855 2.02 4.242-9.907 16.833-19.04 26.718-22.303 15.64-5.163 26.637 3.146 26.043 19.577-.429 11.873-8.72 25.831-16.996 33.973-9.76 9.603-22.88 15.366-29.766 27.536"/>
</svg>
    </div>    

    {/* IMAGE AREA */}
    
    <div className="absolute right-[8%] top-1/2 h-[65vh] w-[42%] -translate-y-1/2">

      {/* STUDENTS */}
      <img
        src="/images/students.jpg"
        alt="NITALUM students"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
        generationProgress < 0.25 ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* SENIORS */}
      <img
        src="/images/seniors.jpg"
        alt="NITALUM seniors"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          generationProgress >= 0.25 && generationProgress < 0.5
            ? "opacity-100"
            : "opacity-0"
        }`}
      />

      {/* SUPER SENIORS */}
      <img
        src="/images/super-seniors.jpg"
        alt="NITALUM super seniors"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          generationProgress >= 0.5 && generationProgress < 0.75
            ? "opacity-100"
            : "opacity-0"
        }`}
      />

      {/* ALUMNI */}
      <img
        src="/images/alumni.jpg"
        alt="NITALUM alumni"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          generationProgress >= 0.75
            ? "opacity-100"
            : "opacity-0"
        }`}
      />

    </div>

  </div>

</section>

    </main>
  );
}