# UNOPS Starter

A minimal, cloneable Next.js starter repository for UN/UNOPS projects. Pre-configured with a UN-ready theme, global layout shell, and registry-ready component system.

**Not a product, not a framework**—just a clean base to build upon.

---

## What's Inside

- **Next.js 15+** with App Router and TypeScript
- **UN/UNOPS-ready theme** with CSS variables + Tailwind tokens
- **Global layout shell** (Header, Container, Footer)
- **Clean architecture** under `/src` with organized folders
- **shadcn CLI compatible** for installing components from registry
- **Vercel-ready** (serverless-friendly, zero special config)

---

## Quick Start

### Prerequisites

- Node.js 18+ (or use pnpm directly)
- pnpm (recommended) or npm/yarn

### Setup

```bash
# Clone this repo or use it as a template
git clone https://github.com/un-org/unops-starter.git my-project
cd my-project

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## Theme & Customization

### CSS Variables

The UN/UNOPS theme is built on CSS variables defined in **src/styles/tokens.css**.

Current palette:
- **Primary:** UN Blue (`#1E5BA8`)
- **Secondary:** Lighter blue
- **Accent:** Warm orange
- **Neutrals:** Clean grays for text and backgrounds
- **Dark mode:** Full support via `.dark` class

### Customizing Colors

Edit `src/styles/tokens.css`:

```css
:root {
  --primary: 213 94% 45%; /* Change primary color */
  --accent: 30 100% 50%;   /* Change accent color */
  /* ... other tokens */
}
```

Values use `hsl()` format (Hue Saturation Lightness) for easy tweaking.

### Typography

Global typography rules are in **src/styles/typography.css**. Includes:
- System font stack (system-ui, -apple-system, sans-serif)
- Heading and body text styles
- Code styling

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with Header, Footer
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Layout components
│   │   ├── site-header.tsx
│   │   ├── site-footer.tsx
│   │   └── container.tsx
│   └── ui/                # UI primitives (from registry)
├── config/
│   └── site.ts            # Site metadata and config
├── lib/
│   └── utils.ts           # Utility functions (cn() helper)
├── styles/
│   ├── tokens.css         # CSS variables (theme)
│   └── typography.css     # Typography rules
└── types/
    └── index.ts           # Shared TypeScript types
```

---

## Adding Components from Registry

### Step 1: Initialize shadcn (first time only)

If you haven't already, set up the shadcn CLI:

```bash
pnpm dlx shadcn@latest init
```

(The tool will ask a few questions; defaults are fine for this project.)

### Step 2: Browse Components

Visit **registry-unops.vercel.app** to explore available components and blocks.

### Step 3: Install a Component

```bash
pnpm dlx shadcn@latest add <registry-item-url>
```

**Example:**

```bash
pnpm dlx shadcn@latest add https://registry-unops.vercel.app/r/button
```

Components are installed to `src/components/ui/` and automatically respect your UN/UNOPS theme.

---

## Deployment

### Vercel (Recommended)

```bash
# 1. Push to GitHub
git push origin main

# 2. Go to https://vercel.com and connect your repo
# 3. Deploy with one click (no special config needed)
```

### Other Platforms

- **Docker:** Add a `Dockerfile` if needed
- **Node.js:** Works on any Node.js 18+ server
- **Static export:** Modify `next.config.ts` if needed (not the default)

---

## Development Guidelines

### Code Style

- Use TypeScript (strict mode enabled)
- Keep components small and focused
- Use `src/lib/utils.ts` for the `cn()` helper (Tailwind + clsx)
- No unnecessary dependencies

### Linting

```bash
pnpm lint
```

---

## File Naming

- Components: PascalCase (`Button.tsx`, `SiteHeader.tsx`)
- Utilities: camelCase (`utils.ts`)
- Types: use `.ts` or `.tsx` files in `src/types/`

---

## Environment Variables

Copy `.env.example` to `.env.local` and add your secrets:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add values (never commit this file).

---

## FAQs

### Can I use this with npm/yarn?

Yes! All commands work with `npm` or `yarn`. Just replace `pnpm` with your package manager.

### How do I add a custom font?

1. Use Next.js built-in font support or import from a CDN
2. Update `src/styles/typography.css`
3. Modify `tailwind.config.ts` if using a custom font family

### How do I change the site name/description?

Edit `src/config/site.ts`:

```typescript
export const siteConfig: SiteConfig = {
  name: "My Project",
  description: "My custom description",
  // ...
};
```

### Can I use a database?

Yes, but this starter doesn't include one. Add Prisma, Drizzle, or your choice of ORM. This starter is intentionally minimal.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + CSS variables
- **Build:** React Compiler enabled
- **Package Manager:** pnpm (but npm/yarn work too)

---

## License

MIT © 2024 United Nations. See [LICENSE](LICENSE) for details.

---

## Support & Community

- **Registry:** registry-unops.vercel.app
- **GitHub Issues:** Report bugs or request features
- **Discussions:** Ask questions

---

## Contributing

Contributions welcome! Please follow the existing code style and open a PR.

---

**Built with ❤️ for UN/UNOPS projects.**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
