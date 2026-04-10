import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Utensils, Wine, Users } from 'lucide-react';

function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = hero.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_plate_hands.jpg"
          alt="Fine dining experience"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1C]/60 via-[#0B0F1C]/40 to-[#0B0F1C]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 pt-32 pb-20">
        <div className="max-w-4xl">
          <p className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100 text-[#D4A15A] text-sm font-medium uppercase tracking-[0.25em] mb-6">
            Bella Vista — Since 1998
          </p>
          <h1 className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200 font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold text-[#F4F1EA] leading-[0.95] mb-8">
            Modern Italian.
            <br />
            <span className="text-[#D4A15A]">Timeless Flavor.</span>
          </h1>
          <p className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-300 text-[#A9B3C7] text-lg lg:text-xl max-w-xl leading-relaxed mb-10">
            Seasonal plates, handmade pasta, and an award-winning cellar—served by candlelight.
          </p>
          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-400 flex flex-wrap gap-4">
            <Link to="/reservation" className="btn-gold inline-flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Reserve a Table
            </Link>
            <Link
              to="/menu"
              className="px-7 py-3.5 border border-[#F4F1EA]/30 text-[#F4F1EA] rounded-md hover:bg-[#F4F1EA]/10 transition-all duration-300 inline-flex items-center gap-2"
            >
              <Utensils className="w-4 h-4" />
              View Menu
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-[#F4F1EA]/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#D4A15A] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  link,
  linkText,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  linkText: string;
}) {
  return (
    <div className="group p-8 bg-[#141B2D]/50 border border-[#F4F1EA]/10 rounded-lg hover:border-[#D4A15A]/30 transition-all duration-500">
      <div className="w-14 h-14 bg-[#D4A15A]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#D4A15A]/20 transition-colors">
        <Icon className="w-6 h-6 text-[#D4A15A]" />
      </div>
      <h3 className="font-serif text-2xl text-[#F4F1EA] mb-3">{title}</h3>
      <p className="text-[#A9B3C7] text-sm leading-relaxed mb-6">{description}</p>
      <Link
        to={link}
        className="inline-flex items-center gap-2 text-[#D4A15A] text-sm font-medium hover:gap-3 transition-all"
      >
        {linkText}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#0B0F1C]">
      <div className="w-full px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#D4A15A] text-sm font-medium uppercase tracking-[0.25em] mb-4">
            The Experience
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-[#F4F1EA] mb-6">
            Dining as it should be
          </h2>
          <p className="text-[#A9B3C7] leading-relaxed">
            We keep the room intimate—low light, linen, and warm service—so the food stays center stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={Utensils}
            title="Seasonal Menu"
            description="Antipasti, handmade pasta, and mains built around what's fresh."
            link="/menu"
            linkText="Explore Menu"
          />
          <FeatureCard
            icon={Wine}
            title="Wine Cellar"
            description="From crisp aperitivi to cellar-worthy reds, curated to complement."
            link="/menu"
            linkText="See the Cellar"
          />
          <FeatureCard
            icon={Users}
            title="Private Events"
            description="Birthdays, anniversaries, milestones—we handle the details."
            link="/reservation"
            linkText="Plan an Event"
          />
          <FeatureCard
            icon={Calendar}
            title="Reservations"
            description="Reserve ahead for dinner, or walk in for drinks at the bar."
            link="/reservation"
            linkText="Book Now"
          />
        </div>
      </div>
    </section>
  );
}

function SplitSection({
  image,
  imageAlt,
  title,
  subtitle,
  description,
  ctaLink,
  ctaText,
  reversed = false,
}: {
  image: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  description: string;
  ctaLink: string;
  ctaText: string;
  reversed?: boolean;
}) {
  return (
    <section className="py-0 bg-[#0B0F1C]">
      <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh]">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 flex items-center bg-[#141B2D]">
          <div className="px-8 lg:px-16 xl:px-24 py-16 lg:py-0">
            <p className="text-[#D4A15A] text-sm font-medium uppercase tracking-[0.25em] mb-4">
              {subtitle}
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-[#F4F1EA] leading-tight mb-6">
              {title}
            </h2>
            <div className="w-16 h-px bg-[#D4A15A] mb-6" />
            <p className="text-[#A9B3C7] leading-relaxed mb-8 max-w-md">
              {description}
            </p>
            <Link
              to={ctaLink}
              className="inline-flex items-center gap-2 text-[#D4A15A] font-medium hover:gap-3 transition-all"
            >
              {ctaText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-[#0B0F1C] relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img
          src="/images/exterior_night.jpg"
          alt="Restaurant exterior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B0F1C]/80" />
      </div>
      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-[#F4F1EA] mb-6">
            Reserve Your Table
          </h2>
          <p className="text-[#A9B3C7] text-lg leading-relaxed mb-10">
            We'll confirm within the hour. For same-day requests, call us directly at{' '}
            <a href="tel:+12125550147" className="text-[#D4A15A] hover:underline">
              (212) 555-0147
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/reservation" className="btn-gold">
              Request Reservation
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3.5 border border-[#F4F1EA]/30 text-[#F4F1EA] rounded-md hover:bg-[#F4F1EA]/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="bg-[#0B0F1C]">
      <HeroSection />
      <FeaturesSection />
      <SplitSection
        image="/images/experience_dining_room.jpg"
        imageAlt="Elegant dining room"
        title="An intimate atmosphere"
        subtitle="The Experience"
        description="Our dining room is designed to transport you to the heart of Italy. With candlelit tables, soft ambient lighting, and attentive service, every meal becomes a memorable occasion."
        ctaLink="/about"
        ctaText="Discover Our Story"
      />
      <SplitSection
        image="/images/menu_pasta_plate.jpg"
        imageAlt="Fresh pasta dish"
        title="A menu that follows the seasons"
        subtitle="The Cuisine"
        description="From handmade pasta crafted daily to the finest seasonal ingredients sourced from local farms and Italian imports, our menu celebrates the best of Italian gastronomy."
        ctaLink="/menu"
        ctaText="View Our Dishes"
        reversed
      />
      <SplitSection
        image="/images/wine_pour.jpg"
        imageAlt="Wine selection"
        title="Wine, chosen to complement"
        subtitle="The Cellar"
        description="Our sommelier has curated an exceptional collection of over 500 wines from Italy's finest vineyards. From crisp whites to bold reds, each bottle is selected to enhance your dining experience."
        ctaLink="/menu"
        ctaText="Explore the Cellar"
      />
      <CTASection />
    </main>
  );
}
