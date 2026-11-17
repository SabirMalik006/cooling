import { useRef } from 'react';
import { ArrowUpRight, CalendarCheck, ClipboardList, Clock3, Phone, ShieldCheck } from 'lucide-react';

import useReveals from '../animations/useReveals';
import useReducedMotion from '../hooks/useReducedMotion';
import ServiceRequestForm from '../components/layout/ServiceRequestForm';
import ServiceAreasMarquee from '../components/sections/ServiceAreasMarquee';
import LocationSection from '../components/sections/LocationSection';
import ContactCoverageSection from '../components/sections/ContactCoverageSection';
import { siteConfig } from '../data/siteConfig';

const HIGHLIGHTS = [
  {
    icon: ClipboardList,
    title: 'Clear request',
    body: 'Share the service, your ZIP, and a few details so we can route it correctly.',
  },
  {
    icon: CalendarCheck,
    title: 'Right scheduling',
    body: 'We confirm scope and timing with you before anything is locked in.',
  },
  {
    icon: ShieldCheck,
    title: 'Comfort-first approach',
    body: 'Recommendations focused on reliable heating, cooling, and year-round performance.',
  },
];

export default function ContactUsPage() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const phoneHref = siteConfig.phone ? `tel:${siteConfig.phone.replace(/[^\d+]/g, '')}` : null;

  useReveals(rootRef, { reduced, start: 'top 88%' });

  return (
    <div ref={rootRef}>
      <section
        aria-labelledby="contact-heading"
        className="relative isolate overflow-hidden bg-navy-deep text-white"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(80% 100% at 5% 15%, rgba(244,90,10,0.28), transparent 55%), radial-gradient(60% 80% at 100% 10%, rgba(7,133,214,0.28), transparent 55%), radial-gradient(50% 60% at 70% 90%, rgba(7,133,214,0.12), transparent 60%), linear-gradient(160deg, #08172f 0%, #102446 45%, #142c56 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 top-1/2 -z-10 h-[32rem] w-[32rem] -translate-y-1/2 text-white/[0.06]"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="200" cy="200" r="198" stroke="currentColor" />
          <circle cx="200" cy="200" r="150" stroke="currentColor" />
          <circle cx="200" cy="200" r="102" stroke="currentColor" strokeDasharray="4 10" />
          <circle cx="200" cy="200" r="54" stroke="currentColor" />
        </svg>

        <div className="shell relative pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="eyebrow fade-up mb-6 inline-flex items-center gap-3 border border-white/20 bg-white/10 px-4 py-2 text-white/90 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm">
                <span aria-hidden="true" className="h-px w-7 bg-iso-orange" />
                Schedule a Service
              </div>

              <h1
                id="contact-heading"
                className="max-w-[15ch] text-[clamp(2.15rem,5.2vw,3.75rem)] font-extrabold leading-[1.04] tracking-mega text-white drop-shadow-[0_6px_24px_rgba(8,23,47,0.55)]"
              >
                <span className="reveal-line block">
                  <span className="text-white">Book service,</span>
                </span>
                <span className="reveal-line mt-1 block">
                  <span className="text-iso-orange drop-shadow-[0_2px_12px_rgba(244,90,10,0.35)]">
                    on your time.
                  </span>
                </span>
              </h1>

              <p className="fade-up mt-6 max-w-[52ch] text-[1rem] leading-[1.75] text-white/85 drop-shadow-[0_2px_10px_rgba(8,23,47,0.45)] sm:text-[1.06rem]">
                Tell us what your space needs and choose the service that fits. We review every
                request and come back with clear next steps — no autoresponders, no guesswork.
              </p>

              <div
                aria-hidden="true"
                className="fade-up mt-9 h-px w-full max-w-[30rem] bg-gradient-to-r from-white/25 via-white/10 to-transparent"
              />

              <div className="fade-up mt-7 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                {phoneHref && siteConfig.phone && (
                  <a
                    href={phoneHref}
                    aria-label={`Call ${siteConfig.name} at ${siteConfig.phone}`}
                    className="group relative inline-flex shrink-0 items-center gap-3.5 overflow-hidden rounded-full border border-white/20 bg-gradient-to-br from-[#FF7518] via-iso-orange to-[#D0490A] py-2 pl-2 pr-6 shadow-[0_20px_45px_-20px_rgba(244,90,10,0.85),inset_0_1px_0_0_rgba(255,255,255,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_55px_-20px_rgba(244,90,10,0.95),inset_0_1px_0_0_rgba(255,255,255,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-y-10 -left-1/3 w-1/3 rotate-12 bg-white/25 blur-lg transition-transform duration-700 ease-out group-hover:translate-x-[520%]"
                    />

                    <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15 ring-1 ring-white/35 backdrop-blur-sm transition duration-300 group-hover:bg-white/25">
                      <Phone className="h-[1.05rem] w-[1.05rem] text-white" aria-hidden="true" />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full ring-1 ring-white/40 transition duration-500 group-hover:scale-110 group-hover:opacity-0"
                      />
                    </span>

                    <span className="relative flex flex-col items-start leading-none">
                      <span className="text-[0.52rem] font-semibold uppercase tracking-[0.26em] text-white/80">
                        Call now
                      </span>
                      <span className="mt-1.5 font-display text-[1.02rem] font-bold tabular-nums tracking-[0.04em] text-white">
                        {siteConfig.phone}
                      </span>
                    </span>

                    <ArrowUpRight
                      className="relative ml-0.5 h-4 w-4 text-white/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                      aria-hidden="true"
                    />
                  </a>
                )}

                <ul className="flex flex-col gap-2.5 text-[0.72rem] uppercase tracking-[0.16em] text-white/75 sm:items-start">
                  <li className="inline-flex items-center gap-2.5">
                    <Clock3 className="h-4 w-4 shrink-0 text-iso-blue" aria-hidden="true" />
                    Straightforward follow-up
                  </li>
                  <li className="inline-flex items-center gap-2.5">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-iso-orange" aria-hidden="true" />
                    Heating &amp; cooling
                  </li>
                </ul>
              </div>
            </div>

            <div className="fade-up lg:col-span-5">
              <div className="relative overflow-hidden rounded-sm border border-white/15 bg-white/[0.08] shadow-[0_30px_80px_-45px_rgba(0,0,0,0.7)] backdrop-blur-md">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px]"
                  style={{ background: 'linear-gradient(90deg, #F45A0A, #0785D6)' }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-iso-blue/20 blur-2xl"
                />

                <div className="relative flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-7">
                  <p className="font-display text-[0.6rem] font-semibold uppercase tracking-wide2 text-iso-blue">
                    How it works
                  </p>
                  <span className="border border-white/15 bg-white/5 px-2.5 py-1 font-display text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-white/60">
                    3 steps
                  </span>
                </div>

                <ol className="relative px-6 py-6 sm:px-7">
                  <span
                    aria-hidden="true"
                    className="absolute bottom-12 left-[2.75rem] top-12 w-px bg-gradient-to-b from-iso-orange/50 via-white/20 to-transparent sm:left-[3rem]"
                  />
                  {HIGHLIGHTS.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <li
                        key={item.title}
                        className={`relative flex gap-4 ${index > 0 ? 'mt-6 border-t border-white/[0.07] pt-6' : ''}`}
                      >
                        <span className="relative z-10 mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-navy-deep text-iso-orange shadow-[0_0_0_4px_rgba(8,23,47,0.55)]">
                          <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <div className="pt-0.5">
                          <p className="font-display text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-white/50">
                            Step {String(index + 1).padStart(2, '0')}
                          </p>
                          <h2 className="mt-1 text-[1rem] font-semibold leading-snug text-white">
                            {item.title}
                          </h2>
                          <p className="mt-1.5 text-[0.86rem] leading-[1.65] text-white/[0.72]">
                            {item.body}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceAreasMarquee />

      <ContactCoverageSection />

      <LocationSection />

      <section
        id="request-service"
        aria-label="Service request"
        className="relative overflow-hidden bg-iso-soft-white py-10 sm:py-12 lg:py-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{
            background:
              'linear-gradient(180deg, rgba(20,44,86,0.06) 0%, rgba(20,44,86,0) 100%)',
          }}
        />
        <div className="shell relative">
          <ServiceRequestForm />
        </div>
      </section>
    </div>
  );
}
