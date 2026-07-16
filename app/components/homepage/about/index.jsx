import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import codingAnimation from '../../../assets/lottie/coding.json';
import AnimationLottie from "../../helper/animation-lottie";
import GradientText from "../../helper/gradient-text";


function AboutSection() {
  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#27272a]"></span>
          <span className="bg-[#121214] w-fit p-2 px-5 text-xl rounded-md font-mono">
            <GradientText colors={['#b4fe15', '#10b981', '#ffffff']}>
              About Me
            </GradientText>
          </span>
          <span className="w-24 h-[2px] bg-[#27272a]"></span>
        </div>
      </div>
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