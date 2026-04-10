import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
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

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0F1C] pt-32 pb-24">
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-[#D4A15A] text-sm font-medium uppercase tracking-[0.25em] mb-4">
            Get in Touch
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl text-[#F4F1EA] mb-6">
            Contact Us
          </h1>
          <p className="text-[#A9B3C7] text-lg leading-relaxed">
            We'd love to hear from you. Reach out for reservations, inquiries, or just to say hello.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-3xl text-[#F4F1EA] mb-8">
                Visit Us
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4A15A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#D4A15A]" />
                  </div>
                  <div>
                    <h3 className="text-[#F4F1EA] font-medium mb-1">Address</h3>
                    <p className="text-[#A9B3C7]">
                      42 Via Roma, Downtown<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4A15A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#D4A15A]" />
                  </div>
                  <div>
                    <h3 className="text-[#F4F1EA] font-medium mb-1">Phone</h3>
                    <a
                      href="tel:+12125550147"
                      className="text-[#A9B3C7] hover:text-[#D4A15A] transition-colors"
                    >
                      (212) 555-0147
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4A15A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#D4A15A]" />
                  </div>
                  <div>
                    <h3 className="text-[#F4F1EA] font-medium mb-1">Email</h3>
                    <a
                      href="mailto:hello@bellavista.co"
                      className="text-[#A9B3C7] hover:text-[#D4A15A] transition-colors"
                    >
                      hello@bellavista.co
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4A15A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#D4A15A]" />
                  </div>
                  <div>
                    <h3 className="text-[#F4F1EA] font-medium mb-1">Hours</h3>
                    <p className="text-[#A9B3C7]">
                      Monday – Saturday: 5:00 PM – 11:00 PM<br />
                      Bar: 4:00 PM – 12:00 AM
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="aspect-video bg-[#141B2D] rounded-lg overflow-hidden border border-[#F4F1EA]/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1584484523418!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) invert(92%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bella Vista Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#141B2D] border border-[#F4F1EA]/10 rounded-lg p-8 lg:p-10">
              <h2 className="font-serif text-3xl text-[#F4F1EA] mb-6">
                Send a Message
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#F4F1EA] mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-[#A9B3C7] mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-[#D4A15A] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[#F4F1EA] text-sm font-medium mb-2"
                    >
                      Your Name
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
                      htmlFor="email"
                      className="block text-[#F4F1EA] text-sm font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-[#0B0F1C] border ${
                        errors.email ? 'border-red-500' : 'border-[#F4F1EA]/20'
                      } rounded-md px-4 py-3 text-[#F4F1EA] placeholder-[#A9B3C7]/50 focus:outline-none focus:border-[#D4A15A] transition-colors`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-[#F4F1EA] text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full bg-[#0B0F1C] border ${
                        errors.subject ? 'border-red-500' : 'border-[#F4F1EA]/20'
                      } rounded-md px-4 py-3 text-[#F4F1EA] focus:outline-none focus:border-[#D4A15A] transition-colors`}
                    >
                      <option value="">Select a subject</option>
                      <option value="reservation">Reservation Inquiry</option>
                      <option value="private-event">Private Event</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[#F4F1EA] text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full bg-[#0B0F1C] border ${
                        errors.message ? 'border-red-500' : 'border-[#F4F1EA]/20'
                      } rounded-md px-4 py-3 text-[#F4F1EA] placeholder-[#A9B3C7]/50 focus:outline-none focus:border-[#D4A15A] transition-colors resize-none`}
                      placeholder="How can we help you?"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-gold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#0B0F1C] border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
