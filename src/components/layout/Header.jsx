import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Phone } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import logo from '../../assets/iso-mechanical-logo.jpg';
import Button from '../ui/Button';
import MobileNavigation from './MobileNavigation';

function useHomeSectionSpy(enabled) {
  const [active, setActive] = useState('');

  useEffect(() => {
    if (!enabled) return undefined;

    const sections = siteConfig.navigation
      .map((item) => item.href.startsWith('/#') ? document.querySelector(item.href.slice(1)) : null)
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.2, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const closeRef = useRef(null);
  const { pathname, hash } = useLocation();

  const isHome = pathname === '/';
  const spyActive = useHomeSectionSpy(isHome);
  const activeHref = hash ? `/${hash}` : isHome ? (spyActive ? `/#${spyActive}` : '/') : pathname;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 32);
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const overHero = !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] border-b transition-[background-color,box-shadow,border-color] duration-500 ${
          scrolled
            ? 'border-navy/10 bg-white/95 shadow-[0_10px_30px_-22px_rgba(20,44,86,0.65)] backdrop-blur-md'
            : 'border-white/12 bg-navy-ink/85 backdrop-blur-md'
        }`}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label={`${siteConfig.name} — home`}
          >
            <span
              className={`grid h-12 w-12 shrink-0 place-items-center overflow-hidden bg-white transition ring-1 ${
                overHero ? 'ring-white/30' : 'ring-navy/10'
              }`}
            >
              <img
                src={logo}
                alt="ISO Mechanical — Heating & Cooling Services"
                className="h-full w-full object-contain"
                width={48}
                height={48}
                loading="eager"
                decoding="async"
              />
            </span>
            <span className="hidden flex-col leading-none xs:flex">
              <span
                className={`font-display text-[0.95rem] font-extrabold uppercase tracking-[0.06em] ${
                  overHero ? 'text-white' : 'text-navy'
                }`}
              >
                ISO Mechanical
              </span>
              <span
                className={`mt-1 hidden whitespace-nowrap font-display text-[0.53rem] font-semibold uppercase tracking-wide2 sm:block ${
                  overHero ? 'text-white/60' : 'text-iso-charcoal/70'
                }`}
              >
                Heating &amp; Cooling Services
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
            {siteConfig.navigation.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  data-active={isActive}
                  aria-current={isActive ? 'page' : undefined}
                  className={`link-underline pb-1 font-display text-[0.72rem] font-semibold uppercase tracking-[0.13em] transition-colors duration-300 ${
                    overHero
                      ? isActive
                        ? 'text-white'
                        : 'text-white/80 hover:text-white'
                      : isActive
                        ? 'text-navy'
                        : 'text-navy/65 hover:text-navy'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {siteConfig.phone && (
              <a
                href={`tel:${siteConfig.phone.replace(/[^+\d]/g, '')}`}
                aria-label={`Call ${siteConfig.name} at ${siteConfig.phone}`}
                className={`group inline-flex items-center gap-2.5 border p-1.5 transition-colors duration-300 lg:py-1.5 lg:pl-1.5 lg:pr-3.5 ${
                  overHero
                    ? 'border-white/25 hover:border-white/50 hover:bg-white/10'
                    : 'border-navy/15 hover:border-navy/35 hover:bg-navy/[0.04]'
                }`}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-iso-orange text-white shadow-[0_6px_16px_-8px_rgba(244,90,10,0.9)] transition group-hover:bg-[#d44e06]">
                  <Phone className="h-[0.9rem] w-[0.9rem]" aria-hidden="true" />
                </span>
                <span className="hidden flex-col items-start leading-none lg:flex">
                  <span
                    className={`text-[0.5rem] font-semibold uppercase tracking-[0.22em] ${
                      overHero ? 'text-white/60' : 'text-iso-charcoal/60'
                    }`}
                  >
                    Call now
                  </span>
                  <span
                    className={`mt-1.5 font-display text-[0.76rem] font-bold tracking-[0.06em] ${
                      overHero ? 'text-white' : 'text-navy'
                    }`}
                  >
                    {siteConfig.phone}
                  </span>
                </span>
              </a>
            )}

            <Button href={siteConfig.cta.primary.href} variant="primary" className="hidden sm:inline-flex">
              {siteConfig.cta.primary.label}
            </Button>

            <button
              type="button"
              ref={closeRef}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className={`grid h-11 w-11 place-items-center border transition xl:hidden ${
                overHero
                  ? 'border-white/30 text-white hover:border-white/70'
                  : 'border-navy/20 text-navy hover:border-navy/60'
              }`}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="h-[2px] w-full bg-transparent" aria-hidden="true">
          <div
            className="h-full origin-left bg-gradient-to-r from-iso-orange via-iso-orange to-iso-blue transition-transform duration-200 ease-out"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </header>

      <MobileNavigation open={open} onClose={() => setOpen(false)} activeHref={activeHref} />
    </>
  );
}
