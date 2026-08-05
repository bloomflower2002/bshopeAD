import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - BShope Auction Platform',
  description: 'Learn about BShope - the trusted auction destination for modern buyers and sellers.',
};

interface MissionCard {
  icon: string;
  title: string;
  description: string;
}

interface StoryStep {
  number: number;
  title: string;
  description: string;
}

const MISSION_CARDS: MissionCard[] = [
  {
    icon: 'fa-bullseye',
    title: 'Our Mission',
    description: 'To create a safe, exciting, and transparent online auction marketplace where everyone can participate, win, and connect.',
  },
  {
    icon: 'fa-users',
    title: 'Our Community',
    description: 'We bring together passionate bidders, trusted sellers, and support teams dedicated to making auctions fair and fun.',
  },
  {
    icon: 'fa-shield-alt',
    title: 'Our Promise',
    description: 'Quality service, secure transactions, and a seamless bidding experience from start to finish.',
  },
];

const STORY_STEPS: StoryStep[] = [
  {
    number: 1,
    title: 'Browse Products',
    description: 'Explore our catalog of electronics, gadgets, and collectibles.',
  },
  {
    number: 2,
    title: 'Place Your Bid',
    description: 'Enter your bid amount and keep an eye on the highest offers.',
  },
  {
    number: 3,
    title: 'Win and Celebrate',
    description: 'Win the auction, complete your purchase, and enjoy your new item.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1E29] via-[#161922] to-[#14161F] text-white">
      <main className="max-w-[1150px] mx-auto px-6 py-[18px] pb-20">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-10 items-center mb-[60px]">
          <div className="hero-text">
            <h1 className="text-[42px] font-bold mb-5 leading-tight">
              About <span className="text-[#fa6204]">BShope</span>
            </h1>
            <p className="text-[#fcfdfd] text-lg leading-relaxed max-w-[620px]">
              We are the auction destination built for modern buyers and sellers. 
              Discover great products, bid with confidence, and win exciting deals.
            </p>
            <div className="mt-8 flex gap-4 flex-wrap">
              <Link 
                href="/auctions" 
                className="px-8 py-3 bg-[#fa6204] text-white rounded-full font-semibold hover:bg-[#ff7a2f] transition-colors duration-200"
              >
                Browse Auctions
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-3 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="hero-image flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#fa6204]/20 to-transparent rounded-2xl blur-2xl"></div>
              <Image
                src="/bshope.png"
                alt="BShop logo"
                width={460}
                height={460}
                className="w-full max-w-[460px] rounded-2xl relative z-10"
                priority
              />
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-[60px]">
          {MISSION_CARDS.map((card, index) => (
            <div
              key={card.title}
              className="bg-gradient-to-b from-[#1B1E29] via-[#161922] to-[#14161F] rounded-2xl p-8 text-center shadow-[0_20px_60px_rgba(9,38,33,0.06)] hover:shadow-[0_20px_60px_rgba(250,98,4,0.1)] transition-shadow duration-300 border border-white/5"
            >
              <div className="w-14 h-14 rounded-full bg-[#fa6204]/10 flex items-center justify-center mx-auto mb-[18px]">
                <i className={`fas ${card.icon} text-[28px] text-[#fa6204]`}></i>
              </div>
              <h2 className="text-[22px] font-bold mb-3">{card.title}</h2>
              <p className="text-white/80 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </section>

        {/* Story Section */}
        <section className="story-section">
          <h2 className="text-[34px] font-bold mb-6 text-center lg:text-left">
            How It <span className="text-[#fa6204]">Works</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STORY_STEPS.map((step) => (
              <div
                key={step.number}
                className="bg-gradient-to-b from-[#1B1E29] via-[#161922] to-[#14161F] rounded-2xl p-7 shadow-[0_20px_60px_rgba(9,38,33,0.06)] border border-white/5 hover:border-[#fa6204]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-[18px]">
                  <span className="inline-flex items-center justify-center w-[44px] h-[44px] rounded-full bg-[#fa6204] text-white font-bold text-lg flex-shrink-0">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-bold m-0">{step.title}</h3>
                </div>
                <p className="text-white/80 leading-relaxed pl-[60px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-[60px] grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: '10K+', label: 'Active Users' },
            { number: '500+', label: 'Daily Auctions' },
            { number: '98%', label: 'Satisfaction Rate' },
            { number: '24/7', label: 'Customer Support' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:scale-105 transition-transform duration-300"
            >
              <div className="text-3xl font-bold text-[#fa6204]">{stat.number}</div>
              <div className="text-white/70 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Call to Action */}
        <section className="mt-[60px] p-12 rounded-3xl bg-gradient-to-r from-[#fa6204]/10 to-transparent border border-[#fa6204]/20 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Bidding?
          </h2>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Join thousands of happy bidders and discover amazing deals on BShope today.
          </p>
          <Link 
            href="/auctions" 
            className="inline-block px-10 py-4 bg-[#fa6204] text-white rounded-full font-semibold hover:bg-[#ff7a2f] transition-colors duration-200 shadow-lg shadow-[#fa6204]/25"
          >
            Explore Auctions
          </Link>
        </section>
      </main>
    </div>
  );
}