/**
 * Central business configuration.
 * Update real business details here — presentation components read from this file.
 */

export const siteConfig = {
  name: 'ISO Mechanical',
  legalName: 'ISO Mechanical',
  fullName: 'ISO Mechanical — Heating & Cooling Services',
  tagline: 'Heating & Cooling Services',
  description:
    'Reliable heating and cooling solutions designed to bring lasting comfort to your home and workplace.',

  address: {
    line1: '690 Paddle Wheel Ct W',
    line2: 'Millersville, MD 21108',
    country: 'United States',
    city: 'Millersville',
    state: 'Maryland',
    stateAbbr: 'MD',
    postalCode: '21108',
  },

  // Confirmed contact channels only. Update as needed — the UI shows these when set.
  phone: '(410) 555-0198',
  email: null,
  hours: null,

  cta: {
    primary: { label: 'Schedule a Service', href: '/contact-us' },
    secondary: { label: 'Explore Our Services', href: '/#services' },
  },

  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/#services' },
    { label: 'Service Areas', href: '/#service-areas' },
  ],

  social: [],

  legal: [],
};

export default siteConfig;
