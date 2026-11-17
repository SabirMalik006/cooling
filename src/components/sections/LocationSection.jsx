import { ArrowUpRight, Clock3, MapPin, Phone } from 'lucide-react';

import { siteConfig } from '../../data/siteConfig';
import { hq } from '../../data/serviceAreas';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const FULL_ADDRESS = `${siteConfig.address.line1}, ${siteConfig.address.line2}`;
const ADDRESS_QUERY = encodeURIComponent(FULL_ADDRESS);
const MAP_EMBED = `https://www.google.com/maps?q=${ADDRESS_QUERY}&z=15&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${ADDRESS_QUERY}`;

export default function LocationSection() {
  const phoneHref = siteConfig.phone ? `tel:${siteConfig.phone.replace(/[^\d+]/g, '')}` : null;

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-iso-ice/70 blur-3xl"
      />

      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          <div className="flex flex-col lg:col-span-5">
            <SectionHeading
              as="h2"
              align="left"
              id="location-heading"
              eyebrow="Our location"
              lines={['Find Us', 'Easily']}
              lead={`We’re based in ${hq.city}, ${hq.state} — minutes from Glen Burnie, Severna Park and Annapolis. Visits are by appointment, so call ahead and we’ll confirm a time that works.`}
              className="max-w-[32rem]"
            />

            <address className="fade-up mt-7 flex items-start gap-4 border border-navy/10 bg-iso-soft-white p-5 not-italic">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-iso-orange/10">
                <MapPin className="h-[1.1rem] w-[1.1rem] text-iso-orange" strokeWidth={1.9} aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-[0.58rem] font-semibold uppercase tracking-wide2 text-iso-orange">
                  {hq.label}
                </p>
                <p className="mt-1.5 font-display text-[1.05rem] font-bold leading-snug text-navy">
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                </p>
                <p className="mt-1.5 text-[0.8rem] leading-relaxed text-iso-charcoal/65">{hq.note}</p>
              </div>
            </address>

            <ul className="fade-up mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.74rem] text-iso-charcoal/70">
              <li className="flex items-center gap-2">
                <Clock3 className="h-3.5 w-3.5 shrink-0 text-iso-blue" strokeWidth={1.9} aria-hidden="true" />
                Visits by appointment
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-iso-orange" aria-hidden="true" />
                {hq.city} · {siteConfig.address.stateAbbr} {siteConfig.address.postalCode}
              </li>
            </ul>

            <div className="fade-up mt-auto flex flex-col gap-3 pt-7 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href={DIRECTIONS_URL} external variant="primary" className="whitespace-nowrap">
                Get Directions
              </Button>
              {phoneHref && siteConfig.phone && (
                <a
                  href={phoneHref}
                  className="btn-outline-dark inline-flex items-center justify-center gap-2.5 whitespace-nowrap"
                >
                  <Phone className="h-4 w-4 text-iso-orange" strokeWidth={1.9} aria-hidden="true" />
                  {siteConfig.phone}
                </a>
              )}
            </div>
          </div>

          <div className="fade-up flex lg:col-span-7">
            <div className="flex w-full flex-col border border-navy/10 bg-white p-2 shadow-[0_30px_70px_-50px_rgba(20,44,86,0.85)] sm:p-3">
              <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-2.5 pt-1 sm:px-3">
                <p className="font-display text-[0.6rem] font-semibold uppercase tracking-wide2 text-navy/60">
                  {siteConfig.name} · {hq.city}
                </p>
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 font-display text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-navy/60 transition hover:text-iso-orange"
                >
                  Open in Maps
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>

              <div className="relative min-h-[17rem] flex-1 overflow-hidden rounded-sm bg-iso-ice">
                <iframe
                  title={`Google Map showing ${siteConfig.name} at ${FULL_ADDRESS}`}
                  src={MAP_EMBED}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                />

                <div className="pointer-events-none absolute bottom-3 left-3 max-w-[15rem] border border-navy/10 bg-white/95 px-3.5 py-2.5 shadow-[0_18px_40px_-28px_rgba(20,44,86,0.9)] backdrop-blur-sm">
                  <p className="flex items-center gap-2 font-display text-[0.54rem] font-semibold uppercase tracking-[0.18em] text-iso-orange">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {hq.label}
                  </p>
                  <p className="mt-1 text-[0.74rem] leading-snug text-navy">
                    {siteConfig.address.line1}
                    <br />
                    {siteConfig.address.line2}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
