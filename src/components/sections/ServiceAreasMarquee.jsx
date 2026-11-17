import { useRef } from 'react';

import useReveals from '../../animations/useReveals';
import useReducedMotion from '../../hooks/useReducedMotion';
import { serviceAreaCount, serviceAreasSorted } from '../../data/serviceAreas';

const ROW_ONE = serviceAreasSorted.filter((_, index) => index % 2 === 0);
const ROW_TWO = serviceAreasSorted.filter((_, index) => index % 2 === 1);

function AreaTicker({ areas, duration, reverse = false }) {
  const reduced = useReducedMotion();

  return (
    <div
      className={`marquee ${reverse ? 'marquee--reverse' : ''} ${reduced ? 'marquee-static' : ''}`}
      style={{ '--marquee-duration': duration }}
    >
      <div className="marquee__track items-center">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className={`flex shrink-0 items-center ${reduced ? 'flex-wrap' : ''}`}
            aria-hidden={copy === 1}
          >
            {areas.map((area) => (
              <span key={`${copy}-${area}`} className="flex shrink-0 items-center">
                <span className="whitespace-nowrap px-3 font-display text-[1.08rem] font-semibold tracking-[-0.01em] text-navy transition-colors duration-300 hover:text-iso-orange sm:px-4 sm:text-[1.38rem]">
                  {area}
                </span>
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-iso-orange/70"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServiceAreasMarquee() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useReveals(rootRef, { reduced, start: 'top 92%' });

  return (
    <section
      ref={rootRef}
      aria-labelledby="contact-areas-heading"
      className="relative overflow-hidden border-b border-navy/10 bg-white py-12 sm:py-14 lg:py-16"
    >
      <div className="shell">
        <div className="grid gap-7 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="fade-up lg:col-span-7">
            <div className="eyebrow text-iso-orange">
              <span aria-hidden="true" className="h-px w-8 bg-iso-orange" />
              <span className="text-navy/60">Service areas</span>
            </div>
            <h2
              id="contact-areas-heading"
              className="mt-4 max-w-[30ch] font-display text-[clamp(1.45rem,3.1vw,2.25rem)] font-bold leading-[1.12] tracking-tight text-navy"
            >
              Serving{' '}
              <span className="relative inline-block text-iso-orange">
                {serviceAreaCount}+ communities
              </span>{' '}
              across Maryland, DC, Virginia, Delaware &amp; Pennsylvania.
            </h2>
          </div>

          <div className="fade-up lg:col-span-5 lg:justify-self-end">
            <div className="flex items-start gap-3 border-l-2 border-iso-orange/70 pl-4">
              <p className="max-w-[36ch] text-[0.86rem] leading-[1.7] text-iso-charcoal/70">
                Don&apos;t see your town? Send your ZIP with the request and we&apos;ll confirm
                coverage before anything is scheduled.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fade-up relative mt-10 sm:mt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-32"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-32"
        />

        <div className="border-y border-navy/10 bg-gradient-to-b from-white to-iso-soft-white/50 py-4">
          <AreaTicker areas={ROW_ONE} duration="480s" />
        </div>
        <div className="border-b border-navy/10 bg-gradient-to-b from-white to-iso-soft-white/50 py-4">
          <AreaTicker areas={ROW_TWO} duration="560s" reverse />
        </div>
      </div>
    </section>
  );
}
