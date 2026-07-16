"use client";
import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';
import { motion } from 'framer-motion';
import GradientText from '../../helper/gradient-text';

const Projects = () => {

  return (
    <div id='projects' className="relative z-50  my-12 lg:my-24">
      <div className="sticky top-10">
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl  opacity-30"></div>
        <div className="flex items-center justify-start relative">
          <span className="bg-[#121214] absolute left-0  w-fit px-5 py-3 text-xl rounded-md">
            <GradientText colors={['#b4fe15', '#10b981', '#ffffff']}>
              PROJECTS
            </GradientText>
          </span>
          <span className="w-full h-[2px] bg-[#121214]"></span>
        </div>
      </div>

      <div className="pt-24">
        <div className="flex flex-col gap-6">
          {projectsData.slice(0, 4).map((project, index) => (
            <motion.div
              id={`sticky-card-${index + 1}`}
              key={index}
              className="sticky-card w-full mx-auto max-w-2xl sticky"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="box-border flex items-center justify-center rounded shadow-[0_0_30px_0_rgba(0,0,0,0.3)] transition-all duration-[0.5s]">
                <ProjectCard project={project} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;