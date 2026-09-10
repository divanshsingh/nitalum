"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const slides = [
      {
        image: "/images/slider1.png",
      },
      {
        image: "/images/slider2.png",
      },
      {
        image: "/images/slider3.png",
      },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    
    const [accessCode, setAccessCode] = useState("");
    const [error, setError] = useState("");

    const handleAccess = () => {
      if(accessCode === "MCA2026"){
        router.push("/home");
      }else{
        setError("That code doesn’t look right. Try again.");
      }
    };

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 2000);
      return () => clearInterval(timer);
    }, [slides.length]);

  return (
    <main className="min-h-screen text-black"
          style={{
            backgroundColor: "#f7f6f1",
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)
            `,
            backgroundSize: "18px 18px",
          }}
    >

      {/* Header */}
      <header className="flex items-center justify-between px-8 pt-6">
        <div className="flex gap-4">
          <h1 className="text-[28px] font-bold tracking-[0.15em]">
            NITALUM
          </h1>
          <span className="h-8 w-px bg-gray-400"></span>
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-gray-500">
            NIT Agartala
            <br /> MCA Community
          </p>
        </div>

        
        <div className="flex gap-5">
          <span className="mt-2 h-px w-12 bg-gray-400"></span>
          <p className="hidden text-xs uppercase tracking-[0.25em] md:block">
          Same campus.
          <br />
          Different directions.
        </p>          
        </div>
      </header>


      {/* Main Hero */}
      <section className="relative max-w-7xl">

        <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1.8fr]">

          {/* Left */}
          <div>
<section className="mx-auto max-w-6xl px-6">
  
{/* TOP SECTION */}
<div className="lefttopsection relative h-40">

  {/* Paper note */}
  <div className="absolute right-20 top-5 rotate-[-15deg]">

    <div className="relative bg-[#f4f0e6] px-10 py-5 shadow-sm">

      {/* Handwritten text */}
      <p
        className="text-[24px] leading-[1.15]"
        style={{ fontFamily: "var(--font-caveat)" }}
      >
        Late submissions
        <br />
        Coding nights
        <br />
        Endless chai
        <br />
        Lifelong connections
      </p>

      {/* Small smileys */}
      <span
        className="absolute right-5 top-16 text-lg"
        style={{ fontFamily: "var(--font-caveat)" }}
      >
        :)
      </span>

      <span
        className="absolute bottom-1 left-1/2 text-lg"
        style={{ fontFamily: "var(--font-caveat)" }}
      >
        :)
      </span>

    </div>

  </div>


  {/* Star */}
  <div className="absolute right-1 bottom-3">

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

  </div>

</div>

  {/* MIDDLE SECTION */}

<div className="flex gap-20">
{/* LEFT CONTROLS */}
<div className="relative p-5">

  {/* Slide numbers */}
  <div className="absolute bottom-12 left-6 space-y-4 text-xs">
    <p className="font-medium">01 / 04</p>

    <span className="block h-px w-8 bg-gray-400" />

    <p className="text-gray-400">02</p>
    <p className="text-gray-400">03</p>
    <p className="text-gray-400">04</p>
  </div>

</div>


{/* MAIN CONTENT */}
<div className="relative pl-12  pt-12">

  <h2 className="max-w-xl text-7xl font-extrabold leading-[0.85] tracking-[-0.04em]"
      style={{ fontFamily: "var(--font-archivo-black)" }}>
    More
    <br />
    than a
    <br />
    degree.
  </h2>

  <p className="mt-5 max-w-md text-l uppercase leading-[1.6] tracking-[0.25em]">
    A community
    <br />
    that stays
    <br />
    connected.
  </p>

  <span className="mt-8 block h-px w-20 bg-gray-400" />

</div>
</div>

{/* BOTTOM SECTION */}
<div className="relative h-40">

  {/* Curved line */}
  <div className="absolute left-24 top-5">
    <svg
      width="45"
      height="70"
      viewBox="0 0 45 70"
      fill="none"
    >
      <path
        d="M38 4C20 18 10 38 8 63"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </div>


  {/* Handwritten text */}
  <div className="absolute left-36 top-8">
    <p
      className="text-[24px] leading-[1.15]"
      style={{ fontFamily: "var(--font-caveat)" }}
    >
      NIT
      <br />
      AGARTALA
      <br />
      MCA
    </p>
  </div>


  {/* Handmade star */}
  <div className="absolute left-64 top-12">
    <svg
      width="55"
      height="55"
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
  </div>

</div>

</section>          
          </div>


          {/* Image */}
          <div className="relative mt-[-15%]">
            <div className="aspect-[4/3] overflow-hidden bg-gray-300">
              {/* Our real MCA image will come here */}
              <div className="flex h-full items-center justify-center text-sm text-gray-500">
                <img
                  src={slides[currentSlide].image}
                  alt="NITALUM MCA students"
                  className="h-full w-full object-cover"
                />                
              </div>
            </div>

            {/* Arrow controls */}
            <button 
            onClick={() => {
              setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
            }}
            className="absolute -left-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black text-xl text-white">
              ←
            </button>

            <button 
              onClick={() =>
                setCurrentSlide(
                  (prev) => (prev + 1) % slides.length
                )
              }            
            className="absolute -right-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black text-xl text-white">
              →
            </button>
          </div>

        </div>


        {/* Access code */}
        <div className="max-w-xl ml-[50%] mt-[-7%]">

          <div className="flex rounded-full border border-gray-400 bg-white p-1">

            <input
              type={showPassword ? "text" : "password"}
              value={accessCode}
              onChange={(e) => {
                setAccessCode(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if(e.key == "Enter"){
                  handleAccess();
                }
              }}  
              placeholder="Enter access code"
              className="flex-1 rounded-full bg-transparent px-6 py-4 text-sm outline-none"
            />

            {error && (
              <p className="mt-2 p-2 text-center text-xs text-red-500">
                {error}
              </p>
            )}            

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="mr-1 flex h-12 w-12 items-center justify-center rounded-full text-lg"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                    <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c5 0 8.5 4 9.5 6a11.8 11.8 0 0 1-3.2 3.7" />
                    <path d="M6.6 6.6C4.6 7.9 3.3 9.6 2.5 11c1 2 4.5 6 9.5 6 1 0 2-.2 2.9-.5" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                    <circle cx="12" cy="12" r="2.5" />
                  </svg>
                )}
              </button>

            <button 
              onClick={handleAccess}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-xl text-white">
              →
            </button>

          </div>

          <p className="mt-4 text-center text-[10px] uppercase tracking-[0.35em] text-gray-500">
            This is a private community
          </p>

        </div>


        {/* Slider dots */}
        <div className="mt-5 ml-[45%] flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full ${
                currentSlide === index
                  ? "bg-black"
                  : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>


        {/* Bottom navigation */}
        <nav className="mt-15 p-10 flex gap-6 text-[10px] uppercase tracking-[0.3em]">
          <span>People</span>
          <span>/</span>
          <span>Batches</span>
          <span>/</span>
          <span>Cities</span>
          <span>/</span>
          <span>Stories</span>
        </nav>

      </section>
    </main>
  );
}