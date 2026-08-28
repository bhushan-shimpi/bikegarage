import React from 'react';
import { Star, Quote, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

interface ReviewItem {
  id: string;
  name: string;
  initials: string;
  village: string;
  bike: string;
  serviceType: string;
  rating: number;
  comment: string;
  verified: boolean;
}

export const TestimonialsSection: React.FC = () => {
  const reviews: ReviewItem[] = [
    {
      id: 'rev-1',
      name: 'Sachin Patil',
      initials: 'SP',
      village: 'Pahur Peth',
      bike: 'Hero Splendor Plus BS6',
      serviceType: 'Periodic Servicing & Mileage Tuning',
      rating: 5,
      comment: 'माझ्या Splendor चे मायलेज आणि पिकअपचा प्रॉब्लेम जामनेरला दोन ठिकाणी दाखवूनही सुटला नव्हता. चौधरी ऑटो सेंटरमध्ये फक्त एका सर्व्हिसिंगमध्ये गाडी नव्यासारखी स्मूथ झाली. कामात १००% प्रामाणिकपणा आहे.',
      verified: true,
    },
    {
      id: 'rev-2',
      name: 'Kisan More',
      initials: 'KM',
      village: 'Wakod',
      bike: 'Bajaj Pulsar 150 DTS-i',
      serviceType: 'Full Engine Overhaul & Brakes',
      rating: 5,
      comment: 'Pulsar 150 चे इंजिन ओव्हरहॉल आणि डिस्क ब्रेकचे काम उत्तम केले. ओरिजिनल बजाज OEM पार्ट्स वापरले आणि वाजवी दर आकारले. पहूर परिसरातील सर्वात विश्वासू आणि प्रामाणिक बाईक गॅरेज.',
      verified: true,
    },
    {
      id: 'rev-3',
      name: 'Pratik Jadhav',
      initials: 'PJ',
      village: 'Jamner',
      bike: 'Honda CB Shine 125 SP',
      serviceType: 'Clutch Overhaul & Tappet Setting',
      rating: 5,
      comment: 'Honda Shine चे क्लच प्लेट, चेन-स्प्रॉकेट आणि टॅपिट सेटिंग एकदम परफेक्ट केली. गाडी चालवताना जराही व्हायब्रेशन नाही. सर्व्हिसिंगनंतर गाडी एकदम मक्खन चालते.',
      verified: true,
    },
    {
      id: 'rev-4',
      name: 'Ganesh Shimpi',
      initials: 'GS',
      village: 'Pahur',
      bike: 'Yamaha RX100 (1997)',
      serviceType: 'Complete Retro Restoration',
      rating: 5,
      comment: 'माझी १९९७ ची RX100 रिस्टोरेशनसाठी दिली होती. भट्टी पेंट, क्रोम फिनिशिंग आणि ओरिजिनल २-स्ट्रोक बीट असा आलाय की रस्त्यावर लोक गाडी थांबवून बघतात! हॅट्स ऑफ रोहित दादा आणि टीम.',
      verified: true,
    },
    {
      id: 'rev-5',
      name: 'Anil Sonawane',
      initials: 'AS',
      village: 'Shendurni',
      bike: 'Hero HF Deluxe',
      serviceType: 'Electrical & Carburettor Service',
      rating: 5,
      comment: 'गाडी स्टार्ट व्हायला त्रास देत होती, वायरिंग आणि कार्बोरेटरचे काम चौधरी ऑटो सेंटरने अगदी अचूक शोधून क्लिअर केले. अनावश्यक पार्ट्स न बदलता एकदम योग्य सल्ला दिला.',
      verified: true,
    },
    {
      id: 'rev-6',
      name: 'Mangesh Chaudhari',
      initials: 'MC',
      village: 'Bodwad',
      bike: 'Bajaj Platina 110 H-Gear',
      serviceType: 'Suspension & Front Fork Repair',
      rating: 5,
      comment: 'सस्पेन्शन आणि फ्रंट फॉर्कचे काम केले. खडबडीत रस्त्यावरही गाडी आता एकदम मऊ चालते. अस्सल OEM स्पेअर पार्ट्स आणि उत्कृष्ट वॉश दिला. उत्तम अनुभव.',
      verified: true,
    },
    {
      id: 'rev-7',
      name: 'Nitin Deshmukh',
      initials: 'ND',
      village: 'Jalgaon Road, Pahur',
      bike: 'Hero Passion Pro',
      serviceType: 'Regular Maintenance Since 2019',
      rating: 5,
      comment: 'गेल्या ५ वर्षांपासून माझ्या दोन्ही गाड्यांची सर्व्हिसिंग फक्त चौधरी ऑटो सेंटरमध्येच करतो. कधीही फसवणूक नाही, जे पार्ट खराब आहेत तेच दाखवून बदलतात. पूर्ण पारदर्शकता.',
      verified: true,
    },
    {
      id: 'rev-8',
      name: 'Akash Mahajan',
      initials: 'AM',
      village: 'Pahur Kasba',
      bike: 'Yamaha FZ-S FI',
      serviceType: 'FI Sensor & Throttle Body Tuning',
      rating: 5,
      comment: 'Fuel Injection (FI) सिस्टीम आणि सेन्सर्सचे ट्युनिंग खूप अचूक केले. पिकअप आणि थ्रॉटल रिस्पॉन्स खूप भारी झालाय. पहूरमधील सर्वोत्तम आधुनिक मोटरसायकल वर्कशॉप.',
      verified: true,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F8F9FA]" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-amber-100 text-[#B8860B] text-xs font-black uppercase tracking-widest border border-amber-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>१००% खरी ग्राहक मते</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wide text-gray-900 font-sans">
              REAL CUSTOMER REVIEWS
            </h2>
            <div className="w-12 h-1 bg-[#F5B900] mx-auto mt-2 rounded-full" />

            <p className="text-xs sm:text-sm text-gray-600 mt-2.5">
              पहूर, जामनेर, शेंदुर्णी व परिसरातील बाईकस्वारांचा चौधरी ऑटो सेंटरवर असलेला अतूट विश्वास.
            </p>
          </div>
        </ScrollReveal>

        {/* 8 Real Reviews Grid: 1 col on mobile, 2 cols on tablet, 4 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {reviews.map((review, idx) => (
            <ScrollReveal key={review.id} direction="up" delay={(idx % 4) * 80}>
              <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1">
                <div>
                  {/* Header: Monogram Initials Badge (NO profile image), Name, Stars */}
                  <div className="flex items-start justify-between mb-3.5">
                    <div className="flex items-center gap-3">
                      {/* Name Initials Badge */}
                      <div className="w-11 h-11 rounded-full bg-amber-50 border border-amber-300 text-[#B8860B] font-black text-sm flex items-center justify-center shrink-0 shadow-inner group-hover:bg-[#F5B900] group-hover:text-black transition-colors">
                        {review.initials}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-gray-900 leading-none">
                            {review.name}
                          </h4>
                          {review.verified && (
                            <span title="Verified Customer" className="inline-flex">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            </span>
                          )}
                        </div>

                        <span className="text-[11px] font-medium text-gray-500 block mt-0.5">
                          {review.village}
                        </span>
                      </div>
                    </div>

                    <Quote className="w-5 h-5 text-gray-200 group-hover:text-[#F5B900]/40 transition-colors shrink-0" />
                  </div>

                  {/* 5-Star Rating & Bike Model Pill */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                    <div className="flex items-center gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#F5B900] text-[#F5B900]" />
                      ))}
                    </div>

                    <span className="text-[10px] font-bold text-neutral-600 bg-gray-100 px-2 py-0.5 rounded-md">
                      {review.bike}
                    </span>
                  </div>

                  {/* Comment Text */}
                  <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>

                {/* Service Tag at Bottom */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 font-medium">
                  <span className="text-[#B8860B] font-bold">✓ {review.serviceType}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
