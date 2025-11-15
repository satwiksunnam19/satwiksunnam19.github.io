export default function Resume() {
  const experience = [
    {
      role: 'Machine Learning Engineer',
      company: 'Tech Company',
      period: '2023 - Present',
      description: 'Developing deep learning models for computer vision and NLP tasks. Leading ML infrastructure and deployment initiatives.',
      achievements: [
        'Built production-ready ML models serving 100K+ users',
        'Reduced model inference time by 40% through optimization',
        'Implemented MLOps pipeline for automated model deployment',
      ],
    },
    {
      role: 'Full-Stack Developer',
      company: 'Startup Inc',
      period: '2022 - 2023',
      description: 'Built scalable web applications using React, Node.js, and cloud infrastructure.',
      achievements: [
        'Developed features used by 50K+ active users',
        'Improved application performance by 60%',
        'Led migration to microservices architecture',
      ],
    },
  ];

  const education = [
    {
      degree: 'Master of Science in Computer Science',
      institution: 'University Name',
      period: '2021 - 2023',
      focus: 'Machine Learning & Computer Vision',
    },
    {
      degree: 'Bachelor of Science in Computer Engineering',
      institution: 'University Name',
      period: '2017 - 2021',
      focus: 'Software Engineering',
    },
  ];

  const skills = {
    'Machine Learning': ['PyTorch', 'TensorFlow', 'Scikit-learn', 'OpenCV', 'Hugging Face'],
    'Programming': ['Python', 'JavaScript', 'TypeScript', 'Go', 'C++', 'SQL'],
    'Web Development': ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS'],
    'Tools & Cloud': ['Git', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Linux'],
    'Data & ML Ops': ['Pandas', 'NumPy', 'MLflow', 'Weights & Biases', 'Apache Airflow'],
  };

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
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
