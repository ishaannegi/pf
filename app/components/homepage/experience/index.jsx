"use client";
import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import experience from '../../../assets/lottie/code.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import { motion } from "framer-motion";
import GradientText from "../../helper/gradient-text";

function Experience() {
  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24 border-[#27272a]">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
        priority
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#121214]"></span>
          <span className="bg-[#121214] w-fit p-2 px-5 text-xl rounded-md">
            <GradientText colors={['#b4fe15', '#10b981', '#ffffff']}>
              Experiences
            </GradientText>
          </span>
          <span className="w-24 h-[2px] bg-[#121214]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-full h-full">
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {
                experiences.map((experience, idx) => (
                  <motion.div
                    key={experience.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.35, delay: idx * 0.1, ease: "easeOut" }}
                  >
                    <GlowCard identifier={`experience-${experience.id}`}>
                      <div className="p-3 relative">
                        <Image
                          src="/blur-23.svg"
                          alt="Hero"
                          width={1080}
                          height={200}
                          className="absolute bottom-0 opacity-80"
                        />
                        <div className="flex justify-center">
                          <p className="text-xs sm:text-sm text-[#b4fe15]">
                            {experience.duration}
                          </p>
                        </div>
                        <div className="flex items-center gap-x-8 px-3 py-5">
                          <div className="text-violet-500  transition-all duration-300 hover:scale-125">
                            <BsPersonWorkspace size={36} />
                          </div>
                          <div>
                            <p className="text-base sm:text-xl mb-2 font-medium uppercase">
                              {experience.title}
                            </p>
                            <p className="text-sm sm:text-base">
                              {experience.company}
                            </p>
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

export default Experience;