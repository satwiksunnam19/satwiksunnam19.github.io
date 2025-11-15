# Portfolio Website

A modern, terminal-themed portfolio website built with Next.js, React, and Tailwind CSS. Designed with a developer/technical aesthetic featuring a command-line interface style.

![Portfolio Preview](https://via.placeholder.com/800x400?text=Portfolio+Website)

## Features

- **Terminal-Inspired Design**: Clean, developer-focused aesthetic with terminal-style UI elements
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Fast & Optimized**: Static site generation for lightning-fast performance
- **GitHub Pages Ready**: Configured for easy deployment to GitHub Pages
- **Modern Tech Stack**: Built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4

## Pages

- **Home**: Introduction with animated typing effect and quick links
- **Projects**: Filterable portfolio showcasing ML, web, and research projects
- **Blog**: Technical articles with search functionality
- **Resume**: Professional experience, education, and skills
- **Contact**: Contact form and social media links

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework with static export
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS
- [GitHub Pages](https://pages.github.com/) - Free hosting

## Getting Started

### Prerequisites

- Node.js 20+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### 1. Personal Information

Update the following files with your information:

**app/page.tsx** - Home page:
- Change `fullText` variable to your name
- Update role, specialization, skills, and about section

**app/layout.tsx** - Site metadata:
- Update `title` and `description` in metadata

**components/Navigation.tsx** - Navigation logo:
- Change `satwik_sunnam` to your name/brand

### 2. Projects

Edit `app/projects/page.tsx`:
- Replace the `projects` array with your actual projects
- Update GitHub and demo links
- Add or modify project categories

### 3. Blog Posts

Edit `app/blog/page.tsx`:
- Replace `blogPosts` array with your articles
- Update titles, excerpts, dates, and tags
- Implement actual blog post pages if needed

### 4. Resume

Edit `app/resume/page.tsx`:
- Update `experience` array with your work history
- Update `education` array with your degrees
- Modify `skills` object with your technical skills
- Add link to your actual PDF resume

### 5. Contact Information

Edit `app/contact/page.tsx`:
- Update `socialLinks` with your actual social media URLs
- Update location, timezone, and quick info
- Configure form submission (see Form Setup section)

### 6. Styling & Theme

Edit `app/globals.css`:
- Modify color variables for different color schemes
- Adjust terminal green (`#00ff00`) to your preferred color
- Customize scrollbar, selection, and other effects

## Form Setup

The contact form needs a backend to work. Here are some free options:

### Option 1: FormSpree (Recommended)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get your endpoint
3. Update `app/contact/page.tsx` handleSubmit function

### Option 2: Netlify Forms
1. Deploy to Netlify
2. Add `netlify` attribute to the form
3. Netlify will handle submissions automatically

### Option 3: Email Service
- Use [EmailJS](https://www.emailjs.com/) for client-side email sending
- No backend required

## Deployment to GitHub Pages

### Step 1: Update Configuration

1. Open `next.config.ts`
2. Change `basePath` to match your repository name:
```typescript
basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
```

### Step 2: Create GitHub Repository

1. Create a new repository on GitHub
2. Initialize git and push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

### Step 3: Configure GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" in the sidebar
3. Under "Build and deployment":
   - Source: Select "GitHub Actions"

### Step 4: Deploy

The site will automatically deploy when you push to the main branch. The GitHub Action workflow will:
1. Build your Next.js site
2. Export it as static HTML
3. Deploy to GitHub Pages

Your site will be available at: `https://yourusername.github.io/your-repo-name`

### Manual Build & Deploy

You can also build and deploy manually:

```bash
# Build the site
npm run build

# The static files will be in the 'out' directory
# You can deploy this folder to any static hosting service
```

## Project Structure

```
portfolio-website/
├── app/                    # Next.js app directory
│   ├── blog/              # Blog page
│   ├── contact/           # Contact page
│   ├── projects/          # Projects page
│   ├── resume/            # Resume page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   └── Navigation.tsx     # Navigation bar
├── public/                # Static files
│   └── .nojekyll         # GitHub Pages config
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions workflow
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization Ideas

- Add dark/light theme toggle
- Implement actual blog with MDX support
- Add project detail pages
- Integrate Google Analytics
- Add animation libraries (Framer Motion)
- Include actual project demos/screenshots
- Add loading states and transitions
- Implement comment system for blog

## Troubleshooting

### 404 on GitHub Pages
- Ensure `basePath` in `next.config.ts` matches your repo name
- Check that GitHub Pages is set to use GitHub Actions
- Verify the `.nojekyll` file exists in the `public` folder

### Build Errors
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Styling Issues
- Clear Tailwind cache
- Ensure all Tailwind classes are included in content paths

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## Support

If you have questions or need help:
- Open an issue on GitHub
- Check Next.js documentation
- Review Tailwind CSS docs

---

Made with ❤️ by [Your Name]
