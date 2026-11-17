import { MapPin, Phone } from 'lucide-react';

import { siteConfig } from '../../data/siteConfig';
import { coverageRegions, serviceAreaCount } from '../../data/serviceAreas';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const FULL_ADDRESS = `${siteConfig.address.line1}, ${siteConfig.address.line2}`;
const COVERAGE_MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  FULL_ADDRESS,
)}&z=9&output=embed`;

const STATS = [
  { value: `${serviceAreaCount}+`, label: 'Communities' },
  { value: String(coverageRegions.length), label: 'Regions' },
  { value: '1', label: 'Local base' },
];

export default function ContactCoverageSection() {
  const phoneHref = siteConfig.phone ? `tel:${siteConfig.phone.replace(/[^\d+]/g, '')}` : null;

  return (
    <section
      id="coverage"
      aria-labelledby="contact-coverage-heading"
      className="relative overflow-hidden bg-iso-ice py-14 sm:py-16 lg:py-20"
    >
      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          <div className="flex flex-col lg:col-span-5">
            <SectionHeading
              as="h2"
              align="left"
              id="contact-coverage-heading"
              eyebrow="Proudly serving our community"
              lines={['Proudly Serving', 'These Local Areas']}
              lead={`${coverageRegions.length} regions and ${serviceAreaCount}+ named communities, all handled from our ${siteConfig.address.city} base — coverage is confirmed with your ZIP before anything is booked.`}
              className="max-w-[32rem]"
            />

            <dl className="fade-up mt-7 grid grid-cols-3 divide-x divide-navy/10 border-y border-navy/10">
              {STATS.map((stat) => (
                <div key={stat.label} className="px-3 py-3.5 first:pl-0 last:pr-0 sm:px-5">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-[clamp(1.2rem,2.4vw,1.55rem)] font-extrabold leading-none tracking-tight text-navy">
                      {stat.value}
                    </span>
                    <span className="mt-1.5 block text-[0.56rem] uppercase leading-snug tracking-[0.14em] text-iso-charcoal/55">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="fade-up mt-auto flex flex-col gap-3 pt-7 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href="#request-service" className="whitespace-nowrap">
                Request service
              </Button>
              {phoneHref && siteConfig.phone && (
                <a
                  href={phoneHref}
                  className="inline-flex items-center gap-2.5 whitespace-nowrap border border-navy/20 px-4 py-3 font-display text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-navy/80 transition hover:border-navy/50 hover:text-navy"
                >
                  <Phone className="h-4 w-4 text-iso-orange" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
              )}
            </div>
          </div>

          <div className="fade-up flex flex-col lg:col-span-7">
            <div className="flex flex-1 flex-col border border-navy/10 bg-white p-2 shadow-[0_30px_70px_-50px_rgba(20,44,86,0.85)] sm:p-3">
              <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-2.5 pt-1 sm:px-3">
                <p className="font-display text-[0.6rem] font-semibold uppercase tracking-wide2 text-navy/60">
                  Service coverage map
                </p>
                <span className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.14em] text-iso-charcoal/55">
                  <MapPin className="h-3.5 w-3.5 text-iso-orange" aria-hidden="true" />
                  {siteConfig.address.city}, {siteConfig.address.stateAbbr}
                </span>
              </div>

              <div className="relative min-h-[17rem] flex-1 overflow-hidden rounded-sm bg-iso-ice">
                <iframe
                  title={`Google Map of the ${siteConfig.name} service coverage region around ${siteConfig.address.city}, ${siteConfig.address.stateAbbr}`}
                  src={COVERAGE_MAP_EMBED}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                />

                <div className="pointer-events-none absolute bottom-3 left-3 max-w-[15rem] border border-navy/10 bg-white/95 px-3.5 py-2.5 shadow-[0_18px_40px_-28px_rgba(20,44,86,0.9)] backdrop-blur-sm">
                  <p className="font-display text-[0.54rem] font-semibold uppercase tracking-[0.18em] text-iso-orange">
                    Coverage
                  </p>
                  <p className="mt-1 text-[0.74rem] leading-snug text-navy">
                    {coverageRegions.map((region) => region.label).join(' · ')}
                  </p>
                </div>
              </div>
            </div>

            <ul className="fade-up mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
              {coverageRegions.map((region) => (
                <li
                  key={region.label}
                  className="group flex items-center gap-1.5 whitespace-nowrap border border-navy/10 bg-white px-2.5 py-2 text-[0.68rem] font-medium leading-tight text-navy/75 transition duration-300 hover:border-iso-orange/40 hover:text-navy"
                >
                  <MapPin
                    className="h-3 w-3 shrink-0 text-iso-orange/80 transition group-hover:text-iso-orange"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  {region.label}
                </li>
              ))}
            </ul>

            <p className="mt-2.5 text-[0.72rem] leading-relaxed text-iso-charcoal/60">
              Don’t see your town?{' '}
              <a
                href="#request-service"
                className="font-semibold text-iso-orange transition hover:text-navy"
              >
                Send your ZIP →
              </a>{' '}
              coverage is confirmed per request.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
