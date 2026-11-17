import { useEffect, useRef } from 'react';
import { gsap, EASE } from '../../animations/gsap';
import useReveals from '../../animations/useReveals';
import useReducedMotion from '../../hooks/useReducedMotion';
import technicianImage from '../../assets/img/why-technician.jpg';
import interiorImage from '../../assets/img/why-interior.jpg';
import SectionHeading from '../ui/SectionHeading';

const VALUES = [
  {
    id: '01',
    tone: 'orange',
    title: 'Comfort-Focused Solutions',
    body: 'Heating and cooling recommendations tailored to the needs of the property.',
  },
  {
    id: '02',
    tone: 'blue',
    title: 'Quality Workmanship',
    body: 'Careful attention to installation, maintenance, and troubleshooting.',
  },
  {
    id: '03',
    tone: 'orange',
    title: 'Efficiency in Mind',
    body: 'Solutions designed with system performance, energy use, and year-round comfort in mind.',
  },
  {
    id: '04',
    tone: 'blue',
    title: 'A Straightforward Experience',
    body: 'Clear communication and a simple path from inquiry to service.',
  },
];

export default function WhyChooseUsSection() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useReveals(rootRef, { reduced, start: 'top 82%' });

  useEffect(() => {
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.from('.rule', {
        scaleX: 0,
        duration: 1.1,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: { trigger: '[data-rules]', start: 'top 80%', once: true },
      });

      gsap.fromTo(
        '[data-parallax]',
        { yPercent: 5, scale: 1.12 },
        {
          yPercent: -6,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-parallax]',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="why-choose-us"
      ref={rootRef}
      data-rules
      aria-labelledby="why-heading"
      className="relative overflow-hidden bg-iso-soft-white py-14 sm:py-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-navy/10 lg:block"
      />

      <div className="shell">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            as="h2"
            align="center"
            eyebrow="Why Choose Us"
            lines={['Your Comfort Deserves', 'a Better Standard.']}
            lead="Every space is different. The right heating and cooling solution should reflect the way you live, work, and experience comfort."
          />
          <p className="fade-up mx-auto mt-3 max-w-[52ch] text-center text-[0.88rem] leading-relaxed text-iso-charcoal/70">
            Precision engineering on one side, everyday comfort on the other — the balance ISO
            Mechanical is built around.
          </p>
        </div>

        <div className="mt-8 grid items-center gap-10 lg:mt-10 lg:grid-cols-12 lg:items-center lg:gap-8 xl:gap-10">
          <div className="relative mx-auto w-full max-w-[34rem] lg:col-span-5 lg:mx-0 lg:max-w-none">
            <figure className="mask-reveal relative overflow-hidden">
              <img
                src={technicianImage}
                alt="HVAC technician checking refrigerant pressures on a system"
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
                data-parallax
                className="h-[18rem] w-full object-cover object-center sm:h-[22rem] lg:h-[26rem]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(160deg, rgba(20,44,86,0.18), transparent 55%, rgba(7,133,214,0.14))',
                }}
              />
            </figure>

            <figure className="mask-reveal relative -mt-12 ml-auto w-[58%] overflow-hidden border-[8px] border-iso-soft-white sm:w-[50%] lg:-mr-6 lg:-mt-16 lg:w-[60%]">
              <img
                src={interiorImage}
                alt="Bright, comfortable living room interior"
                width={900}
                height={900}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </figure>

            <svg
              aria-hidden="true"
              className="absolute -left-6 bottom-6 hidden h-32 w-6 text-navy/25 lg:block"
              viewBox="0 0 24 160"
              fill="none"
            >
              <path d="M12 0v160" stroke="currentColor" strokeWidth="1" />
              <path d="M4 20h16M4 60h16M4 100h16M4 140h16" stroke="currentColor" strokeWidth="1" />
              <circle cx="12" cy="60" r="4" fill="#F45A0A" />
            </svg>
          </div>

          <div className="lg:col-span-7">
            <ul className="flex flex-col">
              {VALUES.map((value, index) => (
                <li key={value.id} className="fade-up" style={{ transitionDelay: `${index * 70}ms` }}>
                  <div className="rule mb-5" aria-hidden="true" />
                  <div className="group flex gap-5 pb-6">
                    <span
                      className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border font-display text-[0.7rem] font-bold transition-colors duration-300 ${
                        value.tone === 'orange'
                          ? 'border-iso-orange/40 text-iso-orange group-hover:bg-iso-orange group-hover:text-white'
                          : 'border-iso-blue/40 text-iso-blue group-hover:bg-iso-blue group-hover:text-white'
                      }`}
                    >
                      {value.id}
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-[1.2rem] font-bold leading-tight text-navy sm:text-[1.4rem]">
                        {value.title}
                      </h3>
                      <p className="mt-2 max-w-[46ch] text-[0.95rem] leading-relaxed text-iso-charcoal/80">
                        {value.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rule mb-5" aria-hidden="true" />
            <div className="fade-up flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
              <span className="text-[0.68rem] uppercase tracking-[0.18em] text-navy/55">
                Heating planned with cooling in mind
              </span>
              <span className="hidden h-px min-w-[3rem] flex-1 bg-navy/15 sm:block" aria-hidden="true" />
              <span className="text-[0.68rem] uppercase tracking-[0.18em] text-iso-orange">
                Schedule a Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
