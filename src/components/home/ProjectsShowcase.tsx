import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { projectsData } from '../../data/projectsData';
import { ProjectItem } from '../../types/project';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const ProjectsShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section className="py-20 bg-[#0E0E0E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Proven Craftsmanship"
          title="OUR WORK / PROJECTS"
          subtitle="Real projects completed at our workshop — engineered to perfection"
          marathiSubtitle="आम्ही केलेल्या काही खास कामांची झलक"
          align="center"
        />

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="bg-[#151515] rounded-xl border border-[#262626] overflow-hidden flex flex-col justify-between hover:border-[#F5B900]/50 transition-all duration-300 group shadow-lg"
            >
              {/* Image with Tag */}
              <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                <img
                  src={project.afterImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-black/30" />
                <div className="absolute top-3 left-3 bg-[#F5B900] text-black px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider shadow">
                  {project.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur px-2.5 py-1 rounded text-[11px] font-medium text-neutral-300 border border-white/10 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#F5B900]" />
                  <span>{project.completionTime}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-3 group-hover:text-[#F5B900] transition-colors">
                    {project.title}
                  </h3>

                  {/* Problem */}
                  <div className="mb-3 text-xs">
                    <span className="font-bold text-rose-400 uppercase tracking-wider block mb-0.5">
                      Problem:
                    </span>
                    <p className="text-neutral-400 line-clamp-2">
                      {project.problem}
                    </p>
                  </div>

                  {/* Work Done */}
                  <div className="mb-3 text-xs">
                    <span className="font-bold text-[#F5B900] uppercase tracking-wider block mb-0.5">
                      Work Done:
                    </span>
                    <p className="text-neutral-300 font-medium line-clamp-2">
                      {project.workDone.join(' + ')}
                    </p>
                  </div>

                  {/* Result */}
                  <div className="mb-4 text-xs bg-emerald-950/20 border border-emerald-500/20 p-2.5 rounded-lg">
                    <span className="font-bold text-emerald-400 uppercase tracking-wider block mb-0.5">
                      Result:
                    </span>
                    <p className="text-emerald-200">
                      {project.result}
                    </p>
                  </div>
                </div>

                {/* View Project Button */}
                <div className="pt-4 border-t border-[#262626]">
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => setSelectedProject(project)}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    className="text-xs uppercase font-bold"
                  >
                    View Project
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <Modal
          isOpen={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            {/* Before / After Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-1">
                  Before Condition
                </span>
                <img
                  src={selectedProject.beforeImage}
                  alt="Before condition"
                  className="w-full h-52 object-cover rounded-lg border border-[#2B2B2B]"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-[#F5B900] uppercase tracking-wider block mb-1">
                  After Restoration
                </span>
                <img
                  src={selectedProject.afterImage}
                  alt="After restoration"
                  className="w-full h-52 object-cover rounded-lg border border-[#F5B900]/40 shadow-yellow-sm"
                />
              </div>
            </div>

            {/* Problem & Result */}
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-[#1C1C1C] rounded-lg border border-[#2B2B2B]">
                <strong className="text-rose-400 block uppercase text-xs mb-1">Problem Identified:</strong>
                <p className="text-neutral-300">{selectedProject.problem}</p>
              </div>

              <div className="p-3 bg-[#1C1C1C] rounded-lg border border-[#2B2B2B]">
                <strong className="text-[#F5B900] block uppercase text-xs mb-1">Work Accomplished:</strong>
                <ul className="space-y-1.5 mt-2">
                  {selectedProject.workDone.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F5B900] shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-emerald-950/30 rounded-lg border border-emerald-500/30">
                <strong className="text-emerald-400 block uppercase text-xs mb-1">Final Result:</strong>
                <p className="text-emerald-200">{selectedProject.result}</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#262626]">
              <Button variant="ghost" onClick={() => setSelectedProject(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                asAnchor
                href={`/inquiry?service=Bike%20Restoration&notes=Inquiring%20about%20similar%20project:%20${encodeURIComponent(
                  selectedProject.title
                )}`}
              >
                Inquire For Similar Work
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
