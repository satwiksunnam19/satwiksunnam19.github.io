'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate form submission (replace with actual form handler like FormSpree, Netlify Forms, etc.)
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/satwiksunnam19', icon: 'gh' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/satwik-sunnam', icon: 'in' },
    { name: 'Kaggle', url: 'https://www.kaggle.com/satwiksunnam', icon: 'kg' },
    { name: 'Email', url: 'mailto:sunnamsatwik19@gmail.com', icon: '@' },
  ];

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="border border-green-500/30 rounded-lg p-6 bg-black/40 backdrop-blur-sm">
            <h1 className="text-3xl font-mono text-green-400 mb-2">
              <span className="text-green-500">$ </span>./contact_me.sh
            </h1>
            <p className="text-gray-300 font-mono text-sm">
              Get in touch - I'd love to hear from you!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Form */}
          <div className="border border-green-500/30 rounded-lg p-6 bg-black/40 backdrop-blur-sm">
            <h2 className="text-xl font-mono text-green-400 mb-4">
              <span className="text-green-500"># </span>Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-mono text-green-500 mb-2">
                  name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/60 border border-green-500/30 rounded px-3 py-2 text-gray-300 font-mono text-sm focus:border-green-500/50 focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-green-500 mb-2">
                  email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/60 border border-green-500/30 rounded px-3 py-2 text-gray-300 font-mono text-sm focus:border-green-500/50 focus:outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-green-500 mb-2">
                  message:
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-black/60 border border-green-500/30 rounded px-3 py-2 text-gray-300 font-mono text-sm focus:border-green-500/50 focus:outline-none resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full border border-green-500/50 text-green-400 px-4 py-2 rounded hover:bg-green-500/20 transition-all font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? '[Sending...]' : status === 'success' ? '[Sent! ✓]' : '[Send Message]'}
              </button>

              {status === 'success' && (
                <p className="text-green-400 text-sm font-mono">
                  <span className="text-green-500">$</span> Message sent successfully!
                </p>
              )}
            </form>
          </div>

          {/* Social Links & Info */}
          <div className="space-y-6">
            {/* Social Links */}
            <div className="border border-green-500/30 rounded-lg p-6 bg-black/40 backdrop-blur-sm">
              <h2 className="text-xl font-mono text-green-400 mb-4">
                <span className="text-green-500"># </span>Connect
              </h2>
              <div className="space-y-3">
                {socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors group"
                  >
                    <span className="w-8 h-8 border border-green-500/30 rounded flex items-center justify-center font-mono text-sm group-hover:border-green-500/50 group-hover:bg-green-500/10">
                      {link.icon}
                    </span>
                    <span className="font-mono text-sm">{link.name}</span>
                    <span className="text-green-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="border border-green-500/30 rounded-lg p-6 bg-black/40 backdrop-blur-sm">
              <h2 className="text-xl font-mono text-green-400 mb-4">
                <span className="text-green-500"># </span>Quick Info
              </h2>
              <div className="space-y-3 text-sm font-mono">
                <p className="text-gray-300">
                  <span className="text-green-500">Location:</span> Bridgeport, Connecticut, USA
                </p>
                <p className="text-gray-300">
                  <span className="text-green-500">Timezone:</span> EST (UTC-5)
                </p>
                <p className="text-gray-300">
                  <span className="text-green-500">Phone:</span> +1 203-540-6650
                </p>
                <p className="text-gray-300">
                  <span className="text-green-500">Status:</span> Research Assistant @ UB
                </p>
              </div>
            </div>

            {/* Terminal Status */}
            <div className="border border-green-500/30 rounded-lg p-4 bg-black/40 backdrop-blur-sm">
              <p className="text-xs font-mono text-gray-400">
                <span className="text-green-500">$</span> status --check
                <br />
                <span className="text-gray-500">&gt; </span>
                <span className="text-green-400">Online</span>
                <span className="cursor-blink"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
