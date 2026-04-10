import { useState } from 'react';
import { Calendar, Clock, Users, Phone, Mail, CheckCircle } from 'lucide-react';

interface ReservationForm {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  guests?: string;
}

const timeSlots = [
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00'
];

const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Reservation() {
  const [formData, setFormData] = useState<ReservationForm>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    notes: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    if (formData.guests < 1 || formData.guests > 8) {
      newErrors.guests = 'Please select 1-8 guests';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) : value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <main className="min-h-screen bg-[#0B0F1C] pt-32 pb-24">
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-[#D4A15A] text-sm font-medium uppercase tracking-[0.25em] mb-4">
            Book Your Table
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl text-[#F4F1EA] mb-6">
            Make a Reservation
          </h1>
          <p className="text-[#A9B3C7] text-lg leading-relaxed">
            We'll confirm within the hour. For same-day requests or parties larger than 8, 
            please call us directly at{' '}
            <a href="tel:+12125550147" className="text-[#D4A15A] hover:underline">
              (212) 555-0147
            </a>
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {isSubmitted ? (
            <div className="bg-[#141B2D] border border-[#F4F1EA]/10 rounded-lg p-12 text-center">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl text-[#F4F1EA] mb-4">
                Reservation Requested!
              </h2>
              <p className="text-[#A9B3C7] text-lg mb-8 max-w-lg mx-auto">
                Thank you, {formData.name}. We've received your reservation request for{' '}
                {formData.guests} guests on{' '}
                {new Date(formData.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                at {formData.time}. We'll send a confirmation to {formData.email} within the hour.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      date: '',
                      time: '',
                      guests: 2,
                      notes: '',
                    });
                  }}
                  className="btn-gold"
                >
                  Make Another Reservation
                </button>
                <a
                  href="/"
                  className="px-7 py-3.5 border border-[#F4F1EA]/30 text-[#F4F1EA] rounded-md hover:bg-[#F4F1EA]/10 transition-all duration-300"
                >
                  Return Home
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-[#141B2D] border border-[#F4F1EA]/10 rounded-lg p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-[#F4F1EA] font-medium text-lg mb-6 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#D4A15A]" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-[#A9B3C7] text-sm mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-[#0B0F1C] border ${
                          errors.name ? 'border-red-500' : 'border-[#F4F1EA]/20'
                        } rounded-md px-4 py-3 text-[#F4F1EA] placeholder-[#A9B3C7]/50 focus:outline-none focus:border-[#D4A15A] transition-colors`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-[#A9B3C7] text-sm mb-2"
                      >
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A9B3C7]" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full bg-[#0B0F1C] border ${
                            errors.phone ? 'border-red-500' : 'border-[#F4F1EA]/20'
                          } rounded-md pl-11 pr-4 py-3 text-[#F4F1EA] placeholder-[#A9B3C7]/50 focus:outline-none focus:border-[#D4A15A] transition-colors`}
                          placeholder="(212) 555-0147"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="email"
                        className="block text-[#A9B3C7] text-sm mb-2"
                      >
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A9B3C7]" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-[#0B0F1C] border ${
                            errors.email ? 'border-red-500' : 'border-[#F4F1EA]/20'
                          } rounded-md pl-11 pr-4 py-3 text-[#F4F1EA] placeholder-[#A9B3C7]/50 focus:outline-none focus:border-[#D4A15A] transition-colors`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[#F4F1EA]/10" />

                {/* Reservation Details */}
                <div>
                  <h3 className="text-[#F4F1EA] font-medium text-lg mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#D4A15A]" />
                    Reservation Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label
                        htmlFor="date"
                        className="block text-[#A9B3C7] text-sm mb-2"
                      >
                        Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A9B3C7]" />
                        <input
                          type="date"
                          id="date"
                          name="date"
                          min={today}
                          value={formData.date}
                          onChange={handleChange}
                          className={`w-full bg-[#0B0F1C] border ${
                            errors.date ? 'border-red-500' : 'border-[#F4F1EA]/20'
                          } rounded-md pl-11 pr-4 py-3 text-[#F4F1EA] focus:outline-none focus:border-[#D4A15A] transition-colors`}
                        />
                      </div>
                      {errors.date && (
                        <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="time"
                        className="block text-[#A9B3C7] text-sm mb-2"
                      >
                        Time *
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A9B3C7]" />
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className={`w-full bg-[#0B0F1C] border ${
                            errors.time ? 'border-red-500' : 'border-[#F4F1EA]/20'
                          } rounded-md pl-11 pr-4 py-3 text-[#F4F1EA] focus:outline-none focus:border-[#D4A15A] transition-colors appearance-none`}
                        >
                          <option value="">Select time</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.time && (
                        <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="guests"
                        className="block text-[#A9B3C7] text-sm mb-2"
                      >
                        Number of Guests *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A9B3C7]" />
                        <select
                          id="guests"
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className={`w-full bg-[#0B0F1C] border ${
                            errors.guests ? 'border-red-500' : 'border-[#F4F1EA]/20'
                          } rounded-md pl-11 pr-4 py-3 text-[#F4F1EA] focus:outline-none focus:border-[#D4A15A] transition-colors appearance-none`}
                        >
                          {guestOptions.map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.guests && (
                        <p className="text-red-500 text-sm mt-1">{errors.guests}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[#F4F1EA]/10" />

                {/* Special Requests */}
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-[#A9B3C7] text-sm mb-2"
                  >
                    Special Requests (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-[#0B0F1C] border border-[#F4F1EA]/20 rounded-md px-4 py-3 text-[#F4F1EA] placeholder-[#A9B3C7]/50 focus:outline-none focus:border-[#D4A15A] transition-colors resize-none"
                    placeholder="Any dietary restrictions, special occasions, or seating preferences..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-gold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0B0F1C] border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Request Reservation'
                  )}
                </button>

                <p className="text-[#A9B3C7]/60 text-xs text-center">
                  By making a reservation, you agree to our cancellation policy. 
                  Please cancel at least 24 hours in advance to avoid a cancellation fee.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
