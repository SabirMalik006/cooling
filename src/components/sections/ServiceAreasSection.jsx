import { useEffect, useRef } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { gsap, EASE } from '../../animations/gsap';
import useReveals from '../../animations/useReveals';
import useReducedMotion from '../../hooks/useReducedMotion';
import { siteConfig } from '../../data/siteConfig';
import { hq, communities, coverageNote } from '../../data/serviceAreas';
import { mapMeta, mapPaths } from '../../data/marylandMap';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const CONTEXT_STATES = [
  'pennsylvania',
  'virginia',
  'westVirginia',
  'delaware',
  'newJersey',
  'ohio',
  'districtOfColumbia',
];

const CONTEXT_LABELS = [
  { text: 'PA', x: 300, y: 40 },
  { text: 'VA', x: 340, y: 470 },
  { text: 'WV', x: 60, y: 300 },
  { text: 'DE', x: 775, y: 150 },
];

export default function ServiceAreasSection() {
  const rootRef = useRef(null);
  const mapRef = useRef(null);
  const reduced = useReducedMotion();

  useReveals(rootRef, { reduced, start: 'top 82%' });

  useEffect(() => {
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      const maryland = mapRef.current?.querySelector('[data-state="maryland"]');
      if (maryland) {
        const length = maryland.getTotalLength();
        gsap.set(maryland, { strokeDasharray: length, strokeDashoffset: length, fill: 'transparent' });
        gsap.to(maryland, {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: EASE,
          scrollTrigger: { trigger: mapRef.current, start: 'top 75%', once: true },
        });
        gsap.to(maryland, {
          fill: 'rgba(255,255,255,1)',
          duration: 1,
          delay: 1.2,
          scrollTrigger: { trigger: mapRef.current, start: 'top 75%', once: true },
        });
      }

      gsap.from('[data-context]', {
        opacity: 0,
        duration: 1,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: { trigger: mapRef.current, start: 'top 78%', once: true },
      });

      gsap.from('[data-point]', {
        opacity: 0,
        scale: 0.4,
        transformOrigin: '50% 50%',
        duration: 0.7,
        stagger: 0.1,
        ease: EASE,
        scrollTrigger: { trigger: mapRef.current, start: 'top 72%', once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  const marker = mapMeta.marker;
  const points = mapMeta.points;

  return (
    <section
      id="service-areas"
      ref={rootRef}
      aria-labelledby="areas-heading"
      className="relative overflow-hidden bg-iso-ice py-14 sm:py-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 50% at 100% 0%, rgba(7,133,214,0.08), transparent 60%), radial-gradient(45% 45% at 0% 100%, rgba(244,90,10,0.06), transparent 60%)',
        }}
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-navy/10" />

      <div className="shell relative">
        <SectionHeading
          as="h2"
          align="center"
          id="areas-heading"
          className="mx-auto max-w-3xl"
          eyebrow="States & Service Areas"
          lines={['Rooted in Millersville,', 'Ready for Maryland.']}
          lead={coverageNote}
        />

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-12 lg:items-center lg:gap-8 xl:gap-10">
          <div className="flex flex-col lg:col-span-5">
            <address className="fade-up not-italic">
              <div className="flex items-start gap-3.5 border border-navy/10 bg-white p-4 shadow-[0_20px_40px_-34px_rgba(20,44,86,0.45)] sm:p-5">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-iso-orange/25 bg-iso-soft-white text-iso-orange">
                  <MapPin className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-[0.58rem] font-semibold uppercase tracking-wide2 text-navy/50">
                    {hq.label}
                  </p>
                  <p className="mt-1.5 font-display text-[1.05rem] font-bold leading-snug text-navy sm:text-[1.1rem]">
                    {siteConfig.address.line1}
                    <br />
                    {siteConfig.address.line2}
                  </p>
                  <p className="mt-1 text-[0.84rem] text-iso-charcoal/70">{siteConfig.address.country}</p>
                </div>
              </div>
            </address>

            <div className="fade-up mt-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-px w-6 bg-iso-orange" aria-hidden="true" />
                  <h3 className="font-display text-[0.62rem] font-semibold uppercase tracking-wide2 text-navy/60">
                    Communities near our base
                  </h3>
                </div>
                <span className="text-[0.6rem] uppercase tracking-[0.14em] text-iso-charcoal/45">
                  {communities.length} listed
                </span>
              </div>

              <ul className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                {communities.map((community) => (
                  <li key={community.name}>
                    <span
                      className={`inline-flex items-center gap-1.5 border px-2.5 py-1.5 text-[0.74rem] transition sm:px-3 sm:text-[0.76rem] ${
                        community.status === 'hq'
                          ? 'border-iso-orange bg-iso-orange text-white shadow-[0_10px_24px_-18px_rgba(244,90,10,0.9)]'
                          : 'border-navy/12 bg-white/90 text-iso-charcoal/80 hover:border-navy/25'
                      }`}
                    >
                      {community.name}
                      {community.status === 'hq' && (
                        <span className="rounded-sm bg-white/20 px-1.5 py-0.5 font-display text-[0.5rem] font-semibold uppercase tracking-[0.14em]">
                          HQ
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-3 flex items-start gap-2 text-[0.74rem] leading-relaxed text-iso-charcoal/60">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full border border-navy/35" aria-hidden="true" />
                Unmarked communities are listed for confirmation — coverage is confirmed request by
                request.
              </p>
            </div>

            <div className="fade-up mt-5 flex flex-wrap items-center gap-3">
              <Button href="/contact-us" variant="primary">
                Schedule your service
              </Button>
              <span className="text-[0.66rem] uppercase tracking-[0.14em] text-navy/45">
                ZIP confirmed per request
              </span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              ref={mapRef}
              className="fade-up relative overflow-hidden border border-navy/10 bg-white p-2.5 shadow-[0_26px_60px_-44px_rgba(20,44,86,0.7)] sm:p-4"
            >
              <div className="mb-2 flex items-center justify-between gap-3 border-b border-navy/10 pb-2.5">
                <span className="font-display text-[0.58rem] font-semibold uppercase tracking-wide2 text-navy/55">
                  {siteConfig.address.state} · {siteConfig.address.stateAbbr}
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-navy/10 bg-iso-soft-white px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.14em] text-iso-charcoal/60">
                  <Navigation className="h-3 w-3 text-iso-blue" aria-hidden="true" />
                  {hq.city}
                </span>
              </div>

              <div className="rounded-sm bg-iso-soft-white/40 p-1 sm:p-2">
                <svg
                  viewBox={`0 0 ${mapMeta.viewWidth} ${mapMeta.viewHeight}`}
                  role="img"
                  aria-label={`Map of Maryland with the ISO Mechanical headquarters marked in ${hq.city}`}
                  className="mx-auto h-auto w-full max-h-[22rem] sm:max-h-[26rem] lg:max-h-[24rem] xl:max-h-[27rem]"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <pattern id="area-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M30 0H0V30" fill="none" stroke="#142C56" strokeOpacity="0.05" strokeWidth="1" />
                    </pattern>
                    <radialGradient id="marker-glow">
                      <stop offset="0%" stopColor="#F45A0A" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#F45A0A" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <rect width={mapMeta.viewWidth} height={mapMeta.viewHeight} fill="url(#area-grid)" />

                  {CONTEXT_STATES.map((key) =>
                    mapPaths[key] ? (
                      <path
                        key={key}
                        data-context
                        d={mapPaths[key]}
                        fill="#D9E4EE"
                        fillOpacity="0.55"
                        stroke="#142C56"
                        strokeOpacity="0.16"
                        strokeWidth="1"
                      />
                    ) : null,
                  )}

                  <path
                    data-state="maryland"
                    d={mapPaths.maryland}
                    fill="#FFFFFF"
                    stroke="#142C56"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />

                  {CONTEXT_LABELS.map((label) => (
                    <text
                      key={label.text}
                      x={label.x}
                      y={label.y}
                      fill="#142C56"
                      fillOpacity="0.32"
                      fontSize="15"
                      fontWeight="700"
                      letterSpacing="3"
                    >
                      {label.text}
                    </text>
                  ))}

                  {Object.entries(points).map(([key, point]) => {
                    if (point.primary) return null;
                    return (
                      <g data-point key={key}>
                        <circle cx={point.x} cy={point.y} r="4" fill="#142C56" fillOpacity="0.5" />
                        <text
                          x={point.x + 10}
                          y={point.y + 4}
                          fill="#142C56"
                          fillOpacity="0.58"
                          fontSize="13"
                          fontWeight="600"
                        >
                          {point.label}
                        </text>
                      </g>
                    );
                  })}

                  <g data-point>
                    <circle cx={marker.x} cy={marker.y} r="34" fill="url(#marker-glow)" />
                    <circle
                      cx={marker.x}
                      cy={marker.y}
                      r="14"
                      fill="none"
                      stroke="#F45A0A"
                      strokeWidth="2"
                      className={reduced ? '' : 'animate-ping-slow'}
                      style={{ transformOrigin: `${marker.x}px ${marker.y}px` }}
                    />
                    <circle cx={marker.x} cy={marker.y} r="6.5" fill="#F45A0A" />
                    <path
                      d={`M${marker.x - 44} ${marker.y}h22M${marker.x + 22} ${marker.y}h22M${marker.x} ${
                        marker.y - 44
                      }v22M${marker.x} ${marker.y + 22}v22`}
                      stroke="#F45A0A"
                      strokeOpacity="0.5"
                      strokeWidth="1.5"
                    />
                    <text
                      x={marker.x + 52}
                      y={marker.y - 6}
                      fill="#142C56"
                      fontSize="17"
                      fontWeight="800"
                      letterSpacing="0.5"
                    >
                      {points.millersville.label}
                    </text>
                    <text
                      x={marker.x + 52}
                      y={marker.y + 13}
                      fill="#142C56"
                      fillOpacity="0.55"
                      fontSize="12"
                      fontWeight="600"
                      letterSpacing="1.6"
                    >
                      HEADQUARTERS
                    </text>
                  </g>
                </svg>
              </div>

              <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-navy/10 pt-2.5 text-[0.62rem] uppercase tracking-[0.14em] text-iso-charcoal/55">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-iso-orange" aria-hidden="true" />
                  Headquarters
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-navy/45" aria-hidden="true" />
                  Nearby reference cities
                </span>
                <span className="hidden sm:inline text-iso-charcoal/40">Boundary data: us-atlas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
