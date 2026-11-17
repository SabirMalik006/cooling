import { useRef } from 'react';
import { MapPin, Phone } from 'lucide-react';

import useReveals from '../../animations/useReveals';
import useReducedMotion from '../../hooks/useReducedMotion';
import { siteConfig } from '../../data/siteConfig';
import {
  coverageLead,
  coverageRegions,
  serviceAreaCount,
  serviceAreasSorted,
} from '../../data/serviceAreas';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const STATS = [
  { value: `${serviceAreaCount}+`, label: 'Communities covered' },
  { value: `${coverageRegions.length}`, label: 'Regions served' },
  { value: '1', label: 'Local Millersville base' },
];

export default function ServiceCoverageSection() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const phoneHref = siteConfig.phone ? `tel:${siteConfig.phone.replace(/[^\d+]/g, '')}` : null;

  useReveals(rootRef, { reduced, start: 'top 82%' });

  return (
    <section
      id="coverage"
      ref={rootRef}
      aria-labelledby="coverage-heading"
      className="relative isolate overflow-hidden bg-navy-deep py-16 text-white sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(70% 90% at 0% 0%, rgba(7,133,214,0.22), transparent 55%), radial-gradient(60% 80% at 100% 100%, rgba(244,90,10,0.22), transparent 55%), linear-gradient(160deg, #08172f 0%, #102446 55%, #0c1c3a 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              as="h2"
              align="left"
              tone="light"
              id="coverage-heading"
              eyebrow="Service Coverage"
              lines={[`${serviceAreaCount}+ communities.`, 'One local team.']}
              lead={coverageLead}
            />
          </div>

          <div className="fade-up lg:col-span-5">
            <dl className="grid grid-cols-3 divide-x divide-white/10 border-y border-white/10">
              {STATS.map((stat) => (
                <div key={stat.label} className="px-3 py-5 first:pl-0 last:pr-0 sm:px-5">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-[clamp(1.4rem,3vw,2rem)] font-extrabold leading-none tracking-tight text-white">
                      {stat.value}
                    </span>
                    <span className="mt-2 block text-[0.6rem] uppercase leading-snug tracking-[0.16em] text-white/55">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="fade-up lg:col-span-5">
            <p className="font-display text-[0.6rem] font-semibold uppercase tracking-wide2 text-iso-blue">
              Where we work
            </p>

            <ul className="mt-5 border-t border-white/10">
              {coverageRegions.map((region, index) => (
                <li key={region.label} className="group border-b border-white/10 py-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-iso-orange transition group-hover:scale-150"
                      />
                      <span className="font-display text-[1rem] font-semibold text-white">
                        {region.label}
                      </span>
                    </span>
                    <span className="font-display text-[0.6rem] font-semibold tracking-[0.16em] text-white/30">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mt-1.5 pl-[1.125rem] text-[0.78rem] leading-relaxed text-white/55">
                    {region.note}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={siteConfig.cta.primary.href} variant="primary">
                {siteConfig.cta.primary.label}
              </Button>
              {phoneHref && (
                <a
                  href={phoneHref}
                  className="inline-flex items-center gap-2.5 border border-white/20 px-4 py-3 font-display text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/85 transition hover:border-white/50 hover:text-white"
                >
                  <Phone className="h-4 w-4 text-iso-orange" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
              )}
            </div>
          </div>

          <div className="fade-up lg:col-span-7">
            <div className="relative overflow-hidden border border-white/12 bg-white/[0.05] backdrop-blur-sm">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-iso-orange via-iso-orange/40 to-transparent"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
                <p className="font-display text-[0.6rem] font-semibold uppercase tracking-wide2 text-white/70">
                  All communities
                </p>
                <span className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-2.5 py-1 font-display text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-white/60">
                  <MapPin className="h-3 w-3 text-iso-orange" aria-hidden="true" />
                  {serviceAreaCount} listed
                </span>
              </div>

              <div className="area-scroll max-h-[20rem] overflow-y-auto px-5 py-4 sm:max-h-[24rem]">
                <ul className="grid grid-cols-2 gap-x-5 sm:grid-cols-3">
                  {serviceAreasSorted.map((area) => (
                    <li
                      key={area}
                      className="group flex items-center gap-2.5 border-b border-white/[0.06] py-1.5 text-[0.88rem] leading-snug text-white/70 transition-colors duration-200 hover:text-white"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/25 transition-colors duration-200 group-hover:bg-iso-orange"
                      />
                      <span className="truncate">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-3.5">
                <p className="text-[0.72rem] leading-relaxed text-white/50">
                  Don&apos;t see your town? Coverage is confirmed per request.
                </p>
                <a
                  href={siteConfig.cta.primary.href}
                  className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-iso-orange transition hover:text-white"
                >
                  Send your ZIP →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
