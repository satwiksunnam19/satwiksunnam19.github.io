'use client';

import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: 'ML/DL' | 'Web' | 'Research';
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Hurricane Prediction Model',
    description: 'Deep learning model for hurricane trajectory and intensity prediction using PyTorch. Achieved high accuracy in forecasting hurricane paths using computer vision and time-series analysis.',
    technologies: ['PyTorch', 'Computer Vision', 'Python', 'NumPy'],
    category: 'ML/DL',
    github: '#',
  },
  {
    id: 2,
    title: 'Urban Expansion Analysis',
    description: 'ML model analyzing urban expansion patterns using satellite imagery and geospatial data. Compares Manhattan urban development from 2017 to 2024.',
    technologies: ['TensorFlow', 'Geospatial Analysis', 'Python', 'NumPy'],
    category: 'ML/DL',
    github: '#',
  },
  {
    id: 3,
    title: 'PhysMoP - Physics-Informed Motion Prediction',
    description: 'Research project implementing physics principles for precise human motion prediction. Based on recent WACV 2024 research paper.',
    technologies: ['PyTorch', 'Physics-ML', 'Computer Vision', 'Research'],
    category: 'Research',
    github: '#',
  },
  {
    id: 4,
    title: 'AI Tab Organizer Extension',
    description: 'Browser extension that uses AI to intelligently organize and manage browser tabs, improving productivity and reducing tab clutter.',
    technologies: ['JavaScript', 'Chrome Extension API', 'ML', 'React'],
    category: 'Web',
    github: '#',
  },
  {
    id: 5,
    title: 'Nano-GPT Implementation',
    description: 'Implementation of a lightweight GPT model for text generation and understanding, trained from scratch with custom optimizations.',
    technologies: ['PyTorch', 'Transformers', 'NLP', 'Python'],
    category: 'ML/DL',
    github: '#',
  },
  {
    id: 6,
    title: 'Resume Optimizer',
    description: 'AI-powered tool that analyzes and optimizes resumes for ATS systems and job descriptions, providing actionable feedback.',
    technologies: ['Python', 'NLP', 'LLMs', 'Web Scraping'],
    category: 'ML/DL',
    github: '#',
  },
];

export default function Projects() {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'ML/DL', 'Web', 'Research'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="border border-green-500/30 rounded-lg p-6 bg-black/40 backdrop-blur-sm">
            <h1 className="text-3xl font-mono text-green-400 mb-2">
              <span className="text-green-500">$ </span>ls -la ./projects/
            </h1>
            <p className="text-gray-300 font-mono text-sm">
              Showcasing my work in Machine Learning, Web Development, and Research
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded font-mono text-sm transition-all ${
                filter === cat
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                  : 'bg-black/40 text-gray-400 border border-green-500/20 hover:border-green-500/40 hover:text-green-400'
              }`}
            >
              {cat === 'All' ? 'show_all.sh' : `./${cat}/`}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="border border-green-500/30 rounded-lg p-6 bg-black/40 backdrop-blur-sm hover:border-green-500/50 transition-all group"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-mono text-green-400 group-hover:text-green-300">
                  {project.title}
                </h3>
                <span className="text-xs font-mono text-gray-500 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                  {project.category}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="mb-4">
                <p className="text-xs font-mono text-green-500 mb-2">Technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-green-500/10 text-gray-400 px-2 py-1 rounded border border-green-500/20 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-3 pt-3 border-t border-green-500/20">
                {project.github && (
                  <a
                    href={project.github}
                    className="text-sm font-mono text-green-400 hover:text-green-300 transition-colors"
                  >
                    [GitHub] →
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    className="text-sm font-mono text-green-400 hover:text-green-300 transition-colors"
                  >
                    [Live Demo] →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Terminal Footer */}
        <div className="mt-8 border border-green-500/30 rounded-lg p-4 bg-black/40 backdrop-blur-sm">
          <p className="text-sm font-mono text-gray-400">
            <span className="text-green-500">$</span> echo "Found {filteredProjects.length} projects"
            <br />
            <span className="text-gray-500">&gt; </span>
            <span className="text-gray-300">More projects coming soon...</span>
          </p>
        </div>
      </div>
    </main>
  );
}
