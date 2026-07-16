"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function Navbar() {
  const [time, setTime] = useState("");
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      setTime(formatter.format(new Date()) + " IST");
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    // Setup active section observer
    const sections = ["about", "experience", "skills", "education", "projects", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center gap-4">
          <div className="w-8 h-8 bg-[#b4fe15] text-[#080808] font-bold flex items-center justify-center rounded text-lg font-mono">
            I.
          </div>
          <Link
            href="/"
            className=" text-[#b4fe15] text-2xl font-bold font-mono tracking-wider">
            ISHAAN NEGI
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-sm font-mono text-gray-400">
          <ul className="flex flex-row space-x-2 md:space-x-4" id="navbar-default">
            <li>
              <Link className="block px-3 py-2 no-underline outline-none hover:no-underline" href="/#about">
                <div className={`text-[13px] md:text-sm transition-all duration-300 hover:text-[#b4fe15] hover:scale-105 transform font-medium tracking-wider ${activeSection === "about" ? "text-[#b4fe15] font-bold scale-105" : "text-gray-200"}`}>
                  <span className="text-[#b4fe15] mr-1 font-semibold">01</span> ABOUT
                </div>
              </Link>
            </li>
            <li>
              <Link className="block px-3 py-2 no-underline outline-none hover:no-underline" href="/#experience">
                <div className={`text-[13px] md:text-sm transition-all duration-300 hover:text-[#b4fe15] hover:scale-105 transform font-medium tracking-wider ${activeSection === "experience" ? "text-[#b4fe15] font-bold scale-105" : "text-gray-200"}`}>
                  <span className="text-[#b4fe15] mr-1 font-semibold">02</span> EXPERIENCE
                </div>
              </Link>
            </li>
            <li>
              <Link className="block px-3 py-2 no-underline outline-none hover:no-underline" href="/#skills">
                <div className={`text-[13px] md:text-sm transition-all duration-300 hover:text-[#b4fe15] hover:scale-105 transform font-medium tracking-wider ${activeSection === "skills" ? "text-[#b4fe15] font-bold scale-105" : "text-gray-200"}`}>
                  <span className="text-[#b4fe15] mr-1 font-semibold">03</span> SKILLS
                </div>
              </Link>
            </li>
            <li>
              <Link className="block px-3 py-2 no-underline outline-none hover:no-underline" href="/#education">
                <div className={`text-[13px] md:text-sm transition-all duration-300 hover:text-[#b4fe15] hover:scale-105 transform font-medium tracking-wider ${activeSection === "education" ? "text-[#b4fe15] font-bold scale-105" : "text-gray-200"}`}>
                  <span className="text-[#b4fe15] mr-1 font-semibold">04</span> EDUCATION
                </div>
              </Link>
            </li>
            <li>
              <Link className="block px-3 py-2 no-underline outline-none hover:no-underline" href="/#projects">
                <div className={`text-[13px] md:text-sm transition-all duration-300 hover:text-[#b4fe15] hover:scale-105 transform font-medium tracking-wider ${activeSection === "projects" ? "text-[#b4fe15] font-bold scale-105" : "text-gray-200"}`}>
                  <span className="text-[#b4fe15] mr-1 font-semibold">05</span> PROJECTS
                </div>
              </Link>
            </li>
            <li>
              <Link className="block px-3 py-2 no-underline outline-none hover:no-underline" href="/#contact">
                <div className={`text-[13px] md:text-sm transition-all duration-300 hover:text-[#b4fe15] hover:scale-105 transform font-medium tracking-wider ${activeSection === "contact" ? "text-[#b4fe15] font-bold scale-105" : "text-gray-200"}`}>
                  <span className="text-[#b4fe15] mr-1 font-semibold">06</span> CONTACT
                </div>
              </Link>
            </li>
          </ul>
          
          {time && (
            <div className="flex items-center gap-2 border-l border-gray-800 pl-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b4fe15] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b4fe15]"></span>
              </span>
              <span className="text-gray-300 font-mono text-xs">{time}</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;