import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  Zap,
  Gauge,
  Flame,
  Volume2,
  Disc,
  Link as ChainIcon,
  ArrowRight,
} from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

export const BikeProblemsGuide: React.FC = () => {
  const commonIssues = [
    {
      icon: Zap,
      title: 'Bike Starting Problems (Self & Kick)',
      marathi: 'गाडी चालू न होणे / स्टार्टिंग प्रॉब्लेम',
      symptoms: 'Clicking sound on self-start, weak horn, dead battery, or hard kick-starting in morning.',
      solution: 'Battery voltage testing, starter motor relay check, spark plug cleaning, and ignition coil diagnosis.',
      badge: 'Electrical & Ignition',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
    },
    {
      icon: Gauge,
      title: 'Low Mileage & Sluggish Pickup',
      marathi: 'कमी मायलेज व पिकअप ड्रॉप',
      symptoms: 'Engine revs high but bike moves slowly, heavy fuel consumption, or bogging down on throttle.',
      solution: 'Air filter replacement, clutch plate inspection, carburetor/FI throttle cleaning, and tappet setting.',
      badge: 'Fuel & Clutch',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
    },
    {
      icon: Volume2,
      title: 'Engine Ticking, Tappet & Chain Noise',
      marathi: 'इंजिनमधून आवाज येणे / खडखड आवाज',
      symptoms: 'Continuous ticking sound from engine head, timing chain slap, or vibration at medium speeds.',
      solution: 'Precision valve clearance adjustment, timing chain tensioner replacement, and engine flush & fresh oil.',
      badge: 'Engine Care',
      badgeColor: 'bg-orange-100 text-orange-900 border-orange-200',
    },
    {
      icon: Flame,
      title: 'Engine Overheating & White/Black Smoke',
      marathi: 'इंजिन तापणे व धूर मारणे',
      symptoms: 'Excessive heat radiating from cylinder fins, burning oil smell, or low engine oil level.',
      solution: 'Engine oil level & viscosity check, oil pump flow test, cylinder boring, or full engine overhaul.',
      badge: 'Engine Overhaul',
      badgeColor: 'bg-red-100 text-red-900 border-red-200',
    },
    {
      icon: Disc,
      title: 'Brake Squeal & Weak Stopping Power',
      marathi: 'ब्रेक नीट न लागणे / ब्रेकचा आवाज',
      symptoms: 'Spongy front brake lever, high-pitched squeak on rear drum brake, or excessive stopping distance.',
      solution: 'Brake shoe/pad replacement, brake drum emery cleaning, master cylinder bleeding, and cable adjustment.',
      badge: 'Braking System',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    },
    {
      icon: ChainIcon,
      title: 'Drive Chain Slack & Sprocket Slipping',
      marathi: 'चेन सैल होणे व खटका पडणे',
      symptoms: 'Chain slapping against swingarm guard, rusted chain links, or skipping gears under load.',
      solution: 'Deep chain degreasing, slack re-tensioning, sprocket teeth inspection, and high-adhesion lubrication.',
      badge: 'Transmission',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-200',
    },
  ];

  return (
    <section className="py-14 sm:py-18 bg-white border-t border-gray-200" id="troubleshooting">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-2.5 rounded-full bg-amber-100 text-[#B8860B] text-xs font-black uppercase tracking-widest border border-amber-200">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>DIAGNOSTIC &amp; TROUBLESHOOTING GUIDE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-gray-900 font-sans">
              COMMON BIKE PROBLEMS &amp; WORKSHOP SOLUTIONS
            </h2>
            <div className="w-12 h-1 bg-[#F5B900] mx-auto mt-2 rounded-full" />

            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto mt-3 leading-relaxed">
              Experiencing starting trouble, low mileage, or engine noise on your motorcycle? Here is how our master mechanics diagnose and resolve common two-wheeler issues in Pahur.
            </p>
          </div>
        </ScrollReveal>

        {/* 6 Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {commonIssues.map((issue, idx) => {
            const Icon = issue.icon;
            return (
              <ScrollReveal key={idx} direction="up" delay={idx * 60}>
                <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 border border-gray-200/90 hover:border-[#F5B900] hover:shadow-md transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-xs flex items-center justify-center text-gray-900">
                        <Icon className="w-5 h-5 text-[#DFA500]" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${issue.badgeColor}`}>
                        {issue.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 font-sans">
                      {issue.title}
                    </h3>
                    <span className="text-xs font-semibold text-[#B8860B] block mb-2">
                      {issue.marathi}
                    </span>

                    <div className="space-y-2 text-xs text-gray-600 mt-2">
                      <div>
                        <strong className="text-gray-900">Symptoms: </strong>
                        <span>{issue.symptoms}</span>
                      </div>
                      <div>
                        <strong className="text-emerald-800">Workshop Fix: </strong>
                        <span>{issue.solution}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-200/80">
                    <Link
                      to="/inquiry"
                      className="text-xs font-bold text-gray-900 hover:text-[#DFA500] flex items-center gap-1 transition-colors"
                    >
                      <span>Book Diagnostic Checkup</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
