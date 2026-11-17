import HeroSection from '../components/sections/HeroSection';
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection';
import ServicesWheelSection from '../components/sections/ServicesWheelSection';
import ServiceAreasSection from '../components/sections/ServiceAreasSection';
import ServiceCoverageSection from '../components/sections/ServiceCoverageSection';
import PartnersSection from '../components/sections/PartnersSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUsSection />
      <ServicesWheelSection />
      <ServiceAreasSection />
      <ServiceCoverageSection />
      <PartnersSection />
    </>
  );
}
