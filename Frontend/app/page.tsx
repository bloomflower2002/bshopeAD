'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AUCTION_PRODUCTS } from './auctions/data';

interface Review {
  id: number;
  name: string;
  text: string;
  stars: number;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  isOpen?: boolean;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Sarah M.',
    text: 'Bshope made bidding feel exciting and effortless. I found amazing deals in just a few clicks.',
    stars: 5,
  },
  {
    id: 2,
    name: 'Daniel K.',
    text: 'The interface is smooth, and the live auctions are so easy to follow. Highly recommended.',
    stars: 5,
  },
  {
    id: 3,
    name: 'Amina R.',
    text: 'I love the variety of products and the secure bidding experience. It feels trustworthy.',
    stars: 5,
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    question: 'How do I start bidding?',
    answer: 'Create an account, verify your details, and place your first bid on any live auction.',
    isOpen: true,
  },
  {
    id: 2,
    question: 'Is there a fee to join?',
    answer: 'Joining Bshope is free, and membership perks are available for users who want extra benefits.',
    isOpen: false,
  },
  {
    id: 3,
    question: 'Can I bid from my phone?',
    answer: 'Yes, the platform is mobile-friendly, so you can browse and bid anytime from your device.',
    isOpen: false,
  },
];

const FEATURED_ITEMS = AUCTION_PRODUCTS.slice(0, 7); // odd number centers nicely

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState<number>(
    Math.floor(FEATURED_ITEMS.length / 2)
  );
  const [faqItems, setFaqItems] = useState<FAQItem[]>(FAQ_ITEMS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [reviewText, setReviewText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % FEATURED_ITEMS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % FEATURED_ITEMS.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + FEATURED_ITEMS.length) % FEATURED_ITEMS.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  const toggleFAQ = (id: number) => {
    setFaqItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  const renderStars = (count: number) =>
    '★'.repeat(count) + '☆'.repeat(Math.max(0, 5 - count));

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      setError('Please write a review before submitting.');
      return;
    }
    setIsSubmitting(true);
    setError('');

    // Simulated submit — swap for a real API call when ready.
    setTimeout(() => {
      const newReview: Review = {
        id: Date.now(),
        name: 'Anonymous',
        text: reviewText.trim(),
        stars: 5,
      };
      setReviews((prev) => [newReview, ...prev]);
      setReviewText('');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1E29] via-[#161922] to-[#14161F] text-white">
      {/* Hero Quote */}
      <div className="max-w-[1150px] mx-auto px-6 pt-6">
        <h1 className="text-[clamp(32px,4vw,50px)] text-white text-center pt-[30px] px-5 m-0 mx-auto max-w-[1100px] font-['Black_Ops_One',sans-serif]">
          <span className="text-[#fa6204]">Bid</span> anywhere, anytime, on{' '}
          <span className="text-[#fa6204]">anything</span>
        </h1>
        <p className="text-base text-white max-w-[1000px] text-center mx-auto mt-3 px-5 leading-relaxed">
          The ultimate online auction platform where you can bid on a wide range of products from the comfort of your own home.
        </p>
      </div>

      {/* Coverflow Slider Section — full screen */}
      <div className="relative w-full min-h-screen flex flex-col justify-center mt-[-90px] mb-[-90px] px-6 md:px-5 py-16">

        <div className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-flex gap-4">
            {FEATURED_ITEMS.map((item, index) => {
              let offset = index - currentSlide;
              const half = Math.floor(FEATURED_ITEMS.length / 2);
              if (offset > half) offset -= FEATURED_ITEMS.length;
              if (offset < -half) offset += FEATURED_ITEMS.length;

              const abs = Math.abs(offset);
              if (abs > 2) return null; // hide anything beyond 2 cards out

              const scale = abs === 0 ? 1 : abs === 1 ? 0.78 : 0.6;
              const translateX = offset * 260;
              const translateY = abs === 0 ? -10 : 20;
              const opacity = abs === 0 ? 1 : abs === 1 ? 0.75 : 0.4;
              const zIndex = 10 - abs;

              return (
                <Link
                  key={item.id}
                  href={`/auctions/${item.id}`}
                  onClick={(e) => {
                    if (offset !== 0) {
                      e.preventDefault();
                      goToSlide(index);
                    }
                  }}
                  className="absolute w-[280px] sm:w-[340px] rounded-2xl overflow-hidden bg-[#14161F] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out"
                  style={{
                    transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                >
                  <div className="relative aspect-[5/5] w-full">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="340px"
                    />
                    {abs === 0 && (
                      <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full pl-1 pr-3 py-1">
                        <div className="w-6 h-6 rounded-full bg-white/20" />
                        <span className="text-[11px] text-white/90 truncate max-w-[130px]">
                          {item.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {abs === 0 && (
                    <div className="p-3 flex items-center justify-between bg-[#14161F]">
                      <div>
                        <p className="text-[10px] text-white/50">Current Bid</p>
                        <p className="text-sm font-bold text-[#fa6204]">
                          {item.currentBid}ETB
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold text-white/80 hover:text-[#fa6204] transition-colors">
                        MORE →
                      </span>
                    </div>
                  )}
                </Link>
              );
            })}

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 bg-black/45 text-white text-2xl w-11 h-11 rounded-full border border-white/10 cursor-pointer z-20 hover:bg-black/65 transition-colors duration-200 flex items-center justify-center"
              aria-label="Previous slide"
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 bg-black/45 text-white text-2xl w-11 h-11 rounded-full border border-white/10 cursor-pointer z-20 hover:bg-black/65 transition-colors duration-200 flex items-center justify-center"
              aria-label="Next slide"
            >
              ❯
            </button>
          </div>

          {/* Dots */}
          <div className="text-center mt-4">
            {FEATURED_ITEMS.map((_, index) => (
              <span
                key={index}
                onClick={() => goToSlide(index)}
                className={`inline-block w-2.5 h-2.5 mx-1.5 rounded-full cursor-pointer transition-colors duration-200 ${
                  currentSlide === index ? 'bg-[#fa6204]' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
      </div>

      {/* Featured Auctions Preview — full screen */}
      <section className="w-full min-h-screen flex flex-col justify-center px-6 md:px-12 py-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[28px] text-white">
              Featured <span className="text-[#fa6204]">Auctions</span>
            </h2>
            <Link
              href="/auctions"
              className="text-sm text-[#fa6204] hover:text-[#ff7a2f] transition-colors duration-200 whitespace-nowrap"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {AUCTION_PRODUCTS.slice(0, 12).map((product) => (
              <Link
                key={product.id}
                href={`/auctions/${product.id}`}
                className="group rounded-2xl overflow-hidden bg-white/10 border border-white/15 backdrop-blur-sm hover:border-[#fa6204] hover:shadow-[0_10px_24px_rgba(250,98,4,0.16)] transition-all duration-300"
              >
                <div className="relative aspect-[4/3] w-full bg-[#111]">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="p-3">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[#fa6204] font-semibold mb-1 truncate">
                    {product.category}
                  </p>
                  <h3 className="text-sm font-semibold text-white truncate mb-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70">Current Bid</span>
                    <span className="text-[#fa6204] font-bold">
                      {product.currentBid}ETB
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-white/70">Time Left</span>
                    <span className="text-white">{product.timeLeft}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      <main className="max-w-[1150px] mx-auto px-6 pb-20">
        {/* FAQ Section */}
        <section className="max-w-[1100px] mx-auto my-9 px-6 text-[#f5f7fb]">
          <h2 className="text-[28px] mb-4 text-white">Frequently Asked Questions</h2>
          <div className="grid gap-3">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 border border-white/15 rounded-xl p-[14px_16px] backdrop-blur-sm hover:border-[#fa6204] hover:shadow-[0_10px_24px_rgba(250,98,4,0.16)] transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full text-left cursor-pointer font-semibold text-white flex justify-between items-center"
                >
                  <span>{item.question}</span>
                  <span className="text-[#fa6204] text-xl">
                    {item.isOpen ? '−' : '+'}
                  </span>
                </button>
                {item.isOpen && (
                  <p className="mt-2.5 text-[#d8e0ea] leading-relaxed">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="max-w-[1100px] mx-auto mb-[70px] px-6 text-[#f5f7fb]">
          <h2 className="text-[28px] mb-4 text-white">What Our Users Say</h2>

          {/* Review Form */}
          <form onSubmit={handleReviewSubmit} className="flex flex-col sm:flex-row gap-2.5 mb-5">
            <input
              type="text"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setReviewText(e.target.value);
                if (error) setError('');
              }}
              className="flex-1 min-w-[200px] px-[14px] py-3 border border-white/15 rounded-xl bg-white/10 text-white outline-none focus:border-[#fa6204] transition-colors duration-200"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-3 border-none rounded-xl bg-[#fa6204] text-white cursor-pointer font-semibold whitespace-nowrap hover:bg-[#ff7a2f] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
          {error && <p className="text-red-400 text-sm -mt-3 mb-3">{error}</p>}

          {/* Review Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="bg-white/10 border border-white/15 rounded-xl p-[18px] backdrop-blur-sm"
              >
                <div className="text-[#ffb703] tracking-[2px] mb-2.5">
                  {renderStars(review.stars)}
                </div>
                <p className="text-[#d8e0ea] leading-relaxed mb-3">
                  “{review.text}”
                </p>
                <h3 className="m-0 text-white font-semibold">{review.name}</h3>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
