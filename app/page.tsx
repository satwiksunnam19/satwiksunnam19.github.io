'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Satwik Sunnam';

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Terminal Header */}
        <div className="mb-8 border border-green-500/30 rounded-lg overflow-hidden bg-black/40 backdrop-blur-sm">
          <div className="bg-green-500/10 px-4 py-2 border-b border-green-500/30 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
            </div>
            <span className="text-xs font-mono text-gray-400 ml-2">~/home/terminal</span>
          </div>

          <div className="p-6 font-mono">
            <div className="mb-4">
              <span className="text-green-500">guest@portfolio</span>
              <span className="text-gray-400">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-gray-400">$ </span>
              <span className="text-gray-300">whoami</span>
            </div>

            <div className="text-2xl md:text-4xl font-bold mb-4">
              <span className="text-green-400">&gt; </span>
              <span className="text-gray-100">{displayedText}</span>
              <span className="cursor-blink"></span>
            </div>

            <div className="space-y-2 text-gray-300 mb-6">
              <p><span className="text-green-500">Role:</span> ML Engineer & Full-Stack Developer</p>
              <p><span className="text-green-500">Specialization:</span> Deep Learning, Computer Vision, Web Development</p>
              <p><span className="text-green-500">Status:</span> <span className="text-yellow-400">Building intelligent systems</span></p>
            </div>

            <div className="mb-4">
              <span className="text-green-500">guest@portfolio</span>
              <span className="text-gray-400">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-gray-400">$ </span>
              <span className="text-gray-300">ls -la skills/</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {[
                { category: 'ML/DL', items: ['PyTorch', 'TensorFlow', 'Computer Vision', 'NLP'] },
                { category: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'Go'] },
                { category: 'Web', items: ['React', 'Next.js', 'Node.js', 'Tailwind'] },
                { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Linux'] },
              ].map((skill, idx) => (
                <div key={idx} className="border border-green-500/30 rounded p-3 bg-green-500/5">
                  <p className="text-green-400 text-sm mb-2">./{skill.category}/</p>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, i) => (
                      <span key={i} className="text-xs bg-green-500/10 text-gray-300 px-2 py-1 rounded border border-green-500/20">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <span className="text-green-500">guest@portfolio</span>
              <span className="text-gray-400">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-gray-400">$ </span>
              <span className="text-gray-300">cat quick_links.sh</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="border border-green-500/50 text-green-400 px-4 py-2 rounded hover:bg-green-500/20 transition-all font-mono text-sm"
              >
                ./view_projects.sh
              </Link>
              <Link
                href="/blog"
                className="border border-green-500/50 text-green-400 px-4 py-2 rounded hover:bg-green-500/20 transition-all font-mono text-sm"
              >
                ./read_blog.sh
              </Link>
              <Link
                href="/resume"
                className="border border-green-500/50 text-green-400 px-4 py-2 rounded hover:bg-green-500/20 transition-all font-mono text-sm"
              >
                ./show_resume.sh
              </Link>
              <Link
                href="/contact"
                className="border border-green-500/50 text-green-400 px-4 py-2 rounded hover:bg-green-500/20 transition-all font-mono text-sm"
              >
                ./contact_me.sh
              </Link>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="border border-green-500/30 rounded-lg p-6 bg-black/40 backdrop-blur-sm">
          <h2 className="text-xl font-mono text-green-400 mb-4">
            <span className="text-green-500"># </span>About Me
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            I'm a passionate ML Engineer and Full-Stack Developer with expertise in building intelligent systems
            and scalable web applications. My work spans from deep learning models for computer vision tasks
            to creating seamless user experiences on the web.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Currently focused on pushing the boundaries of AI applications, with a special interest in
            computer vision, natural language processing, and physics-informed machine learning models.
          </p>
        </div>
      </div>
    </main>
  );
}
