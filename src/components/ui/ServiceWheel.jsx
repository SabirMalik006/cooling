import { useRef } from 'react';
import { getIcon } from './iconRegistry';

const TONE = {
  cooling: {
    text: 'text-iso-blue',
    bg: 'bg-iso-blue',
    border: 'border-iso-blue',
    halo: 'shadow-[0_0_0_6px_rgba(7,133,214,0.16),0_18px_38px_-16px_rgba(0,0,0,0.9)]',
  },
  heating: {
    text: 'text-iso-orange',
    bg: 'bg-iso-orange',
    border: 'border-iso-orange',
    halo: 'shadow-[0_0_0_6px_rgba(244,90,10,0.16),0_18px_38px_-16px_rgba(0,0,0,0.9)]',
  },
  systems: {
    text: 'text-white',
    bg: 'bg-white',
    border: 'border-white',
    halo: 'shadow-[0_0_0_6px_rgba(255,255,255,0.12),0_18px_38px_-16px_rgba(0,0,0,0.9)]',
  },
};

const MARKER_TRACK = 160;

function DialFace() {
  const steps = Array.from({ length: 12 }, (_, index) => index * 30);
  const knurl = Array.from({ length: 72 }, (_, index) => index * 5);

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 400 400"
      fill="none"
    >
      <defs>
        <radialGradient id="dial-face" cx="50%" cy="38%" r="72%">
          <stop offset="0%" stopColor="#1B3466" stopOpacity="0.85" />
          <stop offset="62%" stopColor="#102344" stopOpacity="0.78" />
          <stop offset="100%" stopColor="#071426" stopOpacity="0.92" />
        </radialGradient>
        <linearGradient id="dial-rim" x1="30" y1="10" x2="370" y2="390">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="dial-accent" x1="60" y1="20" x2="340" y2="380">
          <stop offset="0%" stopColor="#0785D6" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#F45A0A" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#0785D6" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* knob body */}
      <circle cx="200" cy="200" r="197" fill="url(#dial-face)" stroke="url(#dial-rim)" strokeWidth="1.6" />
      <circle cx="200" cy="200" r="188" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="1" />

      {/* knurled grip */}
      {knurl.map((angle) => (
        <line
          key={`knurl-${angle}`}
          x1="200"
          y1="10"
          x2="200"
          y2={angle % 30 === 0 ? '22' : angle % 15 === 0 ? '18' : '15'}
          stroke="#FFFFFF"
          strokeOpacity={angle % 30 === 0 ? '0.34' : angle % 15 === 0 ? '0.2' : '0.12'}
          strokeWidth={angle % 30 === 0 ? '1.4' : '1'}
          strokeLinecap="round"
          transform={`rotate(${angle} 200 200)`}
        />
      ))}

      {/* step markers aligned to the twelve services */}
      {steps.map((angle) => (
        <g key={`step-${angle}`} transform={`rotate(${angle} 200 200)`}>
          <line
            x1="200"
            y1="30"
            x2="200"
            y2="56"
            stroke="#FFFFFF"
            strokeOpacity="0.32"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="200" cy="62" r="1.9" fill="#F45A0A" fillOpacity="0.55" />
        </g>
      ))}

      {/* selector track + face rings */}
      <circle
        cx="200"
        cy={200}
        r={MARKER_TRACK}
        stroke="#FFFFFF"
        strokeOpacity="0.1"
        strokeWidth="1"
        strokeDasharray="2 7"
      />
      <circle cx="200" cy="200" r="138" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="1" />
      <circle cx="200" cy="200" r="112" stroke="#FFFFFF" strokeOpacity="0.06" strokeWidth="1" />

      {/* accent arc */}
      <path
        d="M200 14a186 186 0 0 1 108 34"
        stroke="url(#dial-accent)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M200 386a186 186 0 0 1-108-34"
        stroke="url(#dial-accent)"
        strokeWidth="3"
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
      style={{ '--wheel-size': 'min(80vw, 28rem)', width: 'min(80vw, 28rem)' }}
    >
      <div className="wheel__ring absolute inset-0">
        <DialFace />

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
                  transform: `rotate(${angle}deg) translateY(calc(var(--wheel-size) * -0.372)) rotate(${-angle}deg)`,
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
                      'wheel__marker-btn grid h-11 w-11 place-items-center rounded-full border backdrop-blur-sm sm:h-14 sm:w-14',
                      isActive
                        ? `${tone.bg} border-transparent text-navy ${tone.halo}`
                        : 'border-white/20 bg-navy-ink/80 text-white/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_22px_-16px_rgba(0,0,0,0.9)] hover:border-white/55 hover:text-white',
                      isActive && service.tone === 'systems' ? 'text-navy' : '',
                    ].join(' ')}
                  >
                    <Icon
                      className={`h-[1.1rem] w-[1.1rem] sm:h-5 sm:w-5 ${
                        isActive && service.tone === 'systems' ? 'text-navy' : ''
                      }`}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                    <span className="sr-only">{service.label}</span>
                  </button>

                  <span
                    className={`wheel__label hidden w-[4.9rem] text-center font-display text-[0.49rem] font-semibold uppercase leading-tight tracking-[0.05em] transition-colors duration-300 sm:block ${
                      isActive ? 'text-white' : 'text-white/40'
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

      {/* upright hub — reads like the centre of a physical selector knob */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 grid h-[calc(var(--wheel-size)*0.46)] w-[calc(var(--wheel-size)*0.46)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-navy-ink/90 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-20px_40px_-20px_rgba(0,0,0,0.9),0_24px_60px_-30px_rgba(0,0,0,0.95)] backdrop-blur-sm">
        <span
          aria-hidden="true"
          className="absolute inset-[7px] rounded-full border border-white/12"
        />
        <span
          aria-hidden="true"
          className="absolute inset-[13px] rounded-full border border-dashed border-white/[0.07]"
        />
        <span
          aria-hidden="true"
          className={`absolute left-1/2 top-[5px] h-2 w-2 -translate-x-1/2 rotate-45 rounded-[1px] ${
            active?.tone === 'heating'
              ? 'bg-iso-orange'
              : active?.tone === 'cooling'
                ? 'bg-iso-blue'
                : 'bg-white'
          }`}
        />

        <div className="relative px-4">
          <p className={`font-display text-[0.56rem] font-semibold uppercase tracking-[0.2em] ${activeTone.text}`}>
            {active?.tone === 'cooling' ? 'Cooling' : active?.tone === 'heating' ? 'Heating' : 'Systems'}
          </p>
          <p className="mt-1.5 font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-extrabold leading-none tracking-tight text-white">
            {String(activeIndex + 1).padStart(2, '0')}
          </p>
          <span className="mx-auto mt-2 flex items-center justify-center gap-1.5" aria-hidden="true">
            <span className="h-px w-4 bg-white/20" />
            <span className="h-1 w-1 rounded-full bg-iso-orange/80" />
            <span className="h-px w-4 bg-white/20" />
          </span>
          <p className="mt-1.5 font-display text-[0.54rem] uppercase tracking-[0.2em] text-white/45">
            of {String(count).padStart(2, '0')}
          </p>
        </div>
      </div>
    </div>
  );
}
