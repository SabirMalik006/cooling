import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { activeServices } from '../../data/services';
import { communities, hq } from '../../data/serviceAreas';
import useReveals from '../../animations/useReveals';
import useReducedMotion from '../../hooks/useReducedMotion';
import logo from '../../assets/iso-mechanical-logo.jpg';

const year = new Date().getFullYear();

function ColumnHeading({ children }) {
  return (
    <h3 className="mb-5 font-display text-[0.6rem] font-semibold uppercase tracking-wide2 text-iso-blue">
      {children}
    </h3>
  );
}

export default function Footer() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useReveals(rootRef, { reduced, start: 'top 92%' });

  return (
    <footer
      ref={rootRef}
      className="relative isolate overflow-hidden bg-navy-deep pt-4 text-white sm:pt-6"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(55% 55% at 85% 10%, rgba(7,133,214,0.16), transparent 65%), radial-gradient(45% 45% at 5% 95%, rgba(244,90,10,0.12), transparent 70%)',
        }}
      />

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 -z-10 h-[30rem] w-[30rem] text-white/[0.07]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="198" stroke="currentColor" />
        <circle cx="200" cy="200" r="150" stroke="currentColor" />
        <circle cx="200" cy="200" r="102" stroke="currentColor" strokeDasharray="4 8" />
        <circle cx="200" cy="200" r="54" stroke="currentColor" />
      </svg>

      <div className="shell relative">
        {/* link grid */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <span className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden bg-white ring-1 ring-white/20">
                <img
                  src={logo}
                  alt="ISO Mechanical — Heating & Cooling Services"
                  className="h-full w-full object-contain"
                  width={96}
                  height={96}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-display text-[1.15rem] font-extrabold uppercase tracking-[0.05em] text-white">
                  ISO Mechanical
                </span>
                <span className="mt-1.5 font-display text-[0.55rem] font-semibold uppercase tracking-wide2 text-white/55">
                  {siteConfig.tagline}
                </span>
              </span>
            </div>

            <p className="mt-6 max-w-[36ch] text-[0.9rem] leading-relaxed text-white/55">
              Heating and cooling services for homes and light commercial spaces, planned with
              precision and delivered with care.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="border border-iso-orange/50 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.16em] text-iso-orange">
                Heating
              </span>
              <span className="border border-iso-blue/50 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.16em] text-iso-blue">
                Cooling
              </span>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="lg:col-span-2">
            <ColumnHeading>Explore</ColumnHeading>
            <ul className="flex flex-col gap-3">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="link-underline text-[0.9rem] text-white/65 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="HVAC services" className="lg:col-span-3">
            <ColumnHeading>Services</ColumnHeading>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {activeServices.slice(0, 8).map((service) => (
                <li key={service.id}>
                  <Link
                    to="/#services"
                    className="link-underline text-[0.9rem] text-white/65 transition hover:text-white"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/#services"
              className="mt-4 inline-block font-display text-[0.62rem] font-bold uppercase tracking-[0.16em] text-iso-orange"
            >
              All {activeServices.length} services
            </Link>
          </nav>

          <nav aria-label="Service areas" className="lg:col-span-3">
            <ColumnHeading>Service Areas</ColumnHeading>
            <ul className="flex flex-col gap-3">
              <li>
                <span className="text-[0.9rem] font-semibold text-white">
                  {hq.city}, {hq.stateAbbr}
                </span>
              </li>
              {communities
                .filter((community) => community.name !== hq.city)
                .slice(0, 6)
                .map((community) => (
                  <li key={community.name}>
                    <Link
                      to="/#service-areas"
                      className="link-underline text-[0.9rem] text-white/65 transition hover:text-white"
                    >
                      {community.name}
                    </Link>
                  </li>
                ))}
            </ul>
            <Link
              to="/#service-areas"
              className="mt-4 inline-block font-display text-[0.62rem] font-bold uppercase tracking-[0.16em] text-iso-blue"
            >
              Coverage details
            </Link>
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/12 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] text-white/45">
            © {year} {siteConfig.fullName}. All rights reserved.
          </p>
          <p className="text-[0.75rem] text-white/35">
            {siteConfig.address.line1}, {siteConfig.address.line2}
          </p>
        </div>
      </div>
    </footer>
  );
}
