# Repurposr — AI Content Repurposer

Transform raw transcripts, articles, and notes into platform-optimized content for LinkedIn, X/Twitter, newsletters, and short-form video — instantly.

![Repurposr Demo](https://img.shields.io/badge/Status-Prototype-blue)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)

## Features

- **Multi-Platform Output**: Generate content for 4 platforms simultaneously
  - **LinkedIn**: Professional thought-leadership posts with hooks, hashtags & CTAs
  - **X/Twitter**: Threads with hook tweet, 5-7 body tweets, and closing CTA
  - **Newsletter**: Subject line, preheader, structured body, and CTA
  - **Video Hooks**: 3 punchy 5-second hooks with visual cues for Reels/TikTok/Shorts

- **4 Content Styles**: Professional, Casual, Educational, Engaging — each with distinct voice and structure

- **Flexible AI Integration**: 
  - Starts in demo mode with preset example responses (no API key needed)
  - Supports OpenAI, Anthropic, and custom endpoints (LocalAI, Ollama)
  - Provider settings are saved locally; API keys remain in page memory only

- **Modern UX**: 
  - Skeleton loaders during generation
  - One-click copy with visual feedback
  - Keyboard shortcuts (Ctrl/Cmd + Enter to generate)
  - Fully responsive, mobile-first design
  - Dark mode support

- **Direct provider requests**: Input and credentials are sent from your browser directly to the configured AI provider when you generate

## Quick Start

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm 9+

### Installation

```bash
# Replace OWNER with the GitHub account that hosts the repository
git clone https://github.com/OWNER/repurposr.git
cd repurposr

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory, ready for deployment to Vercel, Netlify, or any static host.

## Configuration

### Using Demo Mode (Default)
No configuration is needed to explore the interface. Without an OpenAI or Anthropic API key, the app returns preset example content; it does not transform the text you enter. Custom endpoints can be configured without an API key.

### Using Your Own API Key

1. Click the **Settings** icon in the navbar
2. Select your provider:
   - **OpenAI**: Get key at [platform.openai.com](https://platform.openai.com/api-keys)
   - **Anthropic**: Get key at [console.anthropic.com](https://console.anthropic.com/)
   - **Custom**: For LocalAI, Ollama, or compatible endpoints
3. Enter your API key
4. Optionally customize the model and base URL
5. Click **Save Settings**

Provider settings are stored in browser `localStorage`; API keys are kept only in page memory and cleared when the page reloads. With a configured provider, your input and key are sent directly from your browser to that provider; they are not sent through a Repurposr server. Do not submit sensitive content unless you trust the provider. A browser-only app cannot safely conceal a shared/default API key from its users.

## Project Structure

```
repurposr/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Modal.tsx
│   │   ├── Navbar.tsx
│   │   ├── InputSection.tsx
│   │   ├── OutputTabs.tsx
│   │   ├── ContentCard.tsx
│   │   └── SettingsModal.tsx
│   ├── services/
│   │   └── aiService.ts     # AI integration with mock fallback
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── types.ts             # TypeScript interfaces
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles + Tailwind
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 18, TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS 3.4 |
| Icons | Lucide React |
| Utilities | clsx, tailwind-merge |
| AI Providers | OpenAI, Anthropic, Custom (fetch API) |

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Static Hosting
Upload the `dist/` folder to any static host (GitHub Pages, Cloudflare Pages, AWS S3, etc.)

## Security and deployment

This is a static, browser-only application. Do not put API keys in `VITE_*` environment variables or commit them: client-side values are visible to users. For a public service that provides shared credentials, add a trusted backend/proxy with authentication, rate limiting, and server-side secret storage. Custom endpoint URLs are sent from the user's browser and must support browser CORS.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run service tests |

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

See [LICENSE](./LICENSE).

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [Lucide](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for component inspiration
- OpenAI & Anthropic for their APIs

---

**Built with ❤️ for content creators everywhere**# repurposr
