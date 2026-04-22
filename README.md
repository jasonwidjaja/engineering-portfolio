# Jason Widjaja — Engineering Portfolio

A personal engineering portfolio built with React, TypeScript, Vite, Tailwind CSS, Three.js, and Framer Motion.

---

## Quick Start

```bash
# 1. Install dependencies (only needed once)
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The site hot-reloads on every save.

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## Project Structure

```
Engineering Portfolio/
├── public/                    # Static assets served as-is
│   ├── headshot.jpg
│   ├── Jason_Widjaja_Resume.pdf
│   └── *.png / *.gif          # Project images
├── src/
│   ├── context/
│   │   └── ThemeContext.tsx   # Theme state + CSS variable injection
│   ├── components/
│   │   ├── Hero.tsx           # Landing card
│   │   ├── HeroScene.tsx      # Three.js 3D background
│   │   ├── Navbar.tsx         # Fixed top nav
│   │   ├── PhysicsGallery.tsx # Project cards grid
│   │   ├── Experience.tsx     # Timeline / job history
│   │   ├── About.tsx          # Bio + skills
│   │   ├── OffDutyAdventures.tsx
│   │   ├── ResumeSection.tsx
│   │   ├── Footer.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── BackToTop.tsx
│   │   └── ThemeSwitcher.tsx  # Floating color theme picker
│   ├── data/
│   │   ├── content.ts         # ← ALL editable content lives here
│   │   └── projects.ts
│   ├── themes.ts              # Theme color definitions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## Making Content Changes

**All content is centralized in `src/data/content.ts`.** You do not need to touch any component files to update text, links, or project info.

### Personal Info

Edit the `PERSONAL` object at the top of `content.ts`:

```ts
export const PERSONAL = {
  name: 'Jason Widjaja',
  title: 'Robotics & Mechanical Engineering',
  tagline: 'Your tagline here...',
  location: 'Boston, MA',
  email: 'your@email.com',
  linkedin: 'https://linkedin.com/in/yourprofile',
  resumePdf: '/Jason_Widjaja_Resume.pdf',   // file goes in /public/
  headshotSrc: '/headshot.jpg',             // file goes in /public/
  bio: ['Paragraph one...', 'Paragraph two...'],
}
```

### Credentials, Skills, Awards

```ts
export const CREDENTIALS = ['M.S. Robotics — Northeastern \'26', ...]
export const SKILLS = ['Python', 'SolidWorks', ...]
export const AWARDS = [{ label: 'Award Name', sublabel: 'Detail' }, ...]
```

### Adding a Project

Add an entry to the `PROJECTS` array in `content.ts`. Each project supports:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique slug |
| `title` | string | Card title |
| `subtitle` | string | One-line description |
| `category` | string | Category label |
| `featured` | boolean | Shows "Featured" badge |
| `accent` | string | Hex color for this card's highlights |
| `description` | string | Short description |
| `problem` | string | Problem statement (modal) |
| `result` | string | Result/outcome (modal) |
| `highlights` | string[] | Bullet points |
| `tags` | string[] | Tech tags |
| `image` | string | Single card image URL |
| `images` | `{src, caption}[]` | Gallery images |
| `videos` | string[] | Video embed URLs |
| `posterPdf` | string | Link to PDF poster |

```ts
{
  id: 'my-project',
  title: 'My New Project',
  subtitle: 'What it does in one line',
  category: 'Mechanical',
  featured: true,
  accent: '#06b6d4',
  description: 'Short description shown on the card.',
  problem: 'The problem we were solving...',
  result: 'What we achieved...',
  highlights: ['Built X', 'Achieved Y'],
  tags: ['Python', 'CAD'],
  image: 'https://example.com/image.png',
}
```

### Adding a Work Experience

Add to the `EXPERIENCE` array:

```ts
{
  company: 'Company Name',
  role: 'Your Role',
  period: 'Jan 2025 – Jun 2025',
  accent: '#f59e0b',   // card highlight color
  overview: 'What you did overall...',
  highlights: ['Accomplished X', 'Built Y'],
  projects: [
    {
      title: 'Project Name',
      description: 'What it was...',
      images: [{ src: '/image.png', caption: 'Caption' }],
    }
  ],
}
```

---

## Color Themes

The site ships with **5 built-in themes** selectable via the floating sun icon in the bottom-left corner. Your selection is saved to `localStorage`.

| Theme | Accent |
|-------|--------|
| Emerald | `#22c55e` (default) |
| Violet | `#8b5cf6` |
| Amber | `#f59e0b` |
| Ocean | `#06b6d4` |
| Rose | `#f43f5e` |

### Adding a Custom Theme

Edit `src/themes.ts` and add an entry to the `THEMES` array:

```ts
{
  id: 'my-theme',         // unique id
  name: 'My Theme',       // display name in switcher
  accent: '#ff6600',      // primary accent hex
  accentDark: '#cc5200',  // darker shade (used in gradients)
  accentRgb: '255,102,0', // "r,g,b" string (used in rgba())
  accentLight: '#ffaa66', // lighter tint (used for badge text)
  bg: '#0a0500',          // page background hex
  bgNum: 0x0a0500,        // same value as Three.js int (drop the #, prefix 0x)
  threePrimary: 0xff6600, // 3D scene primary color
  threeSecondary: 0x3b82f6, // 3D scene secondary color
}
```

---

## Swapping Assets

| Asset | Location | Notes |
|-------|----------|-------|
| Resume PDF | `public/Jason_Widjaja_Resume.pdf` | Update path in `PERSONAL.resumePdf` |
| Headshot | `public/headshot.jpg` | Update path in `PERSONAL.headshotSrc` |
| Project images | `public/` or external URL | Set in project `image` / `images` fields |

Images in `public/` are referenced as `/filename.ext` (no `public/` prefix needed).

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Vite](https://vitejs.dev) | Build tool & dev server |
| [React 18](https://react.dev) | UI framework |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [Framer Motion](https://framer.com/motion) | Animations & transitions |
| [Three.js](https://threejs.org) | 3D hero background scene |

---

## Deployment

This is a static site — build once and host anywhere.

```bash
npm run build
# Output goes to dist/
```

**Recommended hosts:** Vercel, Netlify, GitHub Pages, Cloudflare Pages.

For Vercel: connect your GitHub repo and it deploys automatically on every push to `main`.
