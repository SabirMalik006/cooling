import { useEffect, useRef, useState } from 'react';
import {
  BadgeCheck,
  CalendarCheck,
  Compass,
  Handshake,
  HeartHandshake,
  MapPin,
  Phone,
  Quote,
  Target,
  Truck,
  Users,
} from 'lucide-react';
import useReveals from '../animations/useReveals';
import useReducedMotion from '../hooks/useReducedMotion';
import { siteConfig } from '../data/siteConfig';
import { activeServices } from '../data/services';
import { coverageRegions, hq, serviceAreaCount } from '../data/serviceAreas';
import Button from '../components/ui/Button';
import ownerPortrait from '../assets/img/owner-portrait.jpg';
import technicianImage from '../assets/img/why-technician.jpg';
import interiorImage from '../assets/img/why-interior.jpg';
import equipmentRoof from '../assets/img/equipment-roof.jpg';
import heatPump from '../assets/img/heat-pump.jpg';
import airflowFans from '../assets/img/airflow-fans.jpg';
import homeExterior from '../assets/img/home-exterior.jpg';

function StatCounter({ value, suffix = '', label }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return undefined;
    }

    const node = ref.current;
    if (!node) return undefined;

    let frame;
    let started = false;

    const count = () => {
      const duration = 1400;
      const begin = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - begin) / duration);
        const eased = 1 - (1 - progress) ** 3;
        setDisplay(Math.round(value * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            count();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced, value]);

  return (
    <div ref={ref} className="group relative flex flex-col px-4 first:pl-0 last:pr-0">
      <dt className="order-2 mt-2.5 text-[0.6rem] uppercase leading-snug tracking-[0.15em] text-iso-charcoal/55">
        {label}
      </dt>
      <dd className="order-1 font-display text-[clamp(1.9rem,3.6vw,2.7rem)] font-extrabold leading-none tracking-tight text-navy tabular-nums">
        {display}
        {suffix && <span className="text-iso-orange">{suffix}</span>}
      </dd>
      <span
        aria-hidden="true"
        className="order-3 mt-3 block h-px w-8 bg-iso-orange/40 transition-all duration-500 group-hover:w-14 group-hover:bg-iso-orange"
      />
    </div>
  );
}

const COMPANY_STATS = [
  { value: serviceAreaCount, suffix: '+', label: 'Communities covered' },
  { value: coverageRegions.length, label: 'Regions served' },
  { value: activeServices.length, label: 'Service categories' },
  { value: 1, label: 'Local base' },
];

const COVERAGE_POINTS = [
  {
    icon: MapPin,
    title: 'Regional coverage',
    body: 'Homes and light commercial spaces across Maryland, Washington, DC and Northern Virginia — with Delaware and Pennsylvania confirmed request by request.',
  },
  {
    icon: BadgeCheck,
    title: 'Qualified technicians',
    body: 'Experienced, careful workmanship on every visit. The system in front of us is assessed before anything is recommended.',
  },
  {
    icon: CalendarCheck,
    title: 'Scheduling that fits',
    body: 'Appointment-based visits with timing confirmed before we arrive, so your day is not held up waiting.',
  },
  {
    icon: Truck,
    title: 'Fast, reliable response',
    body: 'Every request is reviewed and routed promptly, and you get a real reply with scope and next steps — not an autoresponder.',
  },
  {
    icon: Handshake,
    title: 'Customer commitment',
    body: 'The same standard in every area we serve: clear scope, respect for your space, and follow-through after the work.',
  },
];

// Placeholder owner profile — swap the name, copy and credentials for the real
// details when the admin editing screen is wired up.
const OWNER = {
  name: 'M. IQBAL MIRZA',
  role: 'Founder & Owner',
  years: '20+',
  yearsLabel: 'Years in the trade',
  intro:
    'ISO Mechanical started the way most good trades do: one owner, one van, and a habit of finishing what he started. He spent his early years on installs and service calls around Anne Arundel County before building the company around a rule he still repeats — diagnose first, explain honestly, then recommend.',
  quote: 'A system should make sense to the person paying for it.',
  body: 'Today he still reviews plans and walks the jobs that need a second set of eyes, working directly with homeowners and property managers across Maryland, Washington, DC and Northern Virginia. No call centre, no script — the person who answers for the work is the person who signs off on it.',
  credentials: ['Licensed & insured', '20+ years in heating & cooling', 'Based in Millersville, MD'],
};

const MISSION_PILLARS = [
  {
    icon: Target,
    title: 'Comfort with purpose',
    body: 'Every recommendation starts with how the space is used, so heating and cooling work for the people inside it — not just the equipment.',
  },
  {
    icon: Compass,
    title: 'Honest guidance',
    body: 'We explain what we find, what matters now and what can wait, giving clear options before any work begins.',
  },
  {
    icon: HeartHandshake,
    title: 'Care that lasts',
    body: 'A job is finished when the system performs and the customer understands it — with follow-through that does not end at the door.',
  },
];

const TEAM_CARDS = [
  {
    image: technicianImage,
    title: 'On-site specialists',
    body: 'Experienced hands on every visit, focused on careful diagnosis and workmanship you can rely on.',
  },
  {
    image: equipmentRoof,
    title: 'Installation & equipment',
    body: 'From rooftop units to indoor systems, we plan and handle equipment with precision and respect for the property.',
  },
  {
    image: airflowFans,
    title: 'Airflow & performance',
    body: 'Comfort depends on balance — we look at distribution, airflow and system behaviour, not just the box on the wall.',
  },
  {
    image: homeExterior,
    title: 'Homes & properties',
    body: 'Serving homeowners and property managers with a team that treats every space like it has to keep running.',
  },
];

export default function AboutPage() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const phoneHref = siteConfig.phone ? `tel:${siteConfig.phone.replace(/[^\d+]/g, '')}` : null;

  useReveals(rootRef, { reduced, start: 'top 88%' });

  return (
    <div ref={rootRef}>
      {/* page hero */}
      <section
        aria-labelledby="about-heading"
        className="relative isolate overflow-hidden bg-navy-deep text-white"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(75% 95% at 5% 10%, rgba(244,90,10,0.26), transparent 55%), radial-gradient(60% 80% at 100% 0%, rgba(7,133,214,0.28), transparent 58%), radial-gradient(45% 55% at 75% 95%, rgba(7,133,214,0.12), transparent 60%), linear-gradient(160deg, #08172f 0%, #102446 48%, #142c56 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }}
        />
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/2 -z-10 hidden h-[36rem] w-[36rem] -translate-y-1/2 text-white/[0.07] lg:block"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="200" cy="200" r="196" stroke="currentColor" />
          <circle cx="200" cy="200" r="140" stroke="currentColor" strokeDasharray="3 9" />
          <circle cx="200" cy="200" r="84" stroke="#F45A0A" strokeOpacity="0.55" />
        </svg>

        <div className="shell relative grid items-center gap-12 pb-14 pt-28 sm:pt-32 lg:grid-cols-12 lg:gap-14 lg:pb-16 lg:pt-36">
          <div className="lg:col-span-7">
            <div className="eyebrow fade-up mb-6 inline-flex items-center gap-3 border border-white/20 bg-white/10 px-4 py-2 text-white/90 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm">
              <span aria-hidden="true" className="h-px w-7 bg-iso-orange" />
              About ISO Mechanical
            </div>

            <h1
              id="about-heading"
              className="max-w-[17ch] text-[clamp(2.1rem,5.2vw,3.9rem)] font-extrabold leading-[1.02] tracking-mega text-white drop-shadow-[0_6px_24px_rgba(8,23,47,0.55)]"
            >
              <span className="reveal-line">
                <span>Precision Engineering.</span>
              </span>
              <span className="reveal-line mt-1">
                <span className="text-iso-orange drop-shadow-[0_2px_12px_rgba(244,90,10,0.35)]">
                  Everyday Comfort.
                </span>
              </span>
            </h1>

            <p className="fade-up mt-6 max-w-[52ch] text-[1rem] leading-[1.75] text-white/85 sm:text-[1.04rem]">
              ISO Mechanical is a heating and cooling service based in {siteConfig.address.city},{' '}
              {siteConfig.address.state} — planned around the way your space is actually used, for
              homes and light commercial buildings alike.
            </p>

            <ul className="fade-up mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.66rem] uppercase tracking-[0.16em] text-white/65">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-iso-orange" strokeWidth={1.9} aria-hidden="true" />
                {siteConfig.address.city}, {siteConfig.address.stateAbbr}
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-iso-blue" />
                {serviceAreaCount}+ communities
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-iso-orange" />
                Heating &amp; cooling
              </li>
            </ul>

            <div className="fade-up mt-8 flex flex-wrap items-center gap-4">
              <Button href="/contact-us" variant="primary">
                {siteConfig.cta.primary.label}
              </Button>
              <Button href="/#services" variant="light">
                Explore Our Services
              </Button>
              {phoneHref && siteConfig.phone && (
                <a
                  href={phoneHref}
                  className="inline-flex items-center gap-2 font-display text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/70 transition hover:text-white"
                >
                  <Phone className="h-4 w-4 text-iso-orange" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
              )}
            </div>
          </div>

          <div className="fade-up lg:col-span-5">
            <figure className="relative overflow-hidden border border-white/15 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.9)]">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 z-10 h-[3px]"
                style={{ background: 'linear-gradient(90deg, #F45A0A, #0785D6)' }}
              />
              <img
                src={technicianImage}
                alt="Technician reviewing equipment inside a mechanical space"
                width={900}
                height={1200}
                loading="eager"
                decoding="async"
                className="h-[24rem] w-full object-cover object-center sm:h-[28rem] lg:h-[30rem]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-start gap-3 border-t border-white/15 bg-navy-deep/70 px-5 py-4 backdrop-blur-md">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-8 w-px shrink-0 bg-iso-orange"
                />
                <p className="text-[0.82rem] leading-relaxed text-white/85">
                  Work starts with the system in front of us — not with a default answer.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* who we are */}
      <section
        id="who-we-are"
        aria-labelledby="who-heading"
        className="relative overflow-hidden bg-iso-soft-white py-16 sm:py-20 lg:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-24 h-80 w-80 rounded-full bg-iso-ice blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-navy/10"
        />

        <div className="shell relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <div className="eyebrow fade-up text-iso-orange">
                <span aria-hidden="true" className="h-px w-8 bg-iso-orange" />
                <span className="text-navy/60">Who We Are</span>
              </div>

              <h2
                id="who-heading"
                className="mt-5 max-w-[22ch] text-[clamp(1.85rem,3.9vw,3.05rem)] font-bold leading-[1.04] tracking-tight text-navy"
              >
                <span className="reveal-line">
                  <span>A local team built</span>
                </span>
                <span className="reveal-line">
                  <span className="text-iso-orange">around the details.</span>
                </span>
              </h2>

              <p className="fade-up mt-6 max-w-[54ch] text-[1rem] leading-[1.8] text-iso-charcoal/85">
                Comfort is engineering meeting everyday life. We treat both sides of that equation
                with the same care: the calculations behind a system, and the experience of living
                with it.
              </p>
              <p className="fade-up mt-4 max-w-[54ch] text-[0.98rem] leading-[1.8] text-iso-charcoal/70">
                Every space behaves differently. A south-facing room, an older duct run, a building
                with a busy schedule — the right heating and cooling solution reflects how the space
                is used, not a template. That is the standard ISO Mechanical works to, from{' '}
                {hq.city}, {hq.stateAbbr} across {coverageRegions.length} regions and{' '}
                {serviceAreaCount}+ named communities.
              </p>

              <div className="fade-up mt-8 flex flex-wrap items-end gap-x-8 gap-y-5">
                <address className="border-l-2 border-iso-orange pl-4 not-italic">
                  <p className="font-display text-[0.56rem] font-semibold uppercase tracking-wide2 text-navy/50">
                    Based in
                  </p>
                  <p className="mt-1.5 font-display text-[0.95rem] font-bold leading-snug text-navy">
                    {siteConfig.address.line1}
                    <br />
                    {siteConfig.address.line2}
                  </p>
                </address>

                <Button href="/contact-us" variant="dark">
                  Talk to Us
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <figure className="relative">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-5 -top-5 hidden h-24 w-24 border-l border-t border-iso-orange/40 sm:block"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-5 -right-5 hidden h-24 w-24 border-b border-r border-navy/15 sm:block"
                />

                <div className="mask-reveal group relative overflow-hidden border border-navy/10 bg-white shadow-[0_40px_90px_-60px_rgba(20,44,86,0.9)]">
                  <img
                    src={interiorImage}
                    alt="Bright, comfortable interior of a modern home"
                    width={900}
                    height={700}
                    loading="lazy"
                    decoding="async"
                    className="h-[24rem] w-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04] sm:h-[28rem] lg:h-[32rem]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent"
                  />

                  <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-5 sm:px-6">
                    <div className="flex items-start gap-3 border-t border-white/20 pt-4">
                      <MapPin
                        className="mt-0.5 h-4 w-4 shrink-0 text-iso-orange"
                        strokeWidth={1.9}
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-display text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-white/60">
                          Anchored in {hq.city}, {hq.state}
                        </p>
                        <p className="mt-1.5 text-[0.85rem] leading-relaxed text-white/85">
                          A space that feels right in every season — without you having to think
                          about the equipment that keeps it that way.
                        </p>
                      </div>
                    </div>
                  </figcaption>
                </div>
              </figure>
            </div>
          </div>

          <dl className="fade-up mt-14 grid grid-cols-2 gap-y-8 border-t border-navy/10 pt-10 sm:mt-16 sm:grid-cols-4 sm:divide-x sm:divide-navy/10">
            {COMPANY_STATS.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </dl>
        </div>
      </section>

      {/* service locations & coverage */}
      <section
        id="service-locations"
        aria-labelledby="coverage-heading"
        className="relative isolate overflow-hidden bg-navy-deep py-16 text-white sm:py-20 lg:py-24"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 -top-24 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(64,136,204,0.28),transparent_68%)] blur-3xl" />
          <div className="absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(240,110,40,0.2),transparent_68%)] blur-3xl" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:76px_76px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </div>

        <div className="shell relative">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <div className="eyebrow fade-up text-iso-orange">
                <span aria-hidden="true" className="h-px w-8 bg-iso-orange" />
                <span className="text-white/55">Service Locations &amp; Coverage</span>
              </div>

              <h2
                id="coverage-heading"
                className="mt-5 max-w-[24ch] text-[clamp(1.62rem,3.9vw,3rem)] font-bold leading-[1.06] tracking-tight text-white"
              >
                <span className="reveal-line">
                  <span>Heating and cooling across</span>
                </span>
                <span className="reveal-line">
                  <span className="text-iso-orange">Maryland, DC and Virginia.</span>
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5 lg:pb-2">
              <p className="fade-up max-w-[46ch] text-[0.98rem] leading-[1.8] text-white/70">
                Residential and light commercial customers across {coverageRegions.length} regions
                get the same heating, cooling and indoor air quality service from the same team —
                planned in {hq.city} and delivered wherever the work is.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12 lg:gap-8">
            <div className="fade-up lg:col-span-5">
              <div className="flex h-full flex-col border border-white/12 bg-white/[0.04] backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
                  <p className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white/55">
                    Where we work
                  </p>
                  <span className="whitespace-nowrap border border-iso-orange/40 px-2 py-1 font-display text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-iso-orange">
                    {serviceAreaCount}+ communities
                  </span>
                </div>

                <ol className="flex flex-1 flex-col divide-y divide-white/10">
                  {coverageRegions.map((region, index) => (
                    <li key={region.label} className="group flex flex-1">
                      <div className="flex flex-1 items-center gap-4 px-5 py-4 transition duration-300 hover:bg-white/[0.05] sm:px-6">
                        <span className="font-display text-[0.58rem] font-bold tracking-[0.14em] text-white/30 transition group-hover:text-iso-orange">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0">
                          <p className="font-display text-[1rem] font-semibold leading-snug text-white">
                            {region.label}
                          </p>
                          <p className="mt-1 text-[0.78rem] leading-relaxed text-white/55">
                            {region.note}
                          </p>
                        </div>
                        <MapPin
                          className="ml-auto h-3.5 w-3.5 shrink-0 text-white/25 transition group-hover:text-iso-orange"
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </div>
                    </li>
                  ))}
                </ol>

                <p className="mt-auto border-t border-white/10 px-5 py-4 text-[0.76rem] leading-relaxed text-white/45 sm:px-6">
                  Outside these areas? Send your ZIP code and we will confirm coverage before
                  anything is booked.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {COVERAGE_POINTS.map((point, index) => {
                const Icon = point.icon;
                const isLast = index === COVERAGE_POINTS.length - 1;
                return (
                  <div
                    key={point.title}
                    className={`fade-up group relative overflow-hidden border border-white/12 bg-white/[0.03] p-5 transition duration-500 hover:border-iso-orange/40 hover:bg-white/[0.06] sm:p-6 ${
                      isLast ? 'sm:col-span-2' : ''
                    }`}
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-iso-orange/10 blur-xl transition group-hover:bg-iso-orange/20"
                    />
                    <span className="relative grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5">
                      <Icon className="h-[1.15rem] w-[1.15rem] text-iso-orange" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <h3 className="relative mt-4 font-display text-[1.02rem] font-bold leading-snug text-white">
                      {point.title}
                    </h3>
                    <p className="relative mt-2.5 max-w-[38ch] text-[0.86rem] leading-relaxed text-white/65">
                      {point.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="fade-up mt-8 flex flex-col items-start justify-between gap-5 border border-white/12 bg-white/[0.04] px-5 py-5 sm:flex-row sm:items-center sm:px-6">
            <p className="max-w-[52ch] text-[0.9rem] leading-relaxed text-white/70">
              <span className="font-semibold text-white">Serving Virginia, Maryland and DC.</span>{' '}
              Tell us the address and the system, and we will confirm whether it is in range —
              usually with a straight answer on the same request.
            </p>
            <Button href="/contact-us" variant="primary" className="shrink-0">
              Check My Area
            </Button>
          </div>
        </div>
      </section>

      {/* owner */}
      <section
        id="owner"
        aria-labelledby="owner-heading"
        className="relative overflow-hidden bg-iso-soft-white py-16 sm:py-20 lg:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-iso-ice blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 right-[-6rem] h-[26rem] w-[26rem] rounded-full border border-navy/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-navy/10"
        />

        <div className="shell relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5">
              <figure className="fade-up relative mx-auto w-full max-w-[23rem] lg:mx-0 lg:max-w-none">
                <span
                  aria-hidden="true"
                  className="absolute -left-4 -top-4 h-24 w-24 border-l-2 border-t-2 border-iso-orange/70"
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-4 -right-4 h-24 w-24 border-b-2 border-r-2 border-navy/15"
                />

                <div className="mask-reveal relative overflow-hidden bg-navy">
                  <img
                    src={ownerPortrait}
                    alt={`${OWNER.name}, ${OWNER.role} at ISO Mechanical`}
                    className="aspect-[4/5] w-full scale-[1.06] object-cover object-[center_30%] transition duration-[1400ms] ease-out hover:scale-[1.12]"
                    loading="lazy"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-5">
                    <div className="border-t border-white/20 pt-4">
                      <p className="font-display text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-iso-orange">
                        {OWNER.role}
                      </p>
                      <p className="mt-1.5 font-display text-[1.35rem] font-extrabold tracking-tight text-white sm:text-[1.45rem]">
                        {OWNER.name}
                      </p>
                      <span
                        aria-hidden="true"
                        className="mt-2 block h-[3px] w-12 rounded-full bg-iso-orange"
                      />
                    </div>
                  </figcaption>
                </div>

                <div className="absolute -right-2 top-6 border border-navy/10 bg-white px-4 py-3 shadow-[0_18px_40px_-26px_rgba(9,24,44,0.5)] sm:-right-5">
                  <p className="font-display text-[1.45rem] font-extrabold leading-none tracking-tight text-navy">
                    {OWNER.years}
                  </p>
                  <p className="mt-1.5 text-[0.5rem] uppercase leading-tight tracking-[0.14em] text-iso-charcoal/55">
                    {OWNER.yearsLabel}
                  </p>
                </div>
              </figure>
            </div>

            <div className="lg:col-span-7">
              <div className="eyebrow fade-up text-iso-orange">
                <span aria-hidden="true" className="h-px w-8 bg-iso-orange" />
                <span className="text-navy/60">Meet the Owner</span>
              </div>

              <h2
                id="owner-heading"
                className="mt-4 max-w-[20ch] text-[clamp(1.7rem,3.9vw,3rem)] font-bold leading-[1.04] tracking-tight text-navy"
              >
                <span className="reveal-line">
                  <span>The person behind</span>
                </span>
                <span className="reveal-line">
                  <span className="text-iso-orange">the workmanship.</span>
                </span>
              </h2>

              <div className="fade-up mt-4 inline-flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="relative inline-block font-display text-[clamp(1.35rem,2.6vw,1.85rem)] font-extrabold tracking-tight text-navy">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-[0.12em] h-[0.38em] bg-iso-orange/20"
                  />
                  <span className="relative">{OWNER.name}</span>
                </span>
                <span className="inline-flex items-center gap-2 border-l border-navy/15 pl-4 font-display text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-iso-charcoal/55">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-iso-orange" />
                  {OWNER.role}
                </span>
              </div>

              <p className="fade-up mt-4 max-w-[54ch] text-[0.98rem] leading-[1.75] text-iso-charcoal/80">
                {OWNER.intro}
              </p>

              <figure className="fade-up relative mt-5 overflow-hidden border border-navy/10 bg-white p-5 shadow-[0_24px_50px_-36px_rgba(9,24,44,0.35)] sm:p-6">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-iso-orange via-iso-orange/70 to-iso-orange/20"
                />
                <Quote
                  className="h-7 w-7 text-iso-orange/25"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <blockquote className="mt-2">
                  <p className="font-display text-[clamp(1.1rem,2.3vw,1.45rem)] font-semibold leading-snug text-navy">
                    “{OWNER.quote}”
                  </p>
                </blockquote>
                <figcaption className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-navy/8 pt-3">
                  <span className="font-display text-[0.95rem] font-extrabold tracking-[0.02em] text-navy">
                    {OWNER.name}
                  </span>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-iso-orange" />
                  <span className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-iso-charcoal/55">
                    {OWNER.role}
                  </span>
                </figcaption>
              </figure>

              <p className="fade-up mt-5 max-w-[54ch] text-[0.95rem] leading-[1.75] text-iso-charcoal/70">
                {OWNER.body}
              </p>

              <ul className="fade-up mt-5 flex flex-wrap gap-2.5">
                {OWNER.credentials.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 border border-navy/12 bg-white px-3 py-2 text-[0.72rem] font-medium text-navy/75"
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-iso-orange" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="fade-up mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button href="/contact-us" variant="primary">
                  Talk to Us
                </Button>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`}
                  className="flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-navy/60 transition hover:text-navy"
                >
                  <Phone className="h-4 w-4 text-iso-orange" strokeWidth={1.9} aria-hidden="true" />
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* our mission */}
      <section
        id="our-mission"
        aria-labelledby="mission-heading"
        className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 right-[-6rem] h-80 w-80 rounded-full bg-iso-ice blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-navy/10"
        />

        <div className="shell relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <div className="eyebrow fade-up text-iso-orange">
                <span aria-hidden="true" className="h-px w-8 bg-iso-orange" />
                <span className="text-navy/60">Our Mission</span>
              </div>

              <h2
                id="mission-heading"
                className="mt-5 max-w-[18ch] text-[clamp(1.85rem,3.9vw,3.05rem)] font-bold leading-[1.04] tracking-tight text-navy"
              >
                <span className="reveal-line">
                  <span>Comfort built on</span>
                </span>
                <span className="reveal-line">
                  <span className="text-iso-orange">care and clarity.</span>
                </span>
              </h2>

              <p className="fade-up mt-6 max-w-[54ch] text-[1rem] leading-[1.8] text-iso-charcoal/80">
                Our mission is simple: deliver heating and cooling work that people can trust.
                From the first conversation to the finished job, we focus on clear answers, careful
                workmanship and systems that make everyday spaces feel right in every season.
              </p>
              <p className="fade-up mt-4 max-w-[54ch] text-[0.98rem] leading-[1.8] text-iso-charcoal/70">
                That means looking beyond the equipment — understanding the home, the property and
                the people who rely on it — so every solution is practical, honest and built to last.
              </p>

              <div className="mt-8 space-y-4">
                {MISSION_PILLARS.map((pillar, index) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="fade-up group flex gap-4 border border-navy/10 bg-iso-soft-white p-4 transition duration-500 hover:border-iso-orange/40 hover:bg-white sm:p-5"
                      style={{ transitionDelay: `${index * 80}ms` }}
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-navy/10 bg-white text-iso-orange transition duration-500 group-hover:border-iso-orange/40 group-hover:bg-iso-orange group-hover:text-white">
                        <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-[1rem] font-bold text-navy">
                          {pillar.title}
                        </h3>
                        <p className="mt-1.5 text-[0.88rem] leading-relaxed text-iso-charcoal/75">
                          {pillar.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <figure className="fade-up mask-reveal relative col-span-2 overflow-hidden bg-navy">
                  <img
                    src={interiorImage}
                    alt="A comfortable interior space served by ISO Mechanical"
                    className="aspect-[16/10] w-full object-cover transition duration-[1400ms] ease-out hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/55 via-transparent to-transparent"
                  />
                  <figcaption className="absolute bottom-4 left-4 border-l-2 border-iso-orange pl-3">
                    <p className="font-display text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white/85">
                      Comfort you can feel
                    </p>
                  </figcaption>
                </figure>

                <figure
                  className="fade-up mask-reveal relative overflow-hidden bg-navy"
                  style={{ transitionDelay: '120ms' }}
                >
                  <img
                    src={heatPump}
                    alt="Outdoor heating and cooling equipment"
                    className="aspect-[4/5] w-full object-cover transition duration-[1400ms] ease-out hover:scale-[1.05]"
                    loading="lazy"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent"
                  />
                  <figcaption className="absolute bottom-3 left-3 right-3">
                    <p className="font-display text-[0.54rem] font-semibold uppercase tracking-[0.14em] text-white/85">
                      Systems that perform
                    </p>
                  </figcaption>
                </figure>

                <figure
                  className="fade-up mask-reveal relative overflow-hidden bg-navy"
                  style={{ transitionDelay: '200ms' }}
                >
                  <img
                    src={equipmentRoof}
                    alt="Rooftop HVAC equipment maintained with care"
                    className="aspect-[4/5] w-full object-cover transition duration-[1400ms] ease-out hover:scale-[1.05]"
                    loading="lazy"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent"
                  />
                  <figcaption className="absolute bottom-3 left-3 right-3">
                    <p className="font-display text-[0.54rem] font-semibold uppercase tracking-[0.14em] text-white/85">
                      Work done right
                    </p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* the trusted team */}
      <section
        id="trusted-team"
        aria-labelledby="team-heading"
        className="relative isolate overflow-hidden bg-navy-deep py-16 text-white sm:py-20 lg:py-24"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(64,136,204,0.22),transparent_68%)] blur-3xl" />
          <div className="absolute -bottom-28 -right-20 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(240,110,40,0.18),transparent_68%)] blur-3xl" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <div className="shell relative">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <div className="eyebrow fade-up text-iso-orange">
                <span aria-hidden="true" className="h-px w-8 bg-iso-orange" />
                <span className="text-white/55">The Trusted Team</span>
              </div>

              <h2
                id="team-heading"
                className="mt-5 max-w-[20ch] text-[clamp(1.85rem,3.9vw,3rem)] font-bold leading-[1.04] tracking-tight text-white"
              >
                <span className="reveal-line">
                  <span>People you can count on,</span>
                </span>
                <span className="reveal-line">
                  <span className="text-iso-orange">work you can trust.</span>
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5 lg:pb-1">
              <p className="fade-up max-w-[46ch] text-[0.98rem] leading-[1.8] text-white/70">
                Behind every visit is a team that shows up prepared, communicates clearly and treats
                your space with respect — bringing the same care to homes and properties across the
                region.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
            {TEAM_CARDS.map((card, index) => (
              <article
                key={card.title}
                className="fade-up group relative overflow-hidden border border-white/10 bg-white/[0.03]"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="mask-reveal relative aspect-[4/5] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/25 to-transparent opacity-90 transition duration-500 group-hover:opacity-100"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition duration-500 group-hover:opacity-100"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span
                    aria-hidden="true"
                    className="mb-3 block h-[3px] w-8 rounded-full bg-iso-orange transition-all duration-500 group-hover:w-12"
                  />
                  <h3 className="font-display text-[1.05rem] font-bold leading-snug text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-white/70">
                    {card.body}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="fade-up mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3 text-white/70">
              <Users className="h-5 w-5 text-iso-orange" strokeWidth={1.8} aria-hidden="true" />
              <p className="text-[0.9rem] leading-relaxed">
                A committed team, guided by <span className="font-semibold text-white">{OWNER.name}</span>, serving
                Maryland, DC and Northern Virginia.
              </p>
            </div>
            <Button href="/contact-us" variant="primary" className="shrink-0">
              Work With Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
