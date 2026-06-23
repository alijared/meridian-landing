import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#features", label: "Community" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
];

/**
 * Sticky navbar that gains a blurred translucent backdrop + border once the
 * user scrolls past the hero fold.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-rule bg-bg-blur backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <a href="#top" className="flex items-center gap-2 font-serif text-xl font-semibold text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" className="h-6 w-6">
            <circle cx="11" cy="11" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M1 11 L 21 11" stroke="currentColor" strokeWidth="1.6" />
            <path d="M5 6.5 Q 11 11 5 15.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
          </svg>
          Meridian
        </a>

        {/* desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#waitlist"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-2"
          >
            Join the waitlist
          </a>
        </div>

        {/* mobile menu button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink md:hidden"
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* mobile dropdown */}
      {open && (
        <div className="border-t border-rule bg-bg-blur px-6 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-2"
            >
              Join the waitlist
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
