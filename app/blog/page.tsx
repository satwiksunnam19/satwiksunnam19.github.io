'use client';

import { useState } from 'react';
import SubtleOrbs from '@/components/SubtleOrbs';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Building Production-Ready ML Models with PyTorch',
    excerpt: 'Learn best practices for taking your PyTorch models from jupyter notebooks to production-ready applications. Covering model optimization, deployment strategies, and monitoring.',
    date: '2024-03-15',
    readTime: '8 min',
    tags: ['PyTorch', 'ML', 'Production'],
    slug: 'pytorch-production-models',
  },
  {
    id: 2,
    title: 'Understanding Physics-Informed Neural Networks',
    excerpt: 'Deep dive into how physics principles can be incorporated into neural networks to improve predictions and reduce data requirements for scientific computing tasks.',
    date: '2024-02-28',
    readTime: '12 min',
    tags: ['Deep Learning', 'Physics', 'Research'],
    slug: 'physics-informed-neural-networks',
  },
  {
    id: 3,
    title: 'Computer Vision for Geospatial Analysis',
    excerpt: 'Exploring how computer vision techniques can be applied to satellite imagery for urban planning, environmental monitoring, and disaster prediction.',
    date: '2024-02-10',
    readTime: '10 min',
    tags: ['Computer Vision', 'Geospatial', 'ML'],
    slug: 'cv-geospatial-analysis',
  },
  {
    id: 4,
    title: 'Optimizing Next.js for GitHub Pages',
    excerpt: 'A comprehensive guide to deploying Next.js applications to GitHub Pages, including static export configuration, routing fixes, and deployment automation.',
    date: '2024-01-22',
    readTime: '6 min',
    tags: ['Next.js', 'Web Dev', 'Deployment'],
    slug: 'nextjs-github-pages',
  },
  {
    id: 5,
    title: 'Transformer Architecture from Scratch',
    excerpt: 'Building a transformer model from first principles. Understanding attention mechanisms, positional encoding, and the complete architecture without libraries.',
    date: '2024-01-05',
    readTime: '15 min',
    tags: ['NLP', 'Transformers', 'Deep Learning'],
    slug: 'transformer-from-scratch',
  },
];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(
    post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 relative">
      <SubtleOrbs count={10} />
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="border border-green-500/30 rounded-lg p-6 bg-black/40 backdrop-blur-sm">
            <h1 className="text-3xl font-mono text-green-400 mb-2">
              <span className="text-green-500">$ </span>cat ./blog/articles.md
            </h1>
            <p className="text-gray-300 font-mono text-sm">
              Technical writings on ML, AI, and Software Engineering
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="border border-green-500/30 rounded-lg p-4 bg-black/40 backdrop-blur-sm">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-green-500">$</span>
              <span className="text-gray-400">grep -i</span>
              <input
                type="text"
                placeholder="search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-green-400 placeholder-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Blog Posts List */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="border border-green-500/30 rounded-lg p-6 bg-black/40 backdrop-blur-sm hover:border-green-500/50 transition-all group cursor-pointer"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-mono text-green-400 group-hover:text-green-300 flex-1">
                  {post.title}
                </h2>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 mb-3 text-sm font-mono text-gray-500">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime} read</span>
              </div>

              {/* Excerpt */}
              <p className="text-gray-300 mb-4 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-green-500/10 text-gray-400 px-2 py-1 rounded border border-green-500/20 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Read More Link */}
              <div className="pt-3 border-t border-green-500/20">
                <span className="text-sm font-mono text-green-400 group-hover:text-green-300 transition-colors">
                  [Read Article] →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="border border-green-500/30 rounded-lg p-8 bg-black/40 backdrop-blur-sm text-center">
            <p className="text-gray-400 font-mono">
              <span className="text-green-500">$</span> No articles found matching "{searchTerm}"
              <br />
              <span className="text-gray-600 text-sm">Try different keywords or clear the search</span>
            </p>
          </div>
        )}

        {/* Terminal Footer */}
        <div className="mt-8 border border-green-500/30 rounded-lg p-4 bg-black/40 backdrop-blur-sm">
          <p className="text-sm font-mono text-gray-400">
            <span className="text-green-500">$</span> echo "Showing {filteredPosts.length} of {blogPosts.length} articles"
            <br />
            <span className="text-gray-500">&gt; </span>
            <span className="text-gray-300">New articles published regularly</span>
          </p>
        </div>
      </div>
    </main>
  );
}
