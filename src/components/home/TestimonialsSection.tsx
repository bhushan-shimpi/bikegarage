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
  // Exactly 6 Authentic Reviews
  const reviews: ReviewItem[] = [
    {
      id: 'rev-1',
      name: 'Sachin Patil',
      initials: 'SP',
      village: 'Pahur Peth',
      bike: 'Hero Splendor Plus BS6',
      serviceType: 'Periodic Servicing & Mileage',
      rating: 5,
      comment: 'माझ्या Splendor चे मायलेज आणि पिकअपचा प्रॉब्लेम जामनेरला दोन ठिकाणी दाखवूनही सुटला नव्हता. चौधरी ऑटो सेंटरमध्ये एका सर्व्हिसिंगमध्ये गाडी नव्यासारखी स्मूथ झाली. कामात १००% प्रामाणिकपणा आहे.',
      verified: true,
    },
    {
      id: 'rev-2',
      name: 'Kisan More',
      initials: 'KM',
      village: 'Wakod',
      bike: 'Bajaj Pulsar 150 DTS-i',
      serviceType: 'Full Engine Overhaul',
      rating: 5,
      comment: 'Pulsar 150 चे इंजिन ओव्हरहॉल आणि डिस्क ब्रेकचे काम उत्तम केले. ओरिजिनल बजाज OEM पार्ट्स वापरले आणि वाजवी दर आकारले. पहूर परिसरातील सर्वात विश्वासू बाईक वर्कशॉप.',
      verified: true,
    },
    {
      id: 'rev-3',
      name: 'Pratik Jadhav',
      initials: 'PJ',
      village: 'Jamner',
      bike: 'Honda CB Shine 125 SP',
      serviceType: 'Clutch & Tappet Setting',
      rating: 5,
      comment: 'Honda Shine चे क्लच प्लेट, चेन-स्प्रॉकेट आणि टॅपिट सेटिंग एकदम परफेक्ट केली. गाडी चालवताना जराही व्हायब्रेशन नाही. सर्व्हिसिंगनंतर गाडी एकदम मक्खन चालते.',
      verified: true,
    },
    {
      id: 'rev-4',
      name: 'Ganesh Shimpi',
      initials: 'GS',
      village: 'Pahur',
      bike: 'Yamaha RX100',
      serviceType: 'Retro Restoration',
      rating: 5,
      comment: 'माझी RX100 रिस्टोरेशनसाठी दिली होती. भट्टी पेंट, क्रोम फिनिशिंग आणि ओरिजिनल २-स्ट्रोक बीट असा आलाय की रस्त्यावर लोक गाडी थांबवून बघतात! हॅट्स ऑफ रोहित दादा.',
      verified: true,
    },
    {
      id: 'rev-5',
      name: 'Anil Sonawane',
      initials: 'AS',
      village: 'Shendurni',
      bike: 'Hero HF Deluxe',
      serviceType: 'Wiring & Carburettor',
      rating: 5,
      comment: 'गाडी स्टार्ट व्हायला त्रास देत होती, वायरिंग आणि कार्बोरेटरचे काम अगदी अचूक शोधून क्लिअर केले. अनावश्यक पार्ट्स न बदलता एकदम योग्य सल्ला दिला.',
      verified: true,
    },
    {
      id: 'rev-6',
      name: 'Mangesh Chaudhari',
      initials: 'MC',
      village: 'Bodwad',
      bike: 'Bajaj Platina 110',
      serviceType: 'Suspension & Fork Repair',
      rating: 5,
      comment: 'सस्पेन्शन आणि फ्रंट फॉर्कचे काम केले. खडबडीत रस्त्यावरही गाडी आता मऊ चालते. अस्सल OEM स्पेअर पार्ट्स आणि उत्कृष्ट वॉश दिला. उत्तम अनुभव.',
      verified: true,
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F8F9FA]" id="reviews">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-2.5 rounded-full bg-amber-100 text-[#B8860B] text-xs font-black uppercase tracking-widest border border-amber-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>१००% खरी ग्राहक मते</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wide text-gray-900 font-sans">
              CUSTOMER REVIEWS
            </h2>
            <div className="w-12 h-1 bg-[#F5B900] mx-auto mt-2 rounded-full" />

            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              पहूर, जामनेर, शेंदुर्णी व परिसरातील बाईकस्वारांचा चौधरी ऑटो सेंटरवर असलेला अतूट विश्वास.
            </p>
          </div>
        </ScrollReveal>

        {/* 6 Reviews: 2 COLUMNS ON MOBILE, 3 COLUMNS ON DESKTOP */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 xs:gap-3 sm:gap-5 lg:gap-6">
          {reviews.map((review, idx) => (
            <ScrollReveal key={review.id} direction="up" delay={(idx % 3) * 80}>
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 xs:p-4 sm:p-5 lg:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1">
                <div>
                  {/* Header: Monogram Badge, Name, Verified */}
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      {/* Name Initials Badge */}
                      <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-full bg-amber-50 border border-amber-300 text-[#B8860B] font-black text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-inner group-hover:bg-[#F5B900] group-hover:text-black transition-colors">
                        {review.initials}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight truncate">
                            {review.name}
                          </h4>
                          {review.verified && (
                            <span title="Verified Customer" className="inline-flex shrink-0">
                              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
                            </span>
                          )}
                        </div>

                        <span className="text-[10px] sm:text-[11px] font-medium text-gray-500 block truncate">
                          {review.village}
                        </span>
                      </div>
                    </div>

                    <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-gray-200 group-hover:text-[#F5B900]/40 transition-colors shrink-0 hidden xs:block" />
                  </div>

                  {/* 5-Star Rating & Bike Model Pill */}
                  <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 pb-2 sm:pb-3 mb-2 sm:mb-3 border-b border-gray-100">
                    <div className="flex items-center gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#F5B900] text-[#F5B900]" />
                      ))}
                    </div>

                    <span className="text-[9px] sm:text-[10px] font-bold text-neutral-600 bg-gray-100 px-1.5 py-0.5 rounded truncate max-w-[120px] xs:max-w-none">
                      {review.bike}
                    </span>
                  </div>

                  {/* Comment Text */}
                  <p className="text-[11px] xs:text-xs sm:text-[13px] text-gray-700 leading-snug sm:leading-relaxed line-clamp-4 xs:line-clamp-5 sm:line-clamp-none">
                    "{review.comment}"
                  </p>
                </div>

                {/* Service Tag at Bottom */}
                <div className="mt-3 pt-2 sm:pt-3 border-t border-gray-100 text-[9px] sm:text-[10px] text-gray-500 font-medium truncate">
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
