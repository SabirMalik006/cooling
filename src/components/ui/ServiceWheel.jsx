import { useRef } from 'react';
import { getIcon } from './iconRegistry';

const TONE = {
  cooling: { text: 'text-iso-blue', bg: 'bg-iso-blue', border: 'border-iso-blue' },
  heating: { text: 'text-iso-orange', bg: 'bg-iso-orange', border: 'border-iso-orange' },
  systems: { text: 'text-white', bg: 'bg-white', border: 'border-white' },
};

function DecorativeRings() {
  const teeth = Array.from({ length: 12 }, (_, index) => index * 30);
  const innerNotches = Array.from({ length: 24 }, (_, index) => index * 15);

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full text-white/25"
      viewBox="0 0 400 400"
      fill="none"
    >
      <defs>
        <linearGradient id="gear-accent" x1="40" y1="40" x2="360" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0785D6" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#F45A0A" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* gear teeth */}
      {teeth.map((angle) => (
        <g key={angle} transform={`rotate(${angle} 200 200)`}>
          <rect
            x="182"
            y="6"
            width="36"
            height="26"
            rx="5"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="0.8"
          />
          <rect x="186" y="10" width="28" height="5" rx="2" fill="#F45A0A" fillOpacity="0.18" />
        </g>
      ))}

      {/* gear body rings */}
      <circle cx="200" cy="200" r="176" fill="rgba(255,255,255,0.02)" stroke="url(#gear-accent)" strokeWidth="1.2" />
      <circle cx="200" cy="200" r="164" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.35" />
      <circle cx="200" cy="200" r="142" stroke="currentColor" strokeWidth="0.7" strokeDasharray="6 8" strokeOpacity="0.4" />
      <circle cx="200" cy="200" r="110" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.35" />

      {/* inner gear notches */}
      {innerNotches.map((angle) => (
        <line
          key={`notch-${angle}`}
          x1="200"
          y1="86"
          x2="200"
          y2={angle % 30 === 0 ? '104' : '96'}
          stroke="currentColor"
          strokeWidth={angle % 30 === 0 ? '1.1' : '0.5'}
          strokeOpacity={angle % 30 === 0 ? '0.45' : '0.25'}
          strokeLinecap="round"
          transform={`rotate(${angle} 200 200)`}
        />
      ))}

      {/* hub spokes */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <g key={`spoke-${angle}`} transform={`rotate(${angle} 200 200)`}>
          <line x1="200" y1="112" x2="200" y2="148" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="200" cy="122" r="3" fill="#0785D6" fillOpacity="0.45" />
        </g>
      ))}

      {/* accent arcs */}
      <path
        d="M200 24a176 176 0 0 1 124 52"
        stroke="#F45A0A"
        strokeWidth="2.2"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M200 376a176 176 0 0 1-124-52"
        stroke="#0785D6"
        strokeWidth="2.2"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Custom mechanical service dial.
 * The ring layer (marks + markers) follows the scroll-driven `--rot` variable,
 * while every marker's content counter-rotates so labels stay upright.
 */
export default function ServiceWheel({ services, activeIndex, onSelect }) {
  const listRef = useRef(null);
  const count = services.length;
  const step = 360 / Math.max(count, 1);
  const active = services[activeIndex];
  const activeTone = TONE[active?.tone] || TONE.systems;

  const handleKeyDown = (event) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      return;
    }
    event.preventDefault();
    let next = activeIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (activeIndex + 1) % count;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (activeIndex - 1 + count) % count;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = count - 1;
    onSelect(next);
    listRef.current?.querySelectorAll('button')[next]?.focus();
  };

  return (
    <div
      className="wheel relative mx-auto aspect-square"
      style={{ '--wheel-size': 'min(76vw, 27rem)', width: 'min(76vw, 27rem)' }}
    >
      <div className="wheel__ring absolute inset-0">
        <DecorativeRings />

        <ol
          ref={listRef}
          className="absolute inset-0 list-none"
          aria-label="HVAC services"
          onKeyDown={handleKeyDown}
        >
          {services.map((service, index) => {
            const Icon = getIcon(service.icon);
            const isActive = index === activeIndex;
            const tone = TONE[service.tone] || TONE.systems;
            const angle = index * step - 90;

            return (
              <li
                key={service.id}
                className="absolute left-1/2 top-1/2 h-0 w-0"
                style={{
                  transform: `rotate(${angle}deg) translateY(calc(var(--wheel-size) * -0.4)) rotate(${-angle}deg)`,
                }}
              >
                <div className="wheel__marker-inner flex flex-col items-center gap-2">
                  <button
                    type="button"
                    data-active={isActive}
                    data-tone={service.tone}
                    aria-pressed={isActive}
                    onClick={() => onSelect(index)}
                    title={service.label}
                    className={[
                      'wheel__marker-btn grid h-12 w-12 place-items-center rounded-full border backdrop-blur-sm sm:h-16 sm:w-16',
                      isActive
                        ? `${tone.bg} border-transparent text-navy shadow-[0_16px_40px_-18px_rgba(0,0,0,0.9)]`
                        : 'border-white/25 bg-navy-ink/70 text-white/70 hover:border-white/60 hover:text-white',
                      isActive && service.tone === 'systems' ? 'text-navy' : '',
                    ].join(' ')}
                  >
                    <Icon
                      className={`h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem] ${
                        isActive && service.tone === 'systems' ? 'text-navy' : ''
                      }`}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <span className="sr-only">{service.label}</span>
                  </button>

                  <span
                    className={`wheel__label hidden w-[5.8rem] text-center font-display text-[0.54rem] font-semibold uppercase leading-tight tracking-[0.08em] transition-colors duration-300 sm:block ${
                      isActive ? 'text-white' : 'text-white/45'
                    }`}
                  >
                    {service.shortLabel}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* upright hub */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 grid h-[calc(var(--wheel-size)*0.44)] w-[calc(var(--wheel-size)*0.44)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-navy-ink/80 text-center backdrop-blur-sm">
        <div className="px-4">
          <p className={`font-display text-[0.6rem] font-semibold uppercase tracking-wide2 ${activeTone.text}`}>
            {active?.tone === 'cooling' ? 'Cooling' : active?.tone === 'heating' ? 'Heating' : 'Systems'}
          </p>
          <p className="mt-1 font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-none text-white">
            {String(activeIndex + 1).padStart(2, '0')}
          </p>
          <span className="mx-auto mt-2 block h-px w-10 bg-white/25" aria-hidden="true" />
          <p className="mt-2 font-display text-[0.58rem] uppercase tracking-[0.18em] text-white/50">
            of {String(count).padStart(2, '0')}
          </p>
        </div>
      </div>
    </div>
  );
}
