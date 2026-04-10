import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B0F1C] border-t border-[#F4F1EA]/10">
      <div className="w-full px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="font-serif text-3xl font-semibold text-[#F4F1EA] tracking-tight block mb-6"
            >
              Bella Vista
            </Link>
            <p className="text-[#A9B3C7] text-sm leading-relaxed mb-6">
              Modern Italian cuisine served with timeless elegance. Experience the art of dining.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#F4F1EA]/20 flex items-center justify-center text-[#A9B3C7] hover:text-[#D4A15A] hover:border-[#D4A15A] transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#F4F1EA]/20 flex items-center justify-center text-[#A9B3C7] hover:text-[#D4A15A] hover:border-[#D4A15A] transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#F4F1EA] font-medium uppercase tracking-[0.18em] text-sm mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Our Menu', path: '/menu' },
                { name: 'About Us', path: '/about' },
                { name: 'Reservations', path: '/reservation' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#A9B3C7] hover:text-[#D4A15A] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[#F4F1EA] font-medium uppercase tracking-[0.18em] text-sm mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4A15A] mt-0.5 flex-shrink-0" />
                <span className="text-[#A9B3C7] text-sm">
                  42 Via Roma, Downtown<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4A15A] flex-shrink-0" />
                <a
                  href="tel:+12125550147"
                  className="text-[#A9B3C7] hover:text-[#D4A15A] transition-colors text-sm"
                >
                  (212) 555-0147
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4A15A] flex-shrink-0" />
                <a
                  href="mailto:hello@bellavista.co"
                  className="text-[#A9B3C7] hover:text-[#D4A15A] transition-colors text-sm"
                >
                  hello@bellavista.co
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[#F4F1EA] font-medium uppercase tracking-[0.18em] text-sm mb-6">
              Hours
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#D4A15A] mt-0.5 flex-shrink-0" />
                <div className="text-[#A9B3C7] text-sm">
                  <p className="text-[#F4F1EA] font-medium mb-1">Dinner Service</p>
                  <p>Monday – Saturday</p>
                  <p>5:00 PM – 11:00 PM</p>
                </div>
              </li>
              <li className="text-[#A9B3C7] text-sm mt-4">
                <p className="text-[#F4F1EA] font-medium mb-1">Bar Hours</p>
                <p>4:00 PM – 12:00 AM</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#F4F1EA]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#A9B3C7]/60 text-xs">
              © {new Date().getFullYear()} Bella Vista. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-[#A9B3C7]/60 hover:text-[#D4A15A] transition-colors text-xs"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-[#A9B3C7]/60 hover:text-[#D4A15A] transition-colors text-xs"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
