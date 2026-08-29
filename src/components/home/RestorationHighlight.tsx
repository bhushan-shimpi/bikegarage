import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Wrench, 
  Search, 
  ShieldCheck, 
  Flame, 
  Gem, 
  CheckCircle2, 
  Award,
  Quote,
  Play,
  Volume2,
  VolumeX,
  Video
} from 'lucide-react';
import { Button } from '../common/Button';
import { ScrollReveal } from '../common/ScrollReveal';
import { ServiceDetailModal } from '../services/ServiceDetailModal';
import { bikeServicesService } from '../../services/bikeServicesService';

// ─── Individual Restoration Video Card (Clean: No text overlay) ───
interface VideoCardProps {
  src: string;
  isAutoPlayOnScroll?: boolean;
}

const RestorationVideoCard: React.FC<VideoCardProps> = ({
  src,
  isAutoPlayOnScroll,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // 1. Auto-play when user reaches/scrolls to this video
  useEffect(() => {
    const video = videoRef.current;
    const card = cardRef.current;
    if (!video || !card) return;

    // Strict DOM muted property required for browser autoplay policy
    video.muted = true;
    video.defaultMuted = true;

    if (isAutoPlayOnScroll) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.muted = true;
              const p = video.play();
              if (p !== undefined) {
                p.then(() => setIsPlaying(true)).catch(() => {
                  video.muted = true;
                  video.play().then(() => setIsPlaying(true)).catch(() => {});
                });
              }
            } else {
              video.pause();
              setIsPlaying(false);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -30px 0px',
        }
      );

      observer.observe(card);
      return () => observer.disconnect();
    }
  }, [isAutoPlayOnScroll]);

  // 2. Start playing when dragging mouse on / hovering over
  const handleMouseEnter = () => {
    if (!isAutoPlayOnScroll && videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (!isAutoPlayOnScroll && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // 3. Click to toggle play / pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  // 4. Toggle Sound (Mute/Unmute)
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={togglePlay}
      className="group relative w-[280px] xs:w-[300px] md:w-auto shrink-0 snap-center md:snap-align-none rounded-3xl overflow-hidden bg-[#111111] border border-[#272727] hover:border-[#F5B900]/70 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#F5B900]/15 cursor-pointer flex flex-col justify-between select-none"
    >
      {/* Video Container Frame - Clean with NO text overlay */}
      <div className="relative w-full aspect-[9/14] sm:aspect-[9/13] bg-black overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          src={src}
          loop
          muted={isMuted}
          playsInline
          autoPlay={isAutoPlayOnScroll}
          preload="auto"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Discreet Sound Toggle Button in Top Right */}
        <button
          onClick={toggleMute}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white hover:text-[#F5B900] flex items-center justify-center transition-colors shadow-md"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#F5B900]" />}
        </button>

        {/* Center Play Indicator when video is paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-13 h-13 rounded-full bg-[#F5B900]/90 text-black flex items-center justify-center shadow-xl shadow-black/60 group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 fill-black ml-0.5" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const RestorationHighlight: React.FC = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const restorationService =
    bikeServicesService.getAll().find((s) => s.slug === 'bike-restoration' || s.id === 's10') ||
    null;

  const restorationProcess = [
    {
      icon: Search,
      title: 'Complete Inspection',
      marathi: 'संपूर्ण तपासणी',
      desc: 'We thoroughly inspect every part of the motorcycle before starting the restoration.',
      accent: 'border-[#F5B900]/30 group-hover:border-[#F5B900]',
      iconColor: 'text-[#F5B900]',
    },
    {
      icon: ShieldCheck,
      title: '100% Original Spare Parts',
      marathi: 'ओरिजिनल स्पेअर पार्ट्स',
      desc: 'Wherever replacement is required, we focus on using genuine and original spare parts to maintain quality and reliability.',
      accent: 'border-emerald-500/30 group-hover:border-emerald-500',
      iconColor: 'text-emerald-400',
    },
    {
      icon: Flame,
      title: 'Oven / Furnace Paint',
      marathi: 'ओव्हन / भट्टी पेंट प्रोसेस',
      desc: 'We use a professional oven/bhatti paint process to achieve a durable, smooth, and premium finish similar to the original factory finish.',
      accent: 'border-orange-500/30 group-hover:border-orange-500',
      iconColor: 'text-orange-400',
    },
    {
      icon: Gem,
      title: 'Ceramic Coating',
      marathi: 'सिरेमिक कोटिंग',
      desc: 'After restoration and paintwork, we apply ceramic coating to provide an additional layer of protection and enhance the bike’s finish.',
      accent: 'border-cyan-500/30 group-hover:border-cyan-500',
      iconColor: 'text-cyan-400',
    },
    {
      icon: CheckCircle2,
      title: 'Detailed Finishing',
      marathi: 'सुपर-फाईन फिनिशिंग',
      desc: 'We pay attention to even the smallest details to deliver a super-fine and premium finish.',
      accent: 'border-purple-500/30 group-hover:border-purple-500',
      iconColor: 'text-purple-400',
    },
    {
      icon: Award,
      title: 'Quality First',
      marathi: 'सर्वोत्कृष्ट दर्जा',
      desc: 'For us, completing the work is not enough. We believe in delivering work that meets our highest quality standards.',
      accent: 'border-amber-500/30 group-hover:border-amber-500',
      iconColor: 'text-[#F5B900]',
    },
  ];

  return (
    <section
      className="py-16 sm:py-24 bg-[#070707] border-y border-[#222222] relative overflow-hidden"
      id="restoration"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B900]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ─── SECTION HEADER ─── */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full border border-[#F5B900]/40 bg-[#F5B900]/10 text-[#F5B900] text-xs font-black uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>🏍️ BIKE RESTORATION – CHAUDHARI AUTO CENTRE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-4 font-sans">
              BIKE RESTORATION
            </h2>

            {/* Philosophy Statement */}
            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed max-w-2xl mx-auto font-medium">
              At Chaudhari Auto Centre, bike restoration is not just about repairing an old motorcycle. Our goal is to bring back its original beauty, performance, and finish while giving every detail the attention it deserves.
            </p>

            <p className="text-xs sm:text-sm text-neutral-400 mt-2.5 max-w-xl mx-auto">
              Our restoration process begins with a complete inspection of the bike, followed by detailed work on each component according to its condition and requirement.
            </p>
          </div>
        </ScrollReveal>

        {/* ─── 3 RESTORATION VIDEOS (CLEAN: NO TEXT OVERLAYS) ─── */}
        <div className="mb-14 sm:mb-16">
          <ScrollReveal direction="up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F5B900] flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5" />
                  <span>Real Workshop Restoration Videos</span>
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase text-white font-sans mt-0.5">
                  WATCH OUR RESTORATION IN ACTION
                </h3>
              </div>
            </div>
          </ScrollReveal>

          {/* 3 Videos Container: 1 Row on Desktop (Grid-cols-3), Scrollable on Mobile without scrollbar */}
          <div className="flex md:grid md:grid-cols-3 overflow-x-auto no-scrollbar gap-4 sm:gap-6 snap-x snap-mandatory pb-3 pt-1">
            {/* Video 1: Featured (Autoplays on section scroll) */}
            <RestorationVideoCard
              src="/images/restoration/SaveClip.App_AQM5Tt49XZZuRrBLsAC8kFWf85miepLEVtHAKgNKJjNR257EWOpx_bLq8R0Moxj_kpi7F7KN7mS_4qSl7PpA0H3yA5IK37LEcz962fY.mp4"
              isAutoPlayOnScroll={true}
            />

            {/* Video 2: Plays on hover / mouse drag */}
            <RestorationVideoCard
              src="/images/restoration/pulsar%20150.mp4"
              isAutoPlayOnScroll={false}
            />

            {/* Video 3: Plays on hover / mouse drag */}
            <RestorationVideoCard
              src="/images/restoration/PULSAR%209617%204K.mp4"
              isAutoPlayOnScroll={false}
            />
          </div>

          {/* Mobile Swipe Hint */}
          <div className="md:hidden text-center mt-3 text-[11px] text-neutral-500">
            Swipe sideways to view all 3 videos
          </div>
        </div>

        {/* ─── 🔧 OUR RESTORATION PROCESS (6 Pillars) ─── */}
        <div className="mb-14">
          <ScrollReveal direction="up">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F5B900]">
                Precision Step-by-Step Craftsmanship
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-sans mt-1">
                🔧 OUR RESTORATION PROCESS
              </h3>
              <div className="w-12 h-1 bg-[#F5B900] mx-auto mt-2 rounded-full" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {restorationProcess.map((step, idx) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={idx} direction="up" delay={idx * 80}>
                  <div className={`p-5 sm:p-6 rounded-2xl bg-[#121212] border ${step.accent} transition-all duration-300 hover:-translate-y-1 hover:bg-[#161616] group h-full flex flex-col justify-between shadow-lg`}>
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${step.iconColor} group-hover:scale-110 transition-transform`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                          Step 0{idx + 1}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight group-hover:text-[#F5B900] transition-colors">
                        {step.title}
                      </h4>
                      <span className="text-xs font-medium text-[#F5B900]/80 block mb-2">
                        {step.marathi}
                      </span>

                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* ─── ⭐ OUR PROMISE CARD ─── */}
        <ScrollReveal direction="up" delay={200}>
          <div className="relative rounded-3xl bg-gradient-to-b from-[#181818] to-[#101010] border border-[#F5B900]/30 p-6 sm:p-10 mb-12 text-center shadow-2xl overflow-hidden">
            {/* Top decorative emblem */}
            <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-[#F5B900]/10 border border-[#F5B900]/40 flex items-center justify-center text-[#F5B900]">
              <Quote className="w-6 h-6 rotate-180" />
            </div>

            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#F5B900] block mb-2">
              ⭐ OUR PROMISE
            </span>

            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-sans max-w-3xl mx-auto leading-snug mb-4">
              “When your bike comes back to you, it should look better, feel better, and be finished to the highest possible standard.”
            </blockquote>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              At <strong className="text-white">Chaudhari Auto Centre</strong>, we believe in <span className="text-[#F5B900] font-bold">Quality</span>, <span className="text-[#F5B900] font-bold">Genuine Parts</span>, <span className="text-[#F5B900] font-bold">Professional Workmanship</span>, and <span className="text-[#F5B900] font-bold">Super-Fine Finishing</span>.
            </p>

            <div className="mt-4 pt-4 border-t border-white/10 max-w-xl mx-auto">
              <p className="text-xs sm:text-sm italic font-serif text-[#F5B900]">
                Because restoration is not just about making an old bike look new — it’s about bringing the bike back to life.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── CTAs ─── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link to="/restoration-form" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4 shrink-0" />}
              className="w-full sm:w-auto font-black text-xs sm:text-sm py-3.5 px-7 shadow-xl shadow-[#F5B900]/25 bg-[#F5B900] text-black hover:bg-[#ffc71c]"
            >
              <span>Fill Restoration Form • फॉर्म भरा</span>
            </Button>
          </Link>

          <Link to="/services/bike-restoration" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<Wrench className="w-4 h-4 text-[#F5B900] shrink-0" />}
              className="w-full sm:w-auto text-xs sm:text-sm py-3.5 px-6 cursor-pointer"
            >
              <span>View Restoration Details</span>
            </Button>
          </Link>
        </div>

        {/* Restoration Detail Modal */}
        <ServiceDetailModal
          service={restorationService}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
        />

      </div>
    </section>
  );
};
