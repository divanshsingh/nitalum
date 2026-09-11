"use client";

import { useEffect, useState } from "react";

const people = [
  {
    image: "/images/people-1.jpg",
    name: "Divansh Singh",
    batch: "MCA '26",
    role: "Student",
  },
  {
    image: "/images/people-2.jpg",
    name: "Person Two",
    batch: "MCA '25",
    role: "Software Engineer",
  },
  {
    image: "/images/people-3.jpg",
    name: "Person Three",
    batch: "MCA '24",
    role: "Data Analyst",
  },
  {
    image: "/images/people-4.jpg",
    name: "Person Four",
    batch: "MCA '23",
    role: "Product",
  },
  {
    image: "/images/people-5.jpg",
    name: "Person Five",
    batch: "MCA '22",
    role: "Software Engineer",
  },
  {
    image: "/images/people-6.jpg",
    name: "Person Six",
    batch: "MCA '21",
    role: "Entrepreneur",
  },
  {
    image: "/images/people-7.jpg",
    name: "Person Seven",
    batch: "MCA '20",
    role: "Higher Studies",
  },
  {
    image: "/images/people-8.jpg",
    name: "Person Eight",
    batch: "MCA '20",
    role: "Higher Studies",
  },
  {
    image: "/images/people-9.jpg",
    name: "Person Nine",
    batch: "MCA '20",
    role: "Higher Studies",
  },
  {
    image: "/images/people-10.jpg",
    name: "Person Ten",
    batch: "MCA '20",
    role: "Higher Studies",
  },      
];

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

  useEffect(() => {
  const section = document.getElementById("people");

  if (!section) return;

  const images =
    section.querySelectorAll<HTMLElement>(".people-parallax");

  let ticking = false;

  const updateParallax = () => {
    const scrollY = window.scrollY;
    const sectionTop = section.offsetTop;

    const distance = scrollY - sectionTop;

    images.forEach((image) => {
      const speed = Number(image.dataset.speed || 0.05);

      image.style.transform = `translateY(${-distance * speed}px)`;
    });

    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  updateParallax();

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

{/* PEOPLE */}
<section
  id="people"
  className="relative min-h-[180vh] overflow-hidden px-8 py-32"
>
  {/* LABEL */}
  <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
    02 — THE PEOPLE
  </p>

  {/* HEADING */}
  <div className="mt-14">
    <h2
      className="text-[clamp(4rem,8vw,8rem)] leading-[0.88] tracking-[-0.05em]"
      style={{ fontFamily: "var(--font-archivo-black)" }}
    >
      Meet the
      <br />

      <span className="relative inline-block">
        <span className="relative z-10">
          people.
        </span>

        <span className="absolute bottom-2 left-0 -z-0 h-[35%] w-[105%] rotate-[-1deg] bg-[#f3b7d8]" />
      </span>
    </h2>

    <p className="mt-8 max-w-[500px] text-[18px] leading-[1.5] text-gray-700">
      Students, seniors and alumni — each building
      a different path from the same starting point.
    </p>
  </div>

  {/* COLLAGE */}
  <div className="relative mx-auto mt-20 h-[900px] max-w-7xl">

    {/* PERSON 1 */}
    <div
      className="people-parallax group absolute left-[2%] top-[30px] w-[120px]"
      data-speed="0.04"
    >
    <div className="overflow-hidden">
      <img
        src={people[0].image}
        alt={people[0].name}
        className="h-[150px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
    </div>

      <div className="mt-3">
        <p className="text-[11px] uppercase tracking-[0.15em]">
          {people[0].name}
        </p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-gray-500">
          {people[0].batch} · {people[0].role}
        </p>

          {/* HOVER TEXT */}
        <p className="mt-2 text-[10px] bg-amber-200 uppercase tracking-[0.15em] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          ↗ View profile
        </p>        
      </div>
    </div>

{/* PERSON 2 */}
<div
  className="people-parallax group absolute left-[35%] top-[80px] w-[150px] group-hover:cursor-pointer"
  data-speed="0.07"
>
  <div className="overflow-hidden">
    <img
      src={people[1].image}
      alt={people[1].name}
      className="h-[200px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    />
  </div>

  <div className="mt-3 px-2 py-2">
    <p className="text-[11px] uppercase tracking-[0.15em]">
      {people[1].name}
    </p>
    <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-gray-600">
      {people[1].batch} · {people[1].role}
    </p>
    <p className="mt-2 text-[10px] bg-[#f3c4d8] uppercase tracking-[0.15em] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      ↗ View profile
    </p>
  </div>
</div>


{/* PERSON 3 */}
<div
  className="people-parallax group absolute left-[14%] top-[250px] w-[180px] group-hover:cursor-pointer"
  data-speed="0.055"
>
  <div className="overflow-hidden">
    <img
      src={people[2].image}
      alt={people[2].name}
      className="h-[180px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    />
  </div>

  <div className="mt-3 px-2 py-2">
    <p className="text-[11px] uppercase tracking-[0.15em]">
      {people[2].name}
    </p>
    <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-gray-600">
      {people[2].batch} · {people[2].role}
    </p>
    <p className="mt-2 text-[10px] bg-[#fff0a8] uppercase tracking-[0.15em] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      ↗ View profile
    </p>
  </div>
</div>


{/* PERSON 4 */}
<div
  className="people-parallax group absolute left-[5%] top-[550px] w-[150px] group-hover:cursor-pointer"
  data-speed="0.08"
>
  <div className="overflow-hidden">
    <img
      src={people[3].image}
      alt={people[3].name}
      className="h-[200px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    />
  </div>

  <div className="mt-3 px-2 py-2">
    <p className="text-[11px] uppercase tracking-[0.15em]">
      {people[3].name}
    </p>
    <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-gray-600">
      {people[3].batch} · {people[3].role}
    </p>
    <p className="mt-2 text-[10px] bg-[#c9e8f5] uppercase tracking-[0.15em] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      ↗ View profile
    </p>
  </div>
</div>


{/* PERSON 5 */}
<div
  className="people-parallax group absolute right-[54%] top-[450px] w-[120px] group-hover:cursor-pointer"
  data-speed="0.045"
>
  <div className="overflow-hidden">
    <img
      src={people[4].image}
      alt={people[4].name}
      className="h-[150px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    />
  </div>

  <div className="mt-3 px-2 py-2">
    <p className="text-[11px] uppercase tracking-[0.15em]">
      {people[4].name}
    </p>
    <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-gray-600">
      {people[4].batch} · {people[4].role}
    </p>
    <p className="mt-2 bg-[#dcefc5] text-[10px] uppercase tracking-[0.15em] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      ↗ View profile
    </p>
  </div>
</div>


{/* PERSON 6 */}
<div
  className="people-parallax group absolute right-[30%] top-[430px] w-[180px] group-hover:cursor-pointer"
  data-speed="0.09"
>
  <div className="overflow-hidden">
    <img
      src={people[5].image}
      alt={people[5].name}
      className="h-[240px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    />
  </div>

  <div className="mt-3 px-2 py-2">
    <p className="text-[11px] uppercase tracking-[0.15em]">
      {people[5].name}
    </p>
    <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-gray-600">
      {people[5].batch} · {people[5].role}
    </p>
    <p className="mt-2 text-[10px] bg-[#f3c4d8] uppercase tracking-[0.15em] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      ↗ View profile
    </p>
  </div>
</div>


{/* PERSON 7 */}
<div
  className="people-parallax group absolute right-[20%] top-[100px] w-[200px] group-hover:cursor-pointer"
  data-speed="0.09"
>
  <div className="overflow-hidden">
    <img
      src={people[6].image}
      alt={people[6].name}
      className="h-[120px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    />
  </div>

  <div className="mt-3 px-2 py-2">
    <p className="text-[11px] uppercase tracking-[0.15em]">
      {people[6].name}
    </p>
    <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-gray-600">
      {people[6].batch} · {people[6].role}
    </p>
    <p className="mt-2 text-[10px] bg-[#fff0a8] uppercase tracking-[0.15em] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      ↗ View profile
    </p>
  </div>
</div>


{/* PERSON 8 */}
<div
  className="people-parallax group absolute right-[2%] top-[50px] w-[100px] group-hover:cursor-pointer"
  data-speed="0.09"
>
  <div className="overflow-hidden">
    <img
      src={people[7].image}
      alt={people[7].name}
      className="h-[80px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    />
  </div>

  <div className="mt-3 px-2 py-2">
    <p className="text-[11px] uppercase tracking-[0.15em]">
      {people[7].name}
    </p>
    <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-gray-600">
      {people[7].batch} · {people[7].role}
    </p>
    <p className="mt-2 text-[10px] bg-[#c9e8f5] uppercase tracking-[0.15em] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      ↗ View profile
    </p>
  </div>
</div>


{/* PERSON 9 */}
<div
  className="people-parallax group absolute right-[5%] top-[600px] w-[200px] group-hover:cursor-pointer"
  data-speed="0.09"
>
  <div className="overflow-hidden">
    <img
      src={people[8].image}
      alt={people[8].name}
      className="h-[120px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    />
  </div>

  <div className="mt-3 px-2 py-2">
    <p className="text-[11px] uppercase tracking-[0.15em]">
      {people[8].name}
    </p>
    <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-gray-600">
      {people[8].batch} · {people[8].role}
    </p>
    <p className="mt-2 text-[10px] bg-[#dcefc5] uppercase tracking-[0.15em] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      ↗ View profile
    </p>
  </div>
</div>


{/* PERSON 10 */}
<div
  className="people-parallax group absolute right-[5%] top-[300px] w-[150px] group-hover:cursor-pointer"
  data-speed="0.09"
>
  <div className="overflow-hidden">
    <img
      src={people[9].image}
      alt={people[9].name}
      className="h-[120px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    />
  </div>

  <div className="mt-3 px-2 py-2">
    <p className="text-[11px] uppercase tracking-[0.15em]">
      {people[9].name}
    </p>
    <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-gray-600">
      {people[9].batch} · {people[9].role}
    </p>
    <p className="mt-2 text-[10px] bg-[#f3c4d8] uppercase tracking-[0.15em] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      ↗ View profile
    </p>
  </div>
</div>     

    {/* STATIC DOODLE — HEART */}
    <div className="absolute right-[30%] top-[30px] z-10 w-14 rotate-[-8deg]">
      <img
        src="/doodles/heart.svg"
        alt=""
        className="w-full"
      />
    </div>

    {/* STATIC DOODLE — SPARKLE */}
    <div className="absolute left-[20%] top-[540px] z-10 w-10 rotate-[8deg]">
      <img
        src="/doodles/sparkle.svg"
        alt=""
        className="w-full"
      />
    </div>

    {/* STATIC DOODLE — HEART */}
    <div className="absolute left-[18%] top-[120px] z-10 w-16">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 99 91" width="20" height="60" preserveAspectRatio="xMidYMid meet">
      <path stroke="#111111" stroke-linecap="round" stroke-width="1.836" d="M46.59 90c-14.328-7.42-24.922-14.178-33.18-27.98C9 54.65 4.916 47.013 2.69 38.66-.54 26.53.795 10.386 12.99 3.53 28.14-4.986 49.2 9.316 45.285 26.77c-.121.542-1.643 3.86-.855 2.02 4.242-9.907 16.833-19.04 26.718-22.303 15.64-5.163 26.637 3.146 26.043 19.577-.429 11.873-8.72 25.831-16.996 33.973-9.76 9.603-22.88 15.366-29.766 27.536"/>
    </svg>
    </div>

    {/* STATIC DOODLE — SQUIGGLES */}
    <div className="absolute left-[48%] top-[60px] z-10 w-16">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 159 38" width="64" height="64" preserveAspectRatio="xMidYMid meet">
      <path stroke="#111111" stroke-linecap="round" stroke-width="2" d="M1 34.697c15.814 1.858 27.472 2.3 42.15-3.278 8.127-3.088 16.936-8.13 22.535-14.924.812-.985 10.499-13.391 6.93-15.175-3.767-1.884-8.25 5.08-10.062 7.318-5.997 7.413-16.426 26.543.661 27.54 11.852.69 23.457-5.426 34.29-9.42 19.66-7.246 39.228-11.72 59.952-14.686"/>
    </svg>
    </div>    

    {/* STATIC DOODLE — STAR & SPARKELS */}
    <div className="absolute left-[53%] top-[180px] z-10 w-16">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 82 84" width="34" height="64" preserveAspectRatio="xMidYMid meet">
      <path stroke="#111111" stroke-linecap="round" stroke-width="1.906" d="M41.582 1.216c-1.796 4.609-1.197 8.882-1.023 13.747.226 6.318.418 12.596.877 18.903m-.371 11.314c-1.314 6.33-.723 12.5-.176 18.9.52 6.077 1.25 12.132 1.968 18.188M1.134 46.665c4.033-1.795 7.835-1.868 12.175-2.162a155 155 0 0 0 19.347-2.551m14.607-1.856c11.15-.714 22.127-2.565 33.184-4.1M49.343 34.65l3.574-6.483M32.979 50.35l-4.34 4.29m23.997-5.974 4.315 2.91M31.549 30.847c-4.675-1.415-8.835-3.493-13.275-5.488"/>
    </svg>
    </div> 

    {/* STATIC DOODLE — PATTERN */}
    <div className="absolute right-[26%] top-[390px] z-10 w-16 rotate-90">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 102 13" width="64" height="64" preserveAspectRatio="xMidYMid meet">
        <path fill="#111111" d="m7.9 6.3-4 3.2L0 12.6V0l3.9 3.2z"/>
        <path fill="#111111" d="m7.9 6.3-4 3.2L0 12.6V0l3.9 3.2zm23.3 0-4 3.2-3.9 3.1V0l3.9 3.2z"/>
        <path fill="#111111" d="m31.2 6.3-4 3.2-3.9 3.1V0l3.9 3.2zm23.3 0-3.9 3.2-4 3.1V0l4 3.2z"/>
        <path fill="#111111" d="m54.5 6.3-3.9 3.2-4 3.1V0l4 3.2zm23.3 0-3.9 3.2-4 3.1V0l4 3.2z"/>
        <path fill="#111111" d="m77.8 6.3-3.9 3.2-4 3.1V0l4 3.2zm23.4 0-4 3.2-4 3.1V0l4 3.2z"/>
        <path fill="#111111" d="m101.2 6.3-4 3.2-4 3.1V0l4 3.2z"/>
      </svg>
    </div>  

    {/* STATIC DOODLE — RADIANT START */}
    <div className="absolute left-[18%] top-[520px] z-10 w-16 rotate-70">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 155 45" width="64" height="64" preserveAspectRatio="xMidYMid meet">
        <path stroke="#111111" stroke-linecap="round" stroke-width="2" d="M1.234 11.47c1.725 10.957 7.51 41.144 12.039 31.02 2.932-6.558 6.455-13.016 9.247-19.58 3.707-8.712 3.135-.716 5.532 5 .73 1.74 6.696 15.637 9.015 8.511 2.548-7.831 4.316-15.447 10.095-21.617 4.696-5.015 8.337 4.265 10.465 7.641 6.075 9.637 5.749 6.908 8.76-3.056.818-2.705 7.693-19.51 8.058-18.65 1.732 4.091 2.649 9.484 3.383 13.838.62 3.677 4.737 28.147 6.844 14.336 1.2-7.867 8.893-30.003 9.154-22.05.172 5.27-2.67 21.842 4.036 24.043 3.547 1.164 8.525-3.11 11.496-4.408 7.623-3.33 15.817-6.485 23.955-8.283 2.747-.607 21.399-.517 20.854-5.903-.438-4.326-8.617-14.39-10.189-6.185-1.139 5.945-2.081 11.784-4.087 17.525-.159.457-3.587 10.174-3.521 10.178 3.877.221 15.5-16.177 16.667-20.366"/>
      </svg>
    </div>  

    {/* STATIC DOODLE — RADIANT START */}
    <div className="absolute left-[42%] top-[410px] z-10 w-16 rotate-x-180">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 242 217" width="64" height="64" preserveAspectRatio="xMidYMid meet">
        <path stroke="#111111" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1.5" stroke-width="5.588" d="M212.136 37.501c1.298-8.39 2.346-16.938 4.089-25.248.409-1.95.854-7.246 2.841-8.351 2.516-1.4 5.21 1.71 6.565 3.4 4.051 5.055 6.985 11.693 10.006 17.43.606 1.15 3.098 4.619 2.765 6.028M219.061 3.902c3.517 15.243 3.056 31.782 2.871 47.345-.374 31.589 7.225 110.788-19.212 134.062-15.747 13.862-43 12.814-62.437 14.499-45.32 3.929-91.895 13.462-137.378 13.581"/>
      </svg>
    </div>

    {/* STATIC DOODLE — S-Curve Arrow */}
    <div className="absolute left-[99%] top-[210px] z-10 w-16 rotate-130">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 90" width="64" height="64" preserveAspectRatio="xMidYMid meet">
      <path stroke="#111111" stroke-linecap="round" stroke-width="2" d="M.564 86.444c9.056 2.773 16.11 4.593 24.794.618 6.773-3.1 13.639-6.915 19.127-12.006 5.969-5.537 13.417-13.716 8.651-21.918-3.813-6.564-9.876-12.883-9.876-20.83 0-8.785 5.494-14.001 11.718-19.314 3.717-3.174 8.111-7.144 10.715-11.34 1.136-1.83-7.713.725-8.932 1.041-.28.073.992.708 1.3 1.109 1.728 2.252 2.689 5.032 4.425 7.313 3.518 4.62 4.442-7.574 5.963-9.717"/>
    </svg>
    </div>                    

  {/* STICKY NOTE 1 */}
  <div className="absolute right-[95%] top-[320px] z-20 w-[120px] h-[120px] rotate-[-6deg] bg-[#f3c4d8] px-6 py-7 shadow-[3px_6px_12px_rgba(0,0,0,0.08)]">
    <p
      className="text-[16px] leading-[1.05]"
      style={{ fontFamily: "var(--font-caveat)" }}
    >
      same people.
      <br />
      bigger dreams.
      <br />
      <span className="text-[18px]">♡</span>
    </p>
    {/* tape */}
    <div className="absolute -top-3 left-1/2 h-4 w-12 -translate-x-1/2 rotate-2 bg-[#eee8dc]/70" />
  </div> 

  {/* STICKY NOTE 2 */}
  <div className="absolute left-[98%] top-[520px] z-20 w-[100px] h-[120px] rotate-[-6deg] bg-[#e6e9a9] px-6 py-7 shadow-[3px_6px_12px_rgba(0,0,0,0.08)]">
    <p
      className="text-[16px] leading-[1.05]"
      style={{ fontFamily: "var(--font-caveat)" }}
    >
      same people.
      <br />
      bigger dreams.
      <br />
      <span className="text-[18px]">♡</span>
    </p>
    {/* tape */}
    <div className="absolute -top-3 left-1/2 h-5 w-14 -translate-x-1/2 rotate-2 bg-[#eee8dc]/70" />
  </div>      

  </div>

  {/* BOTTOM STATEMENT */}
  <div className="flex items-end justify-between border-t border-black/10 pt-6">
    <p
      className="text-[24px]"
      style={{ fontFamily: "var(--font-caveat)" }}
    >
      different paths. same starting point.
    </p>

    <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
      <a href=""
      className="underline-offset-4 hover:bg-amber-200 hover:underline">
        500+ people
        </a>
        <span> · </span>
      <a href=""
      className="underline-offset-4 hover:bg-[#f3b7d8] hover:underline">
        18 batches
        </a>          
    </div>
  </div>
</section>

    </main>
  );
}