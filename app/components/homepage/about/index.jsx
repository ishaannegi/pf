import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import codingAnimation from '../../../assets/lottie/coding.json';
import AnimationLottie from "../../helper/animation-lottie";
import GradientText from "../../helper/gradient-text";


function AboutSection() {
  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <h2 className="uppercase text-start text-2xl lg:text-3xl py-8 font-bold tracking-wider text-zinc-500">
        A BIT <span className="text-white">ABOUT ME</span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="order-2 lg:order-1">
          <p className="text-gray-200 text-sm lg:text-lg leading-relaxed">
            {personalData.description}
          </p>
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          <div className="w-full max-w-md">
            <AnimationLottie animationPath={codingAnimation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;