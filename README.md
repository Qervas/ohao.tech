# Frank's Personal Website

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fohao.tech)

A modern, performant personal website built with [Astro](https://astro.build/), [Tailwind CSS](https://tailwindcss.com/), and [Three.js](https://threejs.org/).

## 🚀 Features

- ⚡ Blazing fast performance with Astro's partial hydration
- 🎨 Beautiful dark/light mode with smooth transitions
- 📱 Fully responsive design that works on all devices
- 🎮 Interactive 3D demos with Three.js
- ✍️ Blog-ready with Markdown and MDX support
- 🎨 Customizable color schemes and theming
- 🔍 SEO optimized with automatic sitemap generation
- 🚀 Deploy anywhere (Vercel, Netlify, etc.)

## 🛠️ Tech Stack

- [Astro](https://astro.build/) - The web framework for content-driven websites
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Three.js](https://threejs.org/) - 3D library for the web
- [Lucid React Icons](https://lucide.dev/) - Beautiful & consistent icons
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [TypeScript](https://www.typescriptlang.org/) - Static type checking

## 📦 Project Structure

```
/
├── public/              # Static files (images, fonts, etc.)
│   └── images/          # Image assets
│
├── src/
│   ├── components/      # Reusable components
│   ├── layouts/         # Page layouts
│   ├── pages/           # Page components
│   │   ├── about/       # About page
│   │   ├── projects/    # Projects page
│   │   ├── playground/  # Interactive demos
│   │   └── ...
│   │
│   └── styles/          # Global styles
│
├── .gitignore           # Git ignore file
├── astro.config.mjs     # Astro configuration
├── package.json         # Project dependencies
├── tailwind.config.mjs  # Tailwind CSS configuration
└── vercel.json          # Vercel deployment configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.14.0 or higher
- npm 7.0.0 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ohao.tech.git
   cd ohao.tech
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:4321](http://localhost:4321) in your browser.

## 🛠️ Available Scripts

| Command             | Action                                           |
| ------------------- | ------------------------------------------------ |
| `npm install`       | Install dependencies                             |
| `npm run dev`       | Start development server                         |
| `npm run build`     | Build for production                             |
| `npm run preview`   | Preview production build locally                 |
| `npm run format`    | Format code with Prettier                        |
| `npm run lint`      | Lint code with ESLint                            |
| `npm run check`     | Check TypeScript types                           |

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fohao.tech)

1. Push your code to a GitHub repository
2. Import the repository into Vercel
3. Vercel will automatically detect the Astro project and configure the build settings

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your preferred static hosting service

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Astro](https://astro.build/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Three.js](https://threejs.org/) for 3D graphics
- All the open-source libraries used in this project
