import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from '../../animations/gsap';
import useReveals from '../../animations/useReveals';
import useReducedMotion from '../../hooks/useReducedMotion';
import { activeServices } from '../../data/services';
import SectionHeading from '../ui/SectionHeading';
import ServiceWheel from '../ui/ServiceWheel';
import Button from '../ui/Button';
import heatPumpImage from '../../assets/img/heat-pump.jpg';
import radiatorImage from '../../assets/img/heating-radiator.jpg';
import roofImage from '../../assets/img/equipment-roof.jpg';
import airflowImage from '../../assets/img/airflow-fans.jpg';

const CATEGORY_IMAGES = {
  cooling: heatPumpImage,
  heating: radiatorImage,
  systems: roofImage,
  airflow: airflowImage,
};

const CATEGORY_ALT = {
  cooling: 'Outdoor air conditioning condenser unit',
  heating: 'Radiator valve adjusted for heating comfort',
  systems: 'Rooftop HVAC equipment on a commercial building',
  airflow: 'Ventilation fans moving air through a system',
};

const TONE_STYLE = {
  cooling: { label: 'Cooling', className: 'text-iso-blue border-iso-blue/40' },
  heating: { label: 'Heating', className: 'text-iso-orange border-iso-orange/40' },
  systems: { label: 'Systems', className: 'text-white/80 border-white/30' },
};

export default function ServicesWheelSection() {
  const rootRef = useRef(null);
  const wheelRef = useRef(null);
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const services = activeServices;
  const active = services[activeIndex] || services[0];
  const tone = TONE_STYLE[active.tone] || TONE_STYLE.systems;

  useReveals(rootRef, { reduced, start: 'top 80%' });

  useEffect(() => {
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wheelRef.current,
        { '--rot': '-32deg' },
        {
          '--rot': '168deg',
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  const go = (nextIndex) => {
    const total = services.length;
    setActiveIndex((nextIndex + total) % total);
  };

  return (
    <section
      id="services"
      ref={rootRef}
      aria-labelledby="services-heading"
      className="relative isolate overflow-hidden bg-navy py-12 text-white sm:py-14 lg:py-16"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 60% at 15% 10%, rgba(7,133,214,0.16), transparent 60%), radial-gradient(55% 55% at 85% 90%, rgba(244,90,10,0.14), transparent 62%)',
        }}
      />

      <div className="shell">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            as="h2"
            align="center"
            id="services-heading"
            tone="light"
            eyebrow="Services"
            lines={['Every Service,', 'One Precise Dial.']}
            lead="Turn the dial. Each marker opens a service category — select one to read what it involves."
          />
          <p className="fade-up mx-auto mt-2 max-w-[52ch] text-center text-[0.76rem] leading-relaxed text-white/45">
            Service categories are editable and are being confirmed with the business before launch.
          </p>

          <div className="fade-up mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-2 border border-white/12 bg-white/[0.04] px-3 py-1.5 font-display text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/75">
              <span className="text-iso-orange">{services.length}</span>
              <span className="text-white/55">Service categories</span>
            </span>
            <span aria-hidden="true" className="hidden h-px w-8 bg-white/15 sm:block" />
            <span className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.14em] text-white/55">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-iso-blue shadow-[0_0_0_3px_rgba(7,133,214,0.18)]" />
              Cooling
            </span>
            <span className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.14em] text-white/55">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-iso-orange shadow-[0_0_0_3px_rgba(244,90,10,0.18)]" />
              Heating
            </span>
            <span className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.14em] text-white/55">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_0_3px_rgba(255,255,255,0.12)]" />
              Systems
            </span>
          </div>
        </div>

        {/* mobile selector chips */}
        <div className="no-scrollbar -mx-5 mt-6 flex gap-2 overflow-x-auto px-5 lg:hidden">
          {services.map((service, index) => (
            <button
              key={service.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-pressed={index === activeIndex}
              className={`shrink-0 whitespace-nowrap border px-4 py-2.5 font-display text-[0.66rem] font-semibold uppercase tracking-[0.14em] transition ${
                index === activeIndex
                  ? service.tone === 'heating'
                    ? 'border-iso-orange bg-iso-orange text-white'
                    : 'border-iso-blue bg-iso-blue text-white'
                  : 'border-white/20 text-white/60 hover:border-white/50 hover:text-white'
              }`}
            >
              {service.shortLabel}
            </button>
          ))}
        </div>

        <div className="mt-8 grid items-center gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7" ref={wheelRef}>
            <ServiceWheel
              services={services}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
            />

            <p className="mt-4 flex items-center justify-center gap-3 text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
              <span className="h-px w-8 bg-white/25" aria-hidden="true" />
              Scroll to rotate the dial
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden border border-white/12 bg-navy-deep/80 shadow-[0_30px_70px_-45px_rgba(0,0,0,0.9)] backdrop-blur-sm">
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-[3px] ${
                  active.tone === 'heating'
                    ? 'bg-gradient-to-r from-iso-orange via-iso-orange/70 to-transparent'
                    : active.tone === 'cooling'
                      ? 'bg-gradient-to-r from-iso-blue via-iso-blue/70 to-transparent'
                      : 'bg-gradient-to-r from-white/70 via-white/30 to-transparent'
                }`}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.03] blur-2xl"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: reduced ? 0 : 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <figure className="relative">
                    <img
                      src={CATEGORY_IMAGES[active.image] || roofImage}
                      alt={CATEGORY_ALT[active.image] || 'HVAC equipment'}
                      width={1000}
                      height={625}
                      loading="lazy"
                      decoding="async"
                      className="h-36 w-full object-cover sm:h-40"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/25 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                      <span
                        className={`inline-flex items-center gap-2 border border-white/15 bg-navy-deep/70 px-2.5 py-1.5 font-display text-[0.58rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm ${tone.className}`}
                      >
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rounded-full ${
                            active.tone === 'heating'
                              ? 'bg-iso-orange'
                              : active.tone === 'cooling'
                                ? 'bg-iso-blue'
                                : 'bg-white'
                          }`}
                        />
                        {tone.label}
                      </span>
                      <span className="rounded-full border border-white/15 bg-navy-deep/60 px-2.5 py-1 font-display text-[0.58rem] font-semibold tracking-[0.14em] text-white/75 backdrop-blur-sm">
                        {String(activeIndex + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                      </span>
                    </div>
                  </figure>

                  <div className="p-5 text-center sm:p-6">
                    <div className="flex items-center justify-center gap-3">
                      <span className="h-px w-6 bg-iso-orange/70" aria-hidden="true" />
                      <span className="font-display text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/40">
                        Selected service
                      </span>
                      <span className="h-px w-6 bg-iso-orange/70" aria-hidden="true" />
                    </div>

                    <h3 className="mx-auto mt-3 max-w-[18ch] text-[clamp(1.45rem,2.5vw,2rem)] font-bold leading-[1.06] tracking-tight text-white">
                      {active.label}
                    </h3>
                    <p className="mx-auto mt-3 max-w-[34ch] text-[0.92rem] leading-[1.75] text-white/65">
                      {active.summary}
                    </p>

                    <div className="mx-auto mt-4 max-w-[18rem]" aria-hidden="true">
                      <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            active.tone === 'heating'
                              ? 'bg-iso-orange'
                              : active.tone === 'cooling'
                                ? 'bg-iso-blue'
                                : 'bg-white/70'
                          }`}
                          style={{ width: `${((activeIndex + 1) / services.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-5 flex justify-center">
                      <Button
                        href="/contact-us"
                        variant="primary"
                        className="rounded-full border border-white/10 px-6 py-3 shadow-[0_18px_36px_-16px_rgba(244,90,10,0.85)] ring-1 ring-inset ring-white/10 transition hover:shadow-[0_22px_42px_-16px_rgba(244,90,10,0.95)]"
                      >
                        Schedule this service
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-4 py-3 sm:px-5">
                <button
                  type="button"
                  onClick={() => go(activeIndex - 1)}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 font-display text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/60 transition hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
                >
                  <ChevronLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" aria-hidden="true" />
                  Previous
                </button>

                <span className="hidden text-[0.56rem] uppercase tracking-[0.18em] text-white/30 sm:block">
                  Use arrow keys
                </span>

                <button
                  type="button"
                  onClick={() => go(activeIndex + 1)}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 font-display text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/60 transition hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
                >
                  Next
                  <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
