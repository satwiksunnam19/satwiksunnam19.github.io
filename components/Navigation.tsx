'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'home', path: '/' },
    { name: 'projects', path: '/projects' },
    { name: 'blog', path: '/blog' },
    { name: 'resume', path: '/resume' },
    { name: 'contact', path: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-b border-green-500/30 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <Link href="/" className="text-green-400 font-mono text-lg hover:text-green-300 transition-colors">
            <span className="text-green-500">$</span> satwik_sunnam
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-2 rounded-md text-sm font-mono transition-all ${
                  isActive(item.path)
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'text-gray-400 hover:text-green-400 hover:bg-green-500/10'
                }`}
              >
                <span className="text-green-500/70">[</span>
                {item.name}
                <span className="text-green-500/70">]</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Terminal-style breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-2">
        <p className="text-xs font-mono text-gray-500">
          <span className="text-green-500">~</span>
          {pathname}
        </p>
      </div>
    </nav>
  );
};

export default Navigation;
