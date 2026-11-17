import { useState } from 'react';
import { Send, Mail, Clock, Wrench, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { activeServices } from '../../data/services';

const SERVICE_OPTIONS = activeServices.map((service) => ({
  value: service.id,
  label: service.label,
}));

export default function ServiceRequestForm() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('submitted');
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
      {/* Left: context */}
      <aside className="lg:col-span-4">
        <div className="flex h-full flex-col border border-navy/10 bg-white p-6 shadow-[0_20px_50px_-40px_rgba(20,44,86,0.5)] sm:p-7">
          <p className="font-display text-[0.58rem] font-semibold uppercase tracking-wide2 text-iso-blue">
            Request Service
          </p>
          <h2 className="mt-2 text-[1.55rem] font-bold leading-tight text-navy sm:text-[1.75rem]">
            Tell us what your space needs
          </h2>
          <p className="mt-3 text-[0.92rem] leading-relaxed text-iso-charcoal/70">
            Share a few details and we’ll follow up with clear next steps — no autoresponders,
            no guesswork.
          </p>

          <ul className="mt-7 space-y-5 border-t border-navy/10 pt-6">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-navy/15 bg-iso-soft-white">
                <Mail className="h-4 w-4 text-iso-blue" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-[0.56rem] uppercase tracking-wide2 text-navy/50">
                  Phone &amp; email
                </p>
                {siteConfig.phone || siteConfig.email ? (
                  <p className="mt-0.5 text-[0.88rem] font-semibold text-navy">
                    {siteConfig.phone && <span className="block">{siteConfig.phone}</span>}
                    {siteConfig.email && <span className="block">{siteConfig.email}</span>}
                  </p>
                ) : (
                  <p className="mt-0.5 text-[0.8rem] leading-relaxed text-iso-charcoal/60">
                    To be published as soon as confirmed.
                  </p>
                )}
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-navy/15 bg-iso-soft-white">
                <Clock className="h-4 w-4 text-iso-orange" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-[0.56rem] uppercase tracking-wide2 text-navy/50">
                  What to expect
                </p>
                <p className="mt-0.5 text-[0.88rem] font-semibold text-navy">
                  A real reply, not an autoresponder
                </p>
                <p className="text-[0.8rem] leading-relaxed text-iso-charcoal/60">
                  We confirm scope and timing with you first.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-navy/15 bg-iso-soft-white">
                <MapPin className="h-4 w-4 text-navy" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-[0.56rem] uppercase tracking-wide2 text-navy/50">
                  Service area
                </p>
                <p className="mt-0.5 text-[0.88rem] font-semibold text-navy">
                  {siteConfig.address.city}, {siteConfig.address.stateAbbr} &amp; nearby
                </p>
                <p className="text-[0.8rem] leading-relaxed text-iso-charcoal/60">
                  Share your ZIP so we can confirm coverage.
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-7 flex flex-wrap gap-4 border-t border-navy/10 pt-5 lg:mt-auto">
            <span className="flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-navy/60">
              <span className="h-2 w-2 rounded-full bg-iso-orange" /> Heating
            </span>
            <span className="flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-navy/60">
              <span className="h-2 w-2 rounded-full bg-iso-blue" /> Cooling
            </span>
            <span className="flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-navy/60">
              <span className="h-2 w-2 rounded-full bg-navy" /> Systems
            </span>
          </div>
        </div>
      </aside>

      {/* Right: form */}
      <div className="flex flex-col lg:col-span-8">
        <div className="flex flex-1 flex-col border border-navy/10 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(20,44,86,0.55)] sm:p-7 lg:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-navy/10 pb-5">
            <div>
              <p className="font-display text-[0.58rem] font-semibold uppercase tracking-wide2 text-iso-blue">
                Service request form
              </p>
              <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-iso-charcoal/65">
                All fields marked with <span className="text-iso-orange">*</span> are required so
                we can route your request correctly.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 border border-iso-orange/30 bg-iso-orange/5 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-iso-orange">
              <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
              Fast response
            </span>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="request-name" className="font-display text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-navy/55">
                Name <span className="text-iso-orange">*</span>
              </label>
              <input
                id="request-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Your name"
                className="w-full border-b border-navy/20 bg-transparent pb-2.5 text-[0.95rem] text-navy placeholder:text-navy/30 transition focus:border-iso-orange focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="request-email" className="font-display text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-navy/55">
                Email <span className="text-iso-orange">*</span>
              </label>
              <input
                id="request-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full border-b border-navy/20 bg-transparent pb-2.5 text-[0.95rem] text-navy placeholder:text-navy/30 transition focus:border-iso-orange focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="request-phone" className="font-display text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-navy/55">
                Phone number <span className="text-iso-orange">*</span>
              </label>
              <input
                id="request-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                placeholder="(555) 012-3456"
                className="w-full border-b border-navy/20 bg-transparent pb-2.5 text-[0.95rem] text-navy placeholder:text-navy/30 transition focus:border-iso-orange focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="request-zipcode" className="font-display text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-navy/55">
                ZIP code <span className="text-iso-orange">*</span>
              </label>
              <input
                id="request-zipcode"
                name="zipcode"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                required
                placeholder="21108"
                className="w-full border-b border-navy/20 bg-transparent pb-2.5 text-[0.95rem] text-navy placeholder:text-navy/30 transition focus:border-iso-orange focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="request-service" className="font-display text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-navy/55">
                Service <span className="text-iso-orange">*</span>
              </label>
              <div className="relative">
                <select
                  id="request-service"
                  name="service"
                  required
                  defaultValue=""
                  className="w-full appearance-none border border-navy/15 bg-iso-soft-white/60 px-4 py-3 pr-10 text-[0.95rem] text-navy transition focus:border-iso-orange focus:bg-white focus:outline-none"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                  <option value="other">Something else / Not sure</option>
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-navy/40" aria-hidden="true">
                  ▾
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="request-message" className="font-display text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-navy/55">
                Message <span className="normal-case tracking-normal text-navy/35">(optional)</span>
              </label>
              <textarea
                id="request-message"
                name="message"
                rows={4}
                placeholder="Tell us about your system, the issue, preferred timing, or anything else that helps us prepare."
                className="w-full resize-y border border-navy/15 bg-iso-soft-white/40 px-4 py-3 text-[0.95rem] leading-relaxed text-navy placeholder:text-navy/30 transition focus:border-iso-orange focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-4 border-t border-navy/10 pt-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="btn-primary inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-[0.78rem]"
              >
                <span>Send request</span>
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>

              {status === 'submitted' ? (
                <p className="flex items-start gap-2 text-[0.8rem] leading-relaxed text-iso-blue">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Request captured in your browser. Connect a backend to deliver it.</span>
                </p>
              ) : (
                <p className="flex items-start gap-2 text-[0.78rem] leading-relaxed text-navy/45">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>We’ll review your details and follow up with next steps.</span>
                </p>
              )}
            </div>
          </form>

          <div className="-mx-6 -mb-6 mt-6 flex items-start gap-3 border-t border-navy/10 bg-iso-ice/70 px-5 py-3.5 sm:-mx-7 sm:-mb-7 sm:px-6 lg:-mx-8 lg:-mb-8 lg:px-8">
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-iso-orange/10">
              <Wrench className="h-3.5 w-3.5 text-iso-orange" aria-hidden="true" />
            </span>
            <p className="text-[0.82rem] leading-relaxed text-iso-charcoal/70">
              Not sure which service fits? Pick the closest option or choose{' '}
              <span className="font-semibold text-navy">“Something else / Not sure”</span> and
              describe the issue in your message.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
