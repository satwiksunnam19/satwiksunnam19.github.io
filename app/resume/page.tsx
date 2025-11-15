import SubtleOrbs from '@/components/SubtleOrbs';

export default function Resume() {
  const experience = [
    {
      role: 'Research Assistant',
      company: 'University Of Bridgeport',
      period: 'September 2024 - Present',
      description: 'Developing framework for applying diffusion-based techniques to enhance embeddings in large language models.',
      achievements: [
        'Developed diffusion-based framework inspired by "Adversarial Purification via Diffusion Models"',
        'Investigated reverse-diffusion processes to improve LLM responses and semantic relevance',
        'Optimizing framework to enhance output coherence when diffused embeddings are processed by LLMs',
      ],
    },
    {
      role: 'Deep Learning Research Intern',
      company: 'Carnegie Mellon University',
      period: 'June 2023 - Present',
      description: 'Conducting advanced research in Xu Lab under Professor Min Xu, focusing on deep learning applications for Cryo-Electron Tomography Classification.',
      achievements: [
        'Successfully implemented and optimized the "MemBrain" architecture using PyTorch',
        'Incorporated novel enhancements for improved classification accuracy',
        'Collaborating with cross-functional research teams for cellular structure analysis',
      ],
    },
    {
      role: 'AI Engineer',
      company: 'Kluster',
      period: 'September 2023 - December 2023',
      description: 'Architected and deployed an AI-powered communication platform that simulates executive-level conversations.',
      achievements: [
        'Developed hybrid system combining prompt engineering and fine-tuning techniques',
        'Created emotion-aware AI agent using sentiment analysis',
        'Achieved 40% improvement in customer response rates',
      ],
    },
    {
      role: 'Machine Learning Engineer',
      company: 'Unstudio.AI',
      period: 'February 2023 - June 2023',
      description: 'Spearheaded development and fine-tuning of Stable Diffusion models for product styling.',
      achievements: [
        'Improved generation quality by 60% through fine-tuning',
        'Engineered end-to-end ML pipeline in cloud infrastructure, optimizing deployment efficiency by 75%',
        'Developed CKPT to Diffusers conversion framework, reducing processing time by 40%',
      ],
    },
    {
      role: 'Data Engineer',
      company: '31 Dynamics Research Centre Pvt. Ltd',
      period: 'July 2022 - November 2022',
      description: 'Implemented Vision Transformer architecture for real-time polyp detection in endoscopy videos.',
      achievements: [
        'Reduced workflow time by 80% with Vision Transformer implementation',
        'Optimized data annotation and augmentation processes, increasing dataset quality by 65%',
        'Led team of 3 engineers in developing automated data processing pipelines',
      ],
    },
  ];

  const education = [
    {
      degree: 'Master of Science in Artificial Intelligence',
      institution: 'University Of Bridgeport',
      period: '2024 - 2026',
      focus: 'Deep Learning, Computer Vision, Cloud Computing (GPA: 3.78)',
    },
    {
      degree: 'Bachelor of Technology in Artificial Intelligence',
      institution: 'Vidya Jyothi Institute of Technology, Aziz Nagar',
      period: '2019 - 2023',
      focus: 'Statistics, Data Science, AI, Machine Learning, Deep Learning (GPA: 7.72)',
    },
  ];

  const skills = {
    'Programming Languages': ['Python', 'C++', 'Java', 'Git'],
    'ML/DL Frameworks': ['PyTorch', 'TensorFlow', 'Pandas', 'NumPy'],
    'AI/ML Specializations': ['Deep Learning', 'NLP', 'Computer Vision', 'Machine Learning'],
    'Cloud & Tools': ['AWS', 'GCP', 'Docker', 'VSCode', 'Jupyter', 'LaTeX'],
  };

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 relative">
      <SubtleOrbs count={10} />
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="border border-green-500/30 rounded-lg p-6 bg-black/40 backdrop-blur-sm">
            <h1 className="text-3xl font-mono text-green-400 mb-2">
              <span className="text-green-500">$ </span>cat ./resume.txt
            </h1>
            <p className="text-gray-300 font-mono text-sm mb-4">
              Professional experience, education, and technical skills
            </p>
            <button className="border border-green-500/50 text-green-400 px-4 py-2 rounded hover:bg-green-500/20 transition-all font-mono text-sm">
              [Download PDF] ↓
            </button>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-mono text-green-400 mb-4">
            <span className="text-green-500"># </span>Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="border border-green-500/30 rounded-lg p-6 bg-black/40 backdrop-blur-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-mono text-green-400">{exp.role}</h3>
                    <p className="text-gray-400 font-mono text-sm">{exp.company}</p>
                  </div>
                  <span className="text-sm font-mono text-gray-500 bg-green-500/10 px-3 py-1 rounded border border-green-500/20">
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-300 mb-3">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-400 text-sm flex items-start">
                      <span className="text-green-500 mr-2">▸</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-mono text-green-400 mb-4">
            <span className="text-green-500"># </span>Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="border border-green-500/30 rounded-lg p-6 bg-black/40 backdrop-blur-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-mono text-green-400">{edu.degree}</h3>
                    <p className="text-gray-400 font-mono text-sm">{edu.institution}</p>
                  </div>
                  <span className="text-sm font-mono text-gray-500 bg-green-500/10 px-3 py-1 rounded border border-green-500/20">
                    {edu.period}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  <span className="text-green-500">Focus:</span> {edu.focus}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-mono text-green-400 mb-4">
            <span className="text-green-500"># </span>Technical Skills
          </h2>
          <div className="border border-green-500/30 rounded-lg p-6 bg-black/40 backdrop-blur-sm">
            <div className="space-y-4">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-sm font-mono text-green-500 mb-2">{category}:</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-green-500/10 text-gray-300 px-3 py-1 rounded border border-green-500/20 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="border border-green-500/30 rounded-lg p-4 bg-black/40 backdrop-blur-sm">
          <p className="text-sm font-mono text-gray-400">
            <span className="text-green-500">$</span> Last updated: {new Date().toLocaleDateString()}
            <br />
            <span className="text-gray-500">&gt; </span>
            <span className="text-gray-300">For complete work history, download the PDF resume</span>
          </p>
        </div>
      </div>
    </main>
  );
}
