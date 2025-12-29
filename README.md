# 🔐 Password Strength Analyzer

> **Real-time entropy visualization meets crack-time estimation—all in your browser, zero backend required.**

A blazing-fast, privacy-first password security tool built with React, TypeScript, and Tailwind CSS. Analyze password strength with live entropy charts, crack-time predictions across multiple attack models, and actionable security feedback—all computed client-side.

---

## ✨ Features

🎯 **Real-Time Password Analysis**
- Instant entropy calculation with visual progression chart
- Character composition detection (uppercase, lowercase, numbers, symbols)
- Pattern recognition for repeated characters and sequences
- Dictionary word detection against common password databases

⚡ **Crack-Time Estimation**
- Three attack model scenarios: Online, Offline, GPU-Assisted
- Dynamic time-to-crack calculations based on entropy
- Visual comparisons across different threat models

🎨 **Modern, Animated UI**
- Smooth fade-in/slide-up animations with staggered loading
- Responsive design from mobile to 4K displays
- Dark cybersecurity-themed aesthetic with glassmorphism effects
- Accessibility-first with `prefers-reduced-motion` support

🔒 **Privacy & Security**
- 100% client-side computation—no server, no network requests
- Zero data collection or storage
- Open-source and auditable

---

## 🚀 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | Component-based UI framework |
| **TypeScript** | Type-safe development |
| **Vite** | Lightning-fast build tool & HMR |
| **Tailwind CSS** | Utility-first styling |
| **Recharts** | Data visualization library |
| **Lucide React** | Beautiful icon system |

---

## 🎬 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A modern browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/password-analyzer.git
cd password-analyzer

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` and you're ready to analyze passwords! 🎉

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📦 Project Structure

```
password-analyzer/
├── src/
│   ├── App.tsx                 # Main component with analysis logic
│   ├── main.tsx               # Application entry point
│   ├── index.css              # Global styles & Tailwind directives
│   └── vite-env.d.ts          # Vite type declarations
├── public/                     # Static assets
├── index.html                 # HTML template
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite configuration
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 🛡️ Linting & Type Safety

This project uses **ESLint** with TypeScript-aware rules for bulletproof code quality.

### Default Configuration

The starter template includes basic ESLint rules. For production applications, we recommend enabling **type-aware linting**:

```js
// eslint.config.js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Enable type-checked rules
      tseslint.configs.recommendedTypeChecked,
      // Or use stricter rules
      tseslint.configs.strictTypeChecked,
      // Add stylistic rules
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

### React-Specific Linting (Recommended)

Supercharge your DX with React-focused lint rules:

```bash
npm install -D eslint-plugin-react-x eslint-plugin-react-dom
```

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  {
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
  },
])
```

---

## 🎨 Customization

### Change Colors

Edit the Tailwind config or use CSS variables:

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: '#22D3EE', // Cyan
      danger: '#EF4444',  // Red
    }
  }
}
```

### Modify Analysis Logic

All password analysis happens in `analyzePassword()` function:
- Add custom pattern detection
- Integrate with Have I Been Pwned API
- Adjust entropy calculations

### Add New Attack Models

Update `estimateCrackTime()` with additional threat scenarios:

```typescript
const guessRates = {
  online: 1000,
  offline: 1e9,
  gpu: 1e11,
  quantum: 1e15, // Your new model
};
```

---

## 🌟 Features Roadmap

- [ ] Password generation with customizable rules
- [ ] Breach detection via Have I Been Pwned API
- [ ] Export analysis reports as PDF
- [ ] Browser extension version
- [ ] Multi-language support

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 💡 Acknowledgments

- Built with [Vite](https://vitejs.dev/) ⚡
- Icons by [Lucide](https://lucide.dev/) 🎨
- Charts powered by [Recharts](https://recharts.org/) 📊
- Styled with [Tailwind CSS](https://tailwindcss.com/) 🎨

---

<div align="center">

**[⭐ Star this repo](https://github.com/yourusername/password-analyzer)** • **[🐛 Report Bug](https://github.com/yourusername/password-analyzer/issues)** • **[💡 Request Feature](https://github.com/yourusername/password-analyzer/issues)**

Made with ❤️ and ☕ by [Sahil Sangle](https://github.com/18sahhhilll)

</div>
