import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const workshopFAQs: FAQItem[] = [
  {
    question: 'Where can I get my bike serviced in Pahur, Jamner, or Jalgaon?',
    answer:
      'Chaudhari Auto is conveniently located on Main Road, Near Bus Stand in Pahur (Taluka Jamner, District Jalgaon, Maharashtra). We are easily accessible to riders from Pahur, Jamner, Vakod, Shendurni, Neri, and across Jalgaon district. The workshop is open 7 days a week from 9:00 AM to 8:00 PM for routine servicing, major repairs, and complete restorations.',
    category: 'Location & Timing',
  },
  {
    question: 'Which motorcycle servicing and repair services are available at Chaudhari Auto?',
    answer:
      'We specialize exclusively in motorcycles and geared two-wheelers (Hero, Bajaj, Honda, Yamaha, TVS, Royal Enfield, KTM). Our services include general periodic servicing, our comprehensive Premium Servicing Package (with engine flush and oil additive), engine overhaul and rebuilding, clutch and gearbox repairs, carburetor and fuel-injection (FI) tuning, electrical wiring repair, battery diagnostics, chain cleaning and lubrication, brake servicing, and showroom-condition vintage/classic bike restorations.',
    category: 'Services',
  },
  {
    question: 'How often should I service my motorcycle for optimal mileage and engine life?',
    answer:
      'For everyday commuter motorcycles (such as Hero Splendor, HF Deluxe, Honda Shine, and Bajaj Pulsar), we recommend a general service every 2,500 to 3,000 km or every 3 to 4 months. Regular servicing ensures fresh engine lubrication, clean air and fuel filters, optimal spark plug firing, properly tensioned drive chains, and smooth braking.',
    category: 'Maintenance Intervals',
  },
  {
    question: 'When should motorcycle engine oil be replaced, and why does it matter?',
    answer:
      'Standard mineral engine oil should be replaced every 2,500 to 3,000 km. Semi-synthetic and fully synthetic oils typically last between 3,500 and 5,000 km depending on riding conditions. Degraded engine oil causes excessive engine friction, overheating, reduced pickup, and valve noise. At Chaudhari Auto, we inspect oil level, color, and viscosity on every service checkup.',
    category: 'Engine Care',
  },
  {
    question: 'How can I resolve low bike mileage and sluggish pickup issues?',
    answer:
      'Low mileage and weak acceleration are usually caused by a clogged air filter, degraded engine oil, improperly adjusted valve clearances (tappets), worn clutch plates, or incorrect carburetor/FI throttle calibration. Our master mechanics conduct a step-by-step diagnosis to restore original factory acceleration and fuel economy.',
    category: 'Performance',
  },
  {
    question: 'What causes motorcycle engine noise, vibrations, and overheating?',
    answer:
      'Engine ticking or tapping sounds are often due to loose valve clearances or worn timing chains. Heavy knocking indicates piston, cylinder, or crankshaft bearing wear. Overheating typically results from depleted engine oil, restricted oil passages, or lean fuel mixtures. We recommend having engine anomalies diagnosed promptly to avoid costly catastrophic damage.',
    category: 'Diagnostics',
  },
  {
    question: 'How often should the motorcycle drive chain be cleaned and lubricated?',
    answer:
      'Motorcycle drive chains should be inspected, cleaned, and lubricated every 500 to 700 km, or more frequently if riding through dust, mud, or rain. A dry, dirty chain creates drag, accelerates sprocket wear, and risks chain snapping. In our workshop, we thoroughly wash the chain with safe degreaser, adjust slack to factory spec, and apply high-adhesion chain lube.',
    category: 'Maintenance',
  },
  {
    question: 'Does Chaudhari Auto offer complete bike restoration for old and classic motorcycles?',
    answer:
      'Yes. Chaudhari Auto is renowned across Jalgaon district for complete bike restoration—especially 100cc commuters (Hero Honda Splendor, CD100, Passion) and 150cc performance bikes (Bajaj Pulsar, Yamaha 2-stroke RX100). Our restoration involves stripping the motorcycle to the bare chassis, professional oven/bhatti baked paint, ceramic clear-coat protection, OEM fiber kits, original stickers, and full mechanical rebuilds.',
    category: 'Restoration',
  },
  {
    question: 'Can riders from nearby towns like Jamner, Shendurni, Jalgaon, or Pachora get their bikes serviced here?',
    answer:
      'Absolutely. Many riders and motorcycle enthusiasts from Jamner (14 km), Shendurni (18 km), Vakod (10 km), Neri, Pachora, Bhusawal, and Jalgaon city bring their motorcycles to our Pahur workshop. For long-distance customers, we offer prior appointment scheduling via our website and live WhatsApp job sheet updates.',
    category: 'Service Area',
  },
];

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: workshopFAQs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export const WorkshopFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-16 sm:py-20 bg-[#0B0B0B] text-white relative overflow-hidden" id="faqs">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#F5B900]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full border border-[#F5B900]/30 bg-[#F5B900]/10 text-[#F5B900] text-xs font-black uppercase tracking-widest">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white font-sans">
              MOTORCYCLE SERVICING &amp; REPAIR FAQS
            </h2>
            <div className="w-12 h-1 bg-[#F5B900] mx-auto mt-2 rounded-full" />

            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto mt-3">
              Helpful answers to common questions about bike servicing, oil changes, engine overhaul, pickup issues, and restoration in Pahur, Jamner, and Jalgaon.
            </p>
          </div>
        </ScrollReveal>

        {/* Accordion List */}
        <div className="space-y-3">
          {workshopFAQs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal key={idx} direction="up" delay={idx * 40}>
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-[#161616] border-[#F5B900]/60 shadow-lg shadow-[#F5B900]/5'
                      : 'bg-[#121212] border-[#222222] hover:border-neutral-700 hover:bg-[#141414]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`text-xs font-black font-sans px-2 py-0.5 rounded-md shrink-0 mt-0.5 ${
                          isOpen
                            ? 'bg-[#F5B900] text-black'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        Q{idx + 1}
                      </span>
                      <h3
                        className={`text-sm sm:text-base font-bold font-sans transition-colors ${
                          isOpen ? 'text-[#F5B900]' : 'text-white'
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'rotate-180 bg-[#F5B900]/20 text-[#F5B900]'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/80">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Reassurance */}
        <div className="mt-8 text-center text-xs text-neutral-400">
          <span>Have a specific bike problem? </span>
          <a
            href="https://wa.me/917387448878?text=Hello%20Chaudhari%20Auto%20Centre,%20I%20have%20a%20question%20about%20my%20bike."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5B900] hover:underline font-bold"
          >
            Chat directly with our master mechanic on WhatsApp →
          </a>
        </div>

      </div>
    </section>
  );
};
