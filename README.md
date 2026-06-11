# Meridian — Landing Page

A premium, dark, single-page marketing site for Meridian, built with **Astro + Tailwind CSS v4**, animated with **Framer Motion** (React islands), and deployed to **Vercel**.

Meridian is a **strategy marketplace**: users allocate capital to ranked, automated investment strategies (not to people / not copy-trading) and pay a 10% performance fee only on realized profits — 40% of which rewards the strategy's creator, 60% to Meridian.

The visual language (near-black background, warm gold accent `#c9a86a`, `Source Serif 4` headings, `Inter Tight` body, cool signal-blue glows) mirrors the Meridian product app so the landing page and product feel like one brand.

## Tech

- [Astro 5](https://astro.build) — static output, single `index.astro` page (no routing, no blog)
- [Tailwind CSS v4](https://tailwindcss.com) — via the `@tailwindcss/vite` plugin; brand tokens live in `src/styles/global.css`
- [Framer Motion](https://www.framer.com/motion/) — animations run inside React islands hydrated with `client:load` / `client:visible`
- [Lucide](https://lucide.dev) — feature icons
- [@astrojs/vercel](https://docs.astro.build/en/guides/integrations-guide/vercel/) — Vercel adapter

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
```

## Build

```bash
npm run build    # outputs to dist/ and .vercel/output/
npm run preview  # preview the production build locally
```

## Deploy (Vercel)

The project is preconfigured with the Vercel adapter. Either:

- **Git integration:** import the repo in Vercel — it auto-detects Astro. No extra config needed.
- **CLI:** `npx vercel` (or `npx vercel --prod`).

## Project structure

```
src/
  pages/index.astro        # the whole page; assembles sections + islands
  pages/privacy.astro      # Privacy Policy — template page (fill in content)
  pages/terms.astro        # Terms of Use — template page (fill in content)
  layouts/Layout.astro     # <head>, fonts, meta tags
  layouts/LegalLayout.astro # minimal header/footer wrapper for legal pages
  styles/global.css        # Tailwind import + brand tokens, glassmorphism, mesh, marquee
  components/
    Navbar.tsx             # sticky nav, blur-on-scroll, mobile menu (client:load)
    Hero.tsx               # staggered load-in + CSS product mock (client:load)
    ProblemCards.tsx       # competitor gap cards, scroll reveal
    Features.tsx           # 2x2 feature grid w/ Lucide icons (strategy-centric copy)
    HowItWorks.tsx         # 3-step flow w/ connector line
    PricingCards.tsx       # 0/10/40 fee cards, hover scale
    TallyPopup.astro       # Meridian-styled button that opens the Tally form in a popup
    Reveal.tsx             # reusable fade+slide-up-on-scroll wrapper
```

## Waitlist form

The waitlist section keeps Meridian's own gold "Join the waitlist" button (`TallyPopup.astro`) and opens a [Tally.so](https://tally.so) form in a popup overlay — Tally's officially-supported embed mode. The button carries `data-tally-open` + layout attributes, and Tally's `embed.js` binds them and handles the form's own session and submission. This keeps the site's styling intact while letting Tally own storage/notifications.

To point at a different form, change `FORM_ID` in `TallyPopup.astro` (currently `aQl4Wq`). To tweak the popup (size, slide-over vs modal, overlay), adjust the `data-tally-*` attributes on the button.

> **Form theming:** the popup's internal colors (input, button, background) are controlled in Tally's own form designer (Design settings), not from this site — pick a dark theme there so the popup matches.

## Images

**The page needs no external images — nothing to generate.** The hero "product glimpse" is a pure CSS/HTML mock (ranked leaderboard + a strategy insight panel for the selected strategy), and every other section uses text, Lucide icons, and CSS. If you later want a real product screenshot in the hero, it can be swapped in then; there are no `<img>` placeholders to fill in the meantime.

## Notes

- All animations honor `prefers-reduced-motion`.
- No analytics, cookie banners, or tracking are included.
