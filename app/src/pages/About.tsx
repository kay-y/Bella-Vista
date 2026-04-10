import { teamMembers } from '@/data/menu';
import { Award, Star, Clock, Heart } from 'lucide-react';

const stats = [
  { icon: Star, value: '25+', label: 'Years of Excellence' },
  { icon: Award, value: '2', label: 'Michelin Stars' },
  { icon: Clock, value: '1998', label: 'Established' },
  { icon: Heart, value: '50K+', label: 'Happy Guests' },
];

export default function About() {
  return (
    <main className="min-h-screen bg-[#0B0F1C]">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/private_room_table.jpg"
            alt="Bella Vista interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1C]/60 via-[#0B0F1C]/50 to-[#0B0F1C]" />
        </div>
        <div className="relative z-10 text-center px-6">
          <p className="text-[#D4A15A] text-sm font-medium uppercase tracking-[0.25em] mb-4">
            Our Story
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl text-[#F4F1EA] mb-6">
            Crafted with Intention
          </h1>
          <p className="text-[#A9B3C7] text-lg max-w-2xl mx-auto">
            A quarter-century of passion, tradition, and the pursuit of culinary excellence.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 lg:py-32">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-serif text-4xl lg:text-5xl text-[#F4F1EA] mb-6">
                  The Beginning of a Legacy
                </h2>
                <div className="w-16 h-px bg-[#D4A15A] mb-8" />
                <div className="space-y-6 text-[#A9B3C7] leading-relaxed">
                  <p>
                    Founded in 1998 by Chef Antonio Rossi, Bella Vista began as a small trattoria 
                    with a simple mission: to bring the authentic flavors of Italy to the heart of 
                    New York City. What started as a 20-seat restaurant has grown into one of the 
                    city's most celebrated dining destinations.
                  </p>
                  <p>
                    Our kitchen builds every dish around a few perfect ingredients—simple on paper, 
                    memorable on the plate. We source the finest seasonal produce from local farms 
                    and import specialty ingredients directly from Italy to ensure authenticity in 
                    every bite.
                  </p>
                  <p>
                    Today, under the leadership of Executive Chef Marco Rossi, Bella Vista continues 
                    to honor its heritage while embracing modern techniques and innovative presentations. 
                    Our commitment to excellence has earned us two Michelin stars and the loyalty of 
                    discerning diners from around the world.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/images/events_toast.jpg"
                  alt="Celebration at Bella Vista"
                  className="w-full h-[500px] object-cover rounded-lg"
                />
                <div className="absolute -bottom-8 -left-8 bg-[#141B2D] p-8 rounded-lg border border-[#F4F1EA]/10 max-w-xs hidden lg:block">
                  <p className="font-serif text-2xl text-[#F4F1EA] mb-2">
                    "La cucina è amore"
                  </p>
                  <p className="text-[#A9B3C7] text-sm">
                    Cooking is love made visible
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#141B2D]">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="w-14 h-14 bg-[#D4A15A]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-[#D4A15A]" />
                  </div>
                  <p className="font-serif text-4xl lg:text-5xl text-[#F4F1EA] mb-2">
                    {stat.value}
                  </p>
                  <p className="text-[#A9B3C7] text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 lg:py-32">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="/images/chef_kitchen_portrait.jpg"
                  alt="Chef in kitchen"
                  className="w-full h-[500px] object-cover rounded-lg"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="font-serif text-4xl lg:text-5xl text-[#F4F1EA] mb-6">
                  Our Philosophy
                </h2>
                <div className="w-16 h-px bg-[#D4A15A] mb-8" />
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[#F4F1EA] font-medium text-lg mb-2">
                      Respect for Ingredients
                    </h3>
                    <p className="text-[#A9B3C7] leading-relaxed">
                      We believe that exceptional dishes begin with exceptional ingredients. 
                      That's why we work directly with farmers, fishermen, and artisan producers 
                      who share our commitment to quality.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[#F4F1EA] font-medium text-lg mb-2">
                      Tradition Meets Innovation
                    </h3>
                    <p className="text-[#A9B3C7] leading-relaxed">
                      While we honor classic Italian recipes passed down through generations, 
                      we're not afraid to experiment with modern techniques and unexpected 
                      flavor combinations.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[#F4F1EA] font-medium text-lg mb-2">
                      Hospitality from the Heart
                    </h3>
                    <p className="text-[#A9B3C7] leading-relaxed">
                      Every guest who walks through our doors becomes part of the Bella Vista 
                      family. Our team is dedicated to creating warm, memorable experiences 
                      that keep you coming back.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 lg:py-32 bg-[#141B2D]">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#D4A15A] text-sm font-medium uppercase tracking-[0.25em] mb-4">
                Our Team
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl text-[#F4F1EA] mb-6">
                Meet the People Behind the Magic
              </h2>
              <p className="text-[#A9B3C7] max-w-2xl mx-auto">
                A dedicated team of culinary artists and hospitality professionals committed to excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="group bg-[#0B0F1C] border border-[#F4F1EA]/10 rounded-lg overflow-hidden hover:border-[#D4A15A]/30 transition-all duration-500"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-[#F4F1EA] mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[#D4A15A] text-sm font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-[#A9B3C7] text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ambiance Gallery */}
      <section className="py-24 lg:py-32">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#D4A15A] text-sm font-medium uppercase tracking-[0.25em] mb-4">
                The Space
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl text-[#F4F1EA] mb-6">
                An Atmosphere of Elegance
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  src="/images/experience_dining_room.jpg"
                  alt="Main dining room"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  src="/images/wine_pour.jpg"
                  alt="Wine service"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  src="/images/exterior_night.jpg"
                  alt="Restaurant exterior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
