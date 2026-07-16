import * as React from 'react';
import Image from 'next/image';
import { BsGithub } from 'react-icons/bs';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { skillsImage } from '@/utils/skill-image';
import SpotlightCard from '../../helper/spotlight-card';

function ProjectCard({ project }) {

  return (
    <SpotlightCard className="from-[#080808] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] w-full p-0">
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>
      <div className="px-4 lg:px-8 py-3 lg:py-5 relative">
        <div className="flex flex-row space-x-1 lg:space-x-2 absolute top-1/2 -translate-y-1/2">
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-red-400"></div>
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-orange-400"></div>
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-green-200"></div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-[#b4fe15] text-base lg:text-xl font-bold">
            {project.name}
          </p>
          {/* Tech icons row under title */}
          <div className="flex flex-row gap-2 mt-2.5 justify-center items-center flex-wrap">
            {project.tools.map((tool, idx) => {
              const imgData = skillsImage(tool);
              if (!imgData) return null;
              return (
                <div key={idx} className="w-6 h-6 relative flex items-center justify-center hover:scale-125 transition-transform duration-200" title={tool}>
                  <Image
                    src={imgData.src}
                    alt={tool}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
        <code className="font-mono text-xs md:text-sm lg:text-base break-words">
          <div className="blink">
            <span className="mr-2 text-pink-500">const</span>
            <span className="mr-2 text-white">project</span>
            <span className="mr-2 text-pink-500">=</span>
            <span className="text-gray-400">{'{'}</span>
          </div>
          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
            <span className="text-gray-400">{`'`}</span>
            <span className="text-amber-300">{project.name}</span>
            <span className="text-gray-400">{`',`}</span>
          </div>

          <div className="ml-4 lg:ml-8 mr-2">
            <span className=" text-white">tools:</span>
            <span className="text-gray-400">{` ['`}</span>
            {
              project.tools.map((tag, i) => (
                <React.Fragment key={i}>
                  <span className="text-amber-300">{tag}</span>
                  {
                    project.tools?.length - 1 !== i ?
                    <span className="text-gray-400">{`', '`}</span> :
                    <span className="text-gray-400">{`'`}</span>
                  }
                </React.Fragment>
              ))
            }
            <span className="text-gray-400">{"],"}</span>
          </div>
          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-white">myRole:</span>
            <span className="text-gray-400">{`'`}</span>
            <span className="text-amber-300">{project.role}</span>
            <span className="text-gray-400">{`',`}</span>
          </div>
          <div className="ml-4 lg:ml-8 mr-2">
            <span className="text-white">Description:</span>
            <span className="text-gray-400">{` '`}</span>
            <span className="text-cyan-400">{project.description}</span>
            <span className="text-gray-400">{`',`}</span>
          </div>
          <div><span className="text-gray-400">{`};`}</span></div>
        </code>
        
        {(project.code || project.demo) && (
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-indigo-900/40">
            {project.code && (
              <a
                href={project.code}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#b4fe15] transition-all duration-300 font-mono"
              >
                <BsGithub size={16} />
                <span>View Code</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#b4fe15] transition-all duration-300 font-mono"
              >
                <FaExternalLinkAlt size={12} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}

export default ProjectCard;