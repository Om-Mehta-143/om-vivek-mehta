# OM VIVEK MEHTA — Cybersecurity Portfolio

A cinematic, hacker-themed 3D portfolio website built with React, Three.js, and Tailwind CSS.

## 🎯 What This Is

A personal portfolio for **Om Vivek Mehta** — Cybersecurity Student, Aspiring Penetration Tester, and Startup Owner. The site features a Matrix-style 3D hero scene, terminal-styled UI, and interactive sections showcasing skills, systems, and certifications.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm
- Modern browser with WebGL support (Chrome 90+, Firefox 88+, Safari 14+)

### Run Locally

```bash
# Install dependencies
npm install

# Start development server (opens at http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| 3D Graphics | Three.js + React Three Fiber + Drei |
| Post-Processing | R3F Postprocessing (Bloom, Chromatic Aberration, Vignette) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Email | EmailJS |

## 📁 Project Structure

```
src/
├── App.jsx              # Main app — all sections live here
├── main.jsx             # Entry point
├── components/
│   ├── Nav.jsx          # Sticky navigation
│   ├── ContactForm.jsx  # Contact form with EmailJS
│   └── Footer.jsx       # Footer with social links
└── styles/
    └── global.css       # Global styles + Tailwind

public/
├── certs/               # PDF certificates (8 files)
└── fonts/               # 3D text fonts
```

## 🎨 Sections

1. **Hero** — Matrix rain 3D effect, terminal loading sequence, interactive mouse tracking
2. **About** — Terminal-style profile card with bio and achievements
3. **Systems** — 4 clickable cards (ANOM Shield, AI Knowledge Graph, Automation Core, Red Team Engine)
4. **Skills** — Animated skill bars across Offensive Security, Defensive Security, Development, Tools
5. **Certifications** — Gallery of 8 certificates with PDF links
6. **Contact** — EmailJS-powered contact form + social links

## ⚙️ Configuration

### EmailJS (Contact Form)

The contact form requires EmailJS credentials. Update `src/components/ContactForm.jsx`:

```js
emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  formData,
  'YOUR_PUBLIC_KEY'
)
```

Sign up at [emailjs.com](https://www.emailjs.com/) to get these values.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the dist/ folder
```

## 📄 License

MIT License.
