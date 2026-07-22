"use client";
import { educations } from "@/utils/data/educations";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import lottieFile from '../../../assets/lottie/study.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import { motion } from "framer-motion";
import GradientText from "../../helper/gradient-text";

function Education() {
  return (
    <div id="education" className="relative z-50 border-t my-12 lg:my-24 border-[#27272a]">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
        priority
      />
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#b4fe15]/50 to-transparent  w-full" />
        </div>
      </div>

      <h2 className="uppercase text-start text-2xl lg:text-3xl py-8 font-bold tracking-wider text-zinc-500">
        ACADEMIC <span className="text-white">EDUCATION</span>
      </h2>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-3/4 h-3/4">
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {
                educations.map((education, idx) => (
                  <motion.div
                    key={education.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.35, delay: idx * 0.1, ease: "easeOut" }}
                  >
                    <GlowCard identifier={`education-${education.id}`}>
                      <div className="p-3 relative text-white">
                        <Image
                          src="/blur-23.svg"
                          alt="Hero"
                          width={1080}
                          height={200}
                          className="absolute bottom-0 opacity-80"
                        />
                        <div className="flex justify-center">
                          <p className="text-xs sm:text-sm text-[#b4fe15]">
                            {education.duration}
                          </p>
                        </div>
                        <div className="flex items-center gap-x-8 px-3 py-5">
                          <div className="text-violet-500  transition-all duration-300 hover:scale-125">
                            <BsPersonWorkspace size={36} />
                          </div>
                          <div>
                            <p className="text-base sm:text-xl mb-2 font-medium uppercase">
                              {education.title}
                            </p>
                            <p className="text-sm sm:text-base">{education.institution}</p>
                          </div>
                        </div>
                      </div>
                    </GlowCard>
                  </motion.div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;