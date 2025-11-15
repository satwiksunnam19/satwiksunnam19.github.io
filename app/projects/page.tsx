'use client';

import { useState } from 'react';
import ParticleSystem from '@/components/ParticleSystem';

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
    title: 'Diffusion-Based LLM Enhancement Framework',
    description: 'Developed a framework for applying diffusion-based techniques to enhance embeddings in large language models, inspired by adversarial purification research. Investigating reverse-diffusion processes to improve LLM responses and semantic relevance.',
    technologies: ['PyTorch', 'Diffusion Models', 'LLMs', 'Python'],
    category: 'Research',
    github: '#',
  },
  {
    id: 2,
    title: 'MemBrain - Cryo-ET Classification',
    description: 'Successfully implemented and optimized the MemBrain architecture for Cryo-Electron Tomography Classification at Carnegie Mellon University. Incorporating novel enhancements for improved classification accuracy in cellular structure analysis.',
    technologies: ['PyTorch', 'Computer Vision', 'Deep Learning', 'Research'],
    category: 'Research',
    github: '#',
  },
  {
    id: 3,
    title: 'AI-Powered Communication Platform',
    description: 'Architected and deployed an AI platform that simulates executive-level conversations, improving customer engagement at scale. Engineered hybrid system combining prompt engineering and fine-tuning, achieving human-like interactions with 40% improvement in response rates.',
    technologies: ['LLMs', 'NLP', 'Sentiment Analysis', 'Python'],
    category: 'ML/DL',
    github: '#',
  },
  {
    id: 4,
    title: 'Vision Transformer for Medical Imaging',
    description: 'Implemented Vision Transformer architecture for real-time polyp detection in endoscopy videos, reducing workflow time by 80%. Optimized data annotation and augmentation processes, increasing dataset quality by 65%.',
    technologies: ['Vision Transformers', 'Medical Imaging', 'PyTorch', 'Computer Vision'],
    category: 'ML/DL',
    github: '#',
  },
  {
    id: 5,
    title: 'Sentiment Analysis on IMDB Reviews',
    description: 'Developed Bi-LSTM and Attention-based models achieving 85% accuracy on summarized movie reviews. Implemented BART model for data generation and processed 100,000+ reviews using optimized deep learning architecture.',
    technologies: ['LSTM', 'BERT', 'NLP', 'PyTorch'],
    category: 'ML/DL',
    github: '#',
  },
  {
    id: 6,
    title: 'Face Products Recommendation System',
    description: 'Built CNN-based recommendation system achieving 80% accuracy across diverse racial and skin types. Implemented transfer learning techniques and processed 50,000+ facial images for training and validation.',
    technologies: ['CNN', 'Transfer Learning', 'Computer Vision', 'TensorFlow'],
    category: 'ML/DL',
    github: '#',
  },
  {
    id: 7,
    title: 'Stable Diffusion Model Fine-Tuning',
    description: 'Spearheaded development and fine-tuning of Stable Diffusion models for product styling, improving generation quality by 60%. Developed innovative CKPT to Diffusers conversion framework, reducing processing time by 40%.',
    technologies: ['Stable Diffusion', 'PyTorch', 'Generative AI', 'Cloud'],
    category: 'ML/DL',
    github: '#',
  },
  {
    id: 8,
    title: 'Meeting Summarizer',
    description: 'Developed automated meeting summarization system using Amazon Transcribe and BERT, achieving 0.95 BLEU score. Processed 1000+ hours of meeting content with 90% accuracy.',
    technologies: ['BERT', 'AWS', 'NLP', 'Python'],
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
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 relative">
      <ParticleSystem density={3} maxParticles={150} />
      <div className="max-w-6xl mx-auto relative z-10">
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
