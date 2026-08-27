import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, ArrowRight, Clock, Star } from 'lucide-react';
import { Button } from '../common/Button';

export const PremiumServiceChecklist: React.FC = () => {
  const checklistItems = [
    { title: 'Complete Bike Inspection', desc: 'Thorough 35-point safety check across chassis, forks, bearings & cables' },
    { title: 'Engine Oil Check / Change', desc: 'Drain, magnetic sump clean & grade-specific synthetic oil renewal' },
    { title: 'Brake Inspection', desc: 'Caliper servicing, disc pad measurement & brake fluid bleed' },
    { title: 'Chain Cleaning & Lubrication', desc: 'Heavy degreaser scrub, tension check & Motul high-speed wax lube' },
    { title: 'Air Filter Check', desc: 'Ultrasonic airbox de-dusting and element clean / OEM replacement' },
    { title: 'Tyre Pressure Check', desc: 'Cold PSI calibration, tread depth check & valve seal inspection' },
    { title: 'Battery Check', desc: 'Computerized load test, terminal de-oxidation & alternator voltage check' },
    { title: 'Electrical Check', desc: 'Headlight beam alignment, horn, indicator relays & spark plug gap setting' },
    { title: 'Cleaning & Detailing', desc: 'High-pressure foam bath, engine fin degrease & UV protective wax coat' },
    { title: 'Final Quality Inspection', desc: 'Master mechanic test ride & signed roadworthiness release stamp' },
  ];

  return (
    <section className="py-20 bg-[#101010] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#161616] rounded-2xl border border-[#2B2B2B] p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5B900]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading & Pitch */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded border border-[#F5B900]/40 bg-[#F5B900]/10 text-[#F5B900] text-xs font-bold uppercase tracking-wider">
                  <Star className="w-3.5 h-3.5 fill-[#F5B900]" />
                  <span>The Ultimate Care Package</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight mb-4 font-sans">
                  PREMIUM BIKE <br />
                  <span className="text-[#F5B900]">SERVICE</span>
                </h2>

                <p className="text-base text-neutral-300 mb-6 leading-relaxed">
                  Our comprehensive 10-point checklist leaves no bolt uninspected. Engineered for high-mileage riders, commuters, and tourers seeking maximum reliability and butter-smooth performance.
                </p>

                <div className="space-y-3 mb-8 text-sm text-neutral-300">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#F5B900]" />
                    <span>Average Service Duration: <strong>4 to 5 Hours</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#F5B900]" />
                    <span>Warranty: <strong>30-Day Service Guarantee</strong></span>
                  </div>
                </div>
              </div>

              <div>
                <Link to="/book-appointment?service=Premium%20Bike%20Service">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="font-extrabold text-sm uppercase tracking-wider"
                  >
                    Book Premium Service
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: 10-Point Checklist */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {checklistItems.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-[#1C1C1C] border border-[#2D2D2D] hover:border-[#F5B900]/50 transition-all flex items-start gap-3 group"
                >
                  <div className="w-6 h-6 rounded-full bg-[#F5B900]/10 text-[#F5B900] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#F5B900] group-hover:text-black transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-tight group-hover:text-[#F5B900] transition-colors">
                      {index + 1}. {item.title}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
