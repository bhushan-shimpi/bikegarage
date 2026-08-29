import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Navigation } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { PageBanner } from '../../components/common/PageBanner';
import { ScrollReveal } from '../../components/common/ScrollReveal';

export const ContactPage: React.FC = () => {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Chaudhari Auto — Pahur, Jamner, Jalgaon',
    description:
      'Get in touch with Chaudhari Auto in Pahur for two-wheeler servicing, repairs, and bike restoration consultations. Phone: +91 7387448878.',
    mainEntity: {
      '@type': 'MotorcycleRepairShop',
      name: 'Chaudhari Auto',
      telephone: '+91-7387448878',
      email: 'chaudhariautopahur@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Pahur Peth',
        addressLocality: 'Pahur',
        addressRegion: 'Maharashtra',
        postalCode: '424205',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 20.7078,
        longitude: 75.7196,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '09:00',
          closes: '20:00',
        },
      ],
    },
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen flex flex-col justify-between">
      <SEO
        title="Contact Us & Workshop Location in Pahur, Jamner"
        description="Visit Chaudhari Auto at Pahur, Pahur Peth, Taluka Jamner, Dist. Jalgaon, Maharashtra 424205. Call +91 73874 48878 or message us on WhatsApp for bike servicing appointments."
        canonicalPath="/contact"
        jsonLd={contactSchema}
      />
      <div>
        {/* Top Banner */}
        <PageBanner title="CONTACT CHAUDHARI AUTO" breadcrumb="Contact Us" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Contact Information */}
              <ScrollReveal direction="left" className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#DFA500] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Pahur Two-Wheeler Workshop
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black uppercase text-gray-900 font-sans tracking-tight mt-1">
                    Chaudhari Auto
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Trusted Bike Service & Complete Bike Restoration Since 1994.
                  </p>
                </div>

                <div className="space-y-4 text-xs text-gray-700">
                  {/* Phone */}
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-300 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#FFF9E6] border border-[#F5B900] flex items-center justify-center text-[#DFA500] shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">Phone Helpline</span>
                      <a href="tel:+917387448878" className="text-gray-600 hover:text-black font-mono mt-0.5 block font-bold">
                        +91 73874 48878
                      </a>
                      <a href="tel:+919503853143" className="text-gray-600 hover:text-black font-mono mt-0.5 block font-bold">
                        +91 95038 53143
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 hover:border-emerald-300 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-400 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">WhatsApp Support (Live)</span>
                      <a
                        href="https://wa.me/917387448878?text=Hello%20Chaudhari%20Auto,%20I%20want%20to%20inquire%20about%20bike%20service."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 hover:underline mt-0.5 block font-bold"
                      >
                        Chat Directly On WhatsApp →
                      </a>
                    </div>
                  </div>

                  {/* Instagram Profiles */}
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 border border-pink-200 hover:border-pink-300 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 text-white"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" />
                        <circle cx="12" cy="12" r="4.2" />
                        <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" stroke="none" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-gray-900 block">Instagram (Reels & DMs)</span>
                      <div>
                        <a
                          href="https://www.instagram.com/chaudhari_auto_pahur/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#E1306C] hover:underline block font-bold"
                        >
                          @chaudhari_auto_pahur (Workshop) →
                        </a>
                        <a
                          href="https://www.instagram.com/_rcvlogs_/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-600 hover:text-pink-600 block text-[11px] font-semibold mt-0.5"
                        >
                          @_rcvlogs_ (Owner Moto Vlogs) →
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-[#FFF9E6] border border-[#F5B900] flex items-center justify-center text-[#DFA500] shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">Email Address</span>
                      <a href="mailto:chaudhariautopahur@gmail.com" className="text-gray-600 hover:text-black mt-0.5 block">
                        chaudhariautopahur@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-[#FFF9E6] border border-[#F5B900] flex items-center justify-center text-[#DFA500] shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">Workshop Address</span>
                      <span className="text-gray-600 mt-0.5 block">
                        Pahur, Pahur Peth, Tal. Jamner, Dist. Jalgaon, Maharashtra - 424205
                      </span>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-[#FFF9E6] border border-[#F5B900] flex items-center justify-center text-[#DFA500] shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">Working Hours</span>
                      <span className="text-gray-600 mt-0.5 block">
                        Monday – Sunday: 9:00 AM – 8:00 PM <br />
                        <span className="text-emerald-700 font-semibold">(Open 7 days a week)</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="tel:+917387448878"
                    className="px-5 py-2.5 rounded-lg bg-[#F5B900] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#DFA500] transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5 fill-black" />
                    <span>Call Now</span>
                  </a>

                  <a
                    href="https://wa.me/917387448878?text=Hello%20Chaudhari%20Auto%20Centre,%20I%20want%20to%20inquire%20about%20bike%20service."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-lg bg-[#25D366] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="https://maps.google.com/?q=Pahur,Maharashtra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#DFA500]" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </ScrollReveal>

              {/* Right Column: Google Maps Embed */}
              <ScrollReveal direction="right" className="lg:col-span-7">
                <div className="relative w-full h-80 sm:h-full min-h-[380px] rounded-xl overflow-hidden border border-gray-300 shadow-inner bg-gray-100 group">
                  <iframe
                    title="Chaudhari Auto Pahur Location Map"
                    src="https://maps.google.com/maps?q=Chaudhari%20Auto%20Centre,%20Pahur,%20Pahur%20Peth,%20Maharashtra%20424205&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                  {/* Pin overlay card */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-2 rounded-lg shadow-md border border-gray-200 text-xs">
                    <span className="font-bold text-gray-900 block flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Chaudhari Auto
                    </span>
                    <span className="text-[11px] text-[#DFA500] font-semibold">Pahur, Maharashtra (Est. 1994)</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
