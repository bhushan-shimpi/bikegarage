import React, { useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

interface ReviewItem {
  name: string;
  bike: string;
  avatar: string;
  rating: number;
  comment: string;
}

const ReviewAvatar: React.FC<{ review: ReviewItem }> = ({ review }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-12 h-12 rounded-full bg-[#FFF9E6] border border-[#F5B900] flex items-center justify-center text-[#DFA500] font-black text-sm shrink-0">
        {review.name.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={review.avatar}
      alt={review.name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="w-12 h-12 rounded-full object-cover border border-gray-200 shrink-0"
    />
  );
};

export const TestimonialsSection: React.FC = () => {
  const reviews: ReviewItem[] = [
    {
      name: 'Pratik Patil',
      bike: 'Honda Shine 125',
      avatar: '/images/testimonials/pratik.jpg',
      rating: 5,
      comment: 'Excellent bike servicing! Engine vibration completely solved, smooth pickup, and mileage improved significantly.',
    },
    {
      name: 'Kisan More',
      bike: 'Bajaj Pulsar 150',
      avatar: '/images/testimonials/kisan.jpg',
      rating: 5,
      comment: 'Best motorcycle garage in Pahur. Genuine Bajaj and Honda OEM spares, precise tappet setting, and very reasonable rates.',
    },
    {
      name: 'Rohit Chaudhari',
      bike: 'Yamaha RX100 (Restoration)',
      avatar: '/images/testimonials/rohit.jpg',
      rating: 5,
      comment: 'Full restoration of my 1996 RX100. Authentic 2-stroke engine beat, flawless candy red paint, and factory-finish chrome!',
    },
  ];

  return (
    <section className="py-16 bg-[#F8F9FA]" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-gray-900 font-sans">
              CUSTOMER REVIEWS
            </h2>
            <div className="w-12 h-1 bg-[#F5B900] mx-auto mt-2 rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 120}>
              <div
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow h-full"
              >
                <div>
                  {/* Header: Avatar, Name, Stars & Quote */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <ReviewAvatar review={review} />
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">
                          {review.name}
                        </h4>
                        <span className="text-[11px] font-semibold text-[#DFA500] block">
                          {review.bike}
                        </span>
                        <div className="flex items-center gap-0.5 mt-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-[#F5B900] text-[#F5B900]" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 text-gray-300" />
                  </div>

                  {/* Comment Text */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
