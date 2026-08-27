import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, ArrowRight, Wrench } from 'lucide-react';
import { BeforeAfterSlider } from '../common/BeforeAfterSlider';
import { Button } from '../common/Button';

export const RestorationHighlight: React.FC = () => {
  const restorationPhases = [
    { name: 'Complete Inspection', marathi: 'तपासणी' },
    { name: 'Engine Rebuild', marathi: 'इंजिन काम' },
    { name: 'Chassis & Body Work', marathi: 'बॉडी काम' },
    { name: '2K PU Paint Work', marathi: 'रंगकाम' },
    { name: 'Electrical Reloom', marathi: 'वायरिंग' },
    { name: 'OEM Parts Replacement', marathi: 'स्पेअर पार्ट्स' },
    { name: 'Triple Chrome Buffing', marathi: 'क्रोम प्लेटिंग' },
    { name: 'Final Ceramic Detailing', marathi: 'फायनल पॉलिशिंग' },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#070707] border-y border-[#262626] relative overflow-hidden" id="restoration">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B900]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-[#F5B900]/40 bg-[#F5B900]/10 text-[#F5B900] text-xs font-extrabold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Signature Garage Specialty</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3 font-sans">
            BIKE RESTORATION
          </h2>

          {/* Main Statement */}
          <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F5B900] mb-4 tracking-wide font-sans">
            जुनी Bike पुन्हा नवीन करून देतो!
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Complete inspection, engine work, body work, paint work, electrical work, parts replacement आणि final detailing. We breathe new life into classic two-wheelers with master level craftsmanship.
          </p>
        </div>

        {/* Before & After Interactive Showcase */}
        <div className="mb-12 sm:mb-14">
          <BeforeAfterSlider
            bikeName="1996 Yamaha RX100 Retro Master Restoration"
            beforeImage="/images/services/bike-restoration.jpg"
            afterImage="/images/hero-bike.jpg"
          />
        </div>

        {/* Restoration Process Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-12">
          {restorationPhases.map((phase, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg bg-[#141414] border border-[#2B2B2B] flex items-center gap-3 hover:border-[#F5B900]/40 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-[#F5B900] shrink-0" />
              <div>
                <span className="text-xs font-bold text-white uppercase block leading-tight">
                  {phase.name}
                </span>
                <span className="text-[10px] text-[#F5B900] font-medium block">
                  {phase.marathi}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs: View Restoration Work & Get Restoration Estimate */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/services" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<Wrench className="w-4 h-4 text-[#F5B900]" />}
              className="w-full sm:w-auto"
            >
              View Restoration Work
            </Button>
          </Link>

          <Link to="/inquiry?service=Bike%20Restoration" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto font-black"
            >
              Get Restoration Estimate
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
